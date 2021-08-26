import { gql } from '@apollo/client';

export interface Student {
  id: string;
  name: string;
  email: string;
  cpf: string;
  gravatar?: string;
}

export const STUDENTS_QUERY = gql`
  query getStudents($filter: String!, $page: Int, $perPage: Int) {
    students(filter: $filter, page: $page, perPage: $perPage) {
      results {
        id
        email
        cpf
        name
        gravatar
      }
      metadata {
        page
        perPage
        pageCount
        total
      }
    }
  }
`;
