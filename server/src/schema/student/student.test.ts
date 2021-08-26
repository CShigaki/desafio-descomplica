import supertest from 'supertest';
import mockDb from 'mock-knex';

import { configureServer } from "config/server";
import db from 'db/connection';

let tracker: mockDb.Tracker;

describe('Student Resolvers', () => {
  beforeAll(() => {
    mockDb.mock(db);
    tracker = mockDb.getTracker();
    tracker.install();
  });

  afterAll(() => {
    tracker.uninstall();
    mockDb.unmock(db);
  });

  afterEach(() => {
    tracker.removeAllListeners();
  });

  it("queries without parameters", (done: jest.DoneCallback) => {
    const configureAndRunRequest = async () => {
      const app = await configureServer();
      const request: supertest.SuperTest<supertest.Test> = supertest(app);

      tracker.on('query', (query) => {
        if ('first' === query.method) {
          expect(query.sql).toBe("select count(*) as `total` from `student` limit ?")
          expect(query.bindings).toStrictEqual([1]);

          query.response({
            total: 1,
          });
        }

        if ('select' === query.method) {
          expect(query.sql).toBe("select * from `student` limit ?");
          expect(query.bindings).toStrictEqual([10]);

          query.response([
            {
              id: '1',
              name: 'celso',
              email: 'celso@gmail.com',
              cpf: '11111111111',
            }
          ]);
        }
      });

      request
        .post("/data")
        .send({
          query: `
            {
              students {
                results {
                  id
                  name
                  email
                  cpf
                }
                metadata {
                  page
                  pageCount
                  perPage
                  total
                }
              }
            }
          `,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (_, res) {
          expect(res.body.data.students.results).toStrictEqual([
            {
              id: '1',
              name: 'celso',
              email: 'celso@gmail.com',
              cpf: '11111111111',
            }
          ]);
          expect(res.body.data.students.metadata).toStrictEqual({
            page: 0,
            pageCount: 1,
            perPage: 10,
            total: 1
          });

          done();
        });
    };

    configureAndRunRequest();
  });

  it("queries with parameters", (done: jest.DoneCallback) => {
    const configureAndRunRequest = async () => {
      const app = await configureServer();
      const request: supertest.SuperTest<supertest.Test> = supertest(app);

      tracker.on('query', (query) => {
        if ('first' === query.method) {
          expect(query.sql).toBe("select count(*) as `total` from `student` where `name` like ? or `email` like ? or `cpf` like ? limit ?")
          expect(query.bindings).toStrictEqual(['%celso%', '%celso%', '%celso%', 1]);

          query.response({
            total: 12,
          });
        }

        if ('select' === query.method) {
          expect(query.sql).toBe("select * from `student` where `name` like ? or `email` like ? or `cpf` like ? limit ? offset ?");
          expect(query.bindings).toStrictEqual(['%celso%', '%celso%', '%celso%', 25, 300]);

          query.response([]);
        }
      });

      request
        .post("/data")
        .send({
          query: `
            {
              students (filter: "celso", page: 12, perPage: 25) {
                results {
                  id
                  name
                  email
                  cpf
                }
                metadata {
                  page
                  pageCount
                  perPage
                  total
                }
              }
            }
          `,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (_, res) {
          expect(res.body.data.students.results).toStrictEqual([]);
          expect(res.body.data.students.metadata).toStrictEqual({
            page: 12,
            pageCount: 1,
            perPage: 25,
            total: 12
          });

          done();
        });
    };

    configureAndRunRequest();
  });

  it("sends validation error when asking for non existing field", (done: jest.DoneCallback) => {
    const configureAndRunRequest = async () => {
      const app = await configureServer();
      const request: supertest.SuperTest<supertest.Test> = supertest(app);

      request
        .post("/data")
        .send({
          query: `
            {
              students {
                results {
                  thisfielddoesnotexist
                }
              }
            }
          `,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (_, res) {
          expect(res.body.errors).toHaveLength(1);
          expect(res.body.errors[0].message).toBe('Cannot query field "thisfielddoesnotexist" on type "Student".')

          done();
        });
    };

    configureAndRunRequest();
  });
});