const typeDefs = `#graphql
  type User {
    email: String!
    id: ID!
    role: String!
    firstName: String
    lastName: String
    linkedin: String
    website: String
    rules: Boolean
  }

  input HackerProfile {
    github: String
    yearsOfExp: Int
    ethExp: String
    motivation: [String]
    builtBefore: String
    lookingToBuild: String
  }

  input PartnerProfile {
    organization: String
    telegram: String
    twitter: String
    otherEvents: String
    reasonForSupporting: String
  }

  input MentorProfile {
    github: String
    telegram: String
    twitter: String
    yearsOfExp: Int
    ethExp: String
    otherEvents: String
    reasonForMentoring: String
  }

  input UserUpdate {
    firstName: String
    lastName: String
    linkedin: String
    website: String
    rules: Boolean
  }

  type UserWithToken {
    user: User!
    token: String!
  }

  type Error {
    message: String!
  }

  type UserData {
    email: String
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
    reasonForMentoring: String
    organization: String
  }

  union UserOrError = UserWithToken | Error

  type Query {
    allUsers: [User!]!
    userData: UserData!
    validateUser(email: String!): UserOrError!
    emailIsAvailable(email: String!): Boolean!
  }

  type Mutation {
    createUser(email: String!): User!
    signUpUser(email: String!, role: String!): UserOrError!
    updateUser(userUpdate: UserUpdate, hackerProfile: HackerProfile, partnerProfile: PartnerProfile, mentorProfile: MentorProfile): User!
  }
`;

export default typeDefs;
