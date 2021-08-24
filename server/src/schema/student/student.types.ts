import { gql } from 'apollo-server-express';

export interface Student {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

export const StudentSchema = gql`
  type Query {
    students: [Student!]!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    cpf: String!
  }
`;