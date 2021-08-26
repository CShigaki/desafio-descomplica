import db from 'db/connection';
import { StudentsConnection } from './student.types';

interface StudentQueryInterface {
  filter?: string;
  page?: number;
  perPage: number;
};

export const StudentResolvers = {
  Query: {
    students: async (_: any, { filter, page = 0, perPage = 10 }: StudentQueryInterface): Promise<StudentsConnection> => {
      let offset = 0 === page ? 0 : page * perPage;
      let query = db.select().from("student");
      let countQuery = db.count('* as total').from('student');

      if (filter) {
        query = query.where('name', 'LIKE', `%${filter}%`)
          .orWhere('email', 'LIKE', `%${filter}%`)
          .orWhere('cpf', 'LIKE', `%${filter}%`);

        countQuery = countQuery.where('name', 'LIKE', `%${filter}%`)
          .orWhere('email', 'LIKE', `%${filter}%`)
          .orWhere('cpf', 'LIKE', `%${filter}%`);
      }

      const [totalQuery, results] = await Promise.all([
        countQuery.first(),
        query.offset(offset)
          .limit(perPage),
      ]);

      return {
        results,
        metadata: {
          page,
          perPage,
          pageCount: Math.ceil(Number(totalQuery?.total!) / perPage),
          total: Number(totalQuery?.total!),
        }
      };
    },
  }
};