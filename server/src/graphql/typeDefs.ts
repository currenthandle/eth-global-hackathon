const typeDefs = `#graphql
  type User {
    email: String!
    password: String!
    id: ID!
    role: String!
    firstName: String
    lastName: String

  }

  input UserUpdate {
    email: String
    firstName: String
    lastName: String

  }

  type UserWithToken {
    user: User!
    token: String!
  }

  type Error {
    message: String!
  }

  union UserOrError = UserWithToken | Error

  type Query {
    allUsers: [User!]!
    userData: User
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
