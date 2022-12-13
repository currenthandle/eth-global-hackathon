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

export const VALIDATE_USER = gql`
  query ValidateUser($email: String!, $password: String!) {
    validateUser(email: $email, password: $password) {
      __typename
      ... on UserWithToken {
        user {
          email
        }
        token
      }
      ... on Error {
        message
      }
    }
  }
`;
