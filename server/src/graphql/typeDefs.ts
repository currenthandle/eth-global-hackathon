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

  input PartnerProfile {
    website: String
    organization: String
    linkedin: String
    telegram: String
    twitter: String
    otherEvents: String
    reasonForSupporting: String
    rules: Boolean
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
    linkedin: String
    website: String
    yearsOfExp: Int
    ethExp: String
    motivation: [String]
    builtBefore: String
    lookingToBuild: String
    rules: Boolean
    telegram: String
    twitter: String
    otherEvents: String
    reasonForSupporting: String
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
    updateUser(userUpdate: UserUpdate, hackerProfile: HackerProfile, partnerProfile: PartnerProfile): User!
  }
`;

export default typeDefs;
