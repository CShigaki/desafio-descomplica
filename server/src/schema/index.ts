import { makeExecutableSchema } from '@graphql-tools/schema';
import merge from 'lodash.merge';

import { StudentSchema, StudentResolvers } from './student';

// Multiple files to keep your project modularised
export const schema = makeExecutableSchema({
  typeDefs: [
    StudentSchema,
  ],
  resolvers: merge(
    StudentResolvers,
  )
});
