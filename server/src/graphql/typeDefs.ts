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
    ethExp: String
    motivation: [String]
    builtBefore: String
    lookingToBuild: String
    rules: Boolean
  }

  input SponsorProfile {
    github: String
    linkedin: String
    website: String
    yearsOfExp: Int
  }

  input UserUpdate {
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
    updateUser(userUpdate: UserUpdate, hackerProfile: HackerProfile, sponsorProfile: SponsorProfile): User!
  }
`;

export default typeDefs;
