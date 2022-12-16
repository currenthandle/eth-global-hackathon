import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation SignUpUser($email: String!, $password: String!) {
    signUpUser(email: $email, password: $password) {
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

export const UPDATE_USER = gql`
  mutation Mutation($userUpdate: UserUpdate) {
    updateUser(userUpdate: $userUpdate) {
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
