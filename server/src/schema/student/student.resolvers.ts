import db from 'db/connection';
import { Student } from './student.types';

export const StudentResolvers = {
  Query: {
    students: async (): Promise<Array<Student>> => {
      return await db.select().from('student');
    },
  }
};