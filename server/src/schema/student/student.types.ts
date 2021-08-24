import { gql } from 'apollo-server-express';

interface Metadata {
  currentPage: number;
  perPage: number;
  pageCount: number;
  total: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  cpf: string;
  gravatar?: string;
}
export interface StudentsConnection {
  results: Array<Student>;
  metadata: Metadata;
}

export const StudentSchema = gql`
  type Query {
    students(filter: String, page: Int, perPage: Int): StudentsConnection!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    cpf: String!
    gravatar: String
  }

  type Metadata {
    currentPage: Int
    perPage: Int
    pageCount: Int
    total: Int
  }

  type StudentsConnection {
    results: [Student!]!
    metadata: Metadata!
  }
`;