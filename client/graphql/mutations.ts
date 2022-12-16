import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation SignUpUser($email: String!, $password: String!, $role: String!) {
    signUpUser(email: $email, password: $password, role: $role) {
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
  mutation Mutation(
    $userUpdate: UserUpdate
    $hackerProfile: HackerProfile
    $sponsorProfile: SponsorProfile
  ) {
    updateUser(
      userUpdate: $userUpdate
      hackerProfile: $hackerProfile
      sponsorProfile: $sponsorProfile
    ) {
      firstName
      lastName
    }
  }
`;
