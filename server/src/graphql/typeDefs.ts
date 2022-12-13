const typeDefs = `#graphql
  type User {
    email: String!
    password: String!
    id: ID!
    role: String!
    firstName: String
    lastName: String
    student: Boolean
    school: String
    country: String
    company: String
    website: String
    github: String
    twitter: String
    telegram: String
    linkedin: String
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
    userByEmail(email: String!): User!
    validateUser(email: String!, password: String!): UserOrError!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    signUpUser(email: String!, password: String!, role: String!): UserOrError!
    login(email: String!, password: String!): User!
  }
`;

export default typeDefs;
