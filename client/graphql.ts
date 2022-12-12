import { gql } from '@apollo/client';

export const userByEmail = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      email
      firstName
      lastName
      student
      school
      country
      company
      website
      github
      twitter
      telegram
      linkedin
    }
  }
`;
