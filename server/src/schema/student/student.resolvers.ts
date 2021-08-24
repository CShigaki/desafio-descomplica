import db from 'db/connection';
import { Student, StudentsConnection } from './student.types';

interface StudentQueryInterface {
  filter?: string;
  page?: number;
  perPage: number;
};

export const StudentResolvers = {
  Query: {
    students: async (root: any, { filter, page = 0, perPage = 10 }: StudentQueryInterface): Promise<StudentsConnection> => {
      let offset = 0 === page ? 0 : page * perPage;
      let query = db.select().from("student");

      if (filter) {
        query = query.where('name', 'LIKE', `%${filter}%`)
          .orWhere('email', 'LIKE', `%${filter}%`)
          .orWhere('cpf', 'LIKE', `%${filter}%`);
      }

      const [totalQuery, results] = await Promise.all([
        db.count('* as total')
          .from("student")
          .first(),
        query.offset(offset)
          .limit(perPage),
      ]);

      return {
        results,
        metadata: {
          currentPage: page,
          perPage,
          pageCount: Math.ceil(Number(totalQuery?.total!) / perPage),
          total: Number(totalQuery?.total!),
        }
      };
    },
  }
};