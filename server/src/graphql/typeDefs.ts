const typeDefs = `#graphql
  type User {
    email: String!
    password: String!
    id: ID!
    role: String!
    firstName: String
    lastName: String
  }

  input HackerProfile {
    github: String
    linkedin: String
    website: String
    yearsOfExp: Int
  }

  input UserUpdate {
    email: String
    firstName: String
    lastName: String
    hackerProfile: HackerProfile
  }

  type UserWithToken {
    user: User!
    token: String!
  }

  type Error {
    message: String!
  }

  type UserDate {
    email: String
    password: String
    id: ID
    role: String
    firstName: String
    lastName: String
    github: String
  }

  union UserOrError = UserWithToken | Error

  type Query {
    allUsers: [User!]!
    userData: UserDate!
    validateUser(email: String!, password: String!): UserOrError!
    emailIsAvailable(email: String!): Boolean!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    signUpUser(email: String!, password: String!, role: String!): UserOrError!
    updateUser(userUpdate: UserUpdate): User!
  }
`;

export default typeDefs;
