const typeDefs = `

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    credits: Int
    icons: [Icon]
  }

  type Icon {
    _id: ID
    createdAt: String
    userId: ID
    prompt: String
    style: String
    color: String
    url: String
    user: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Credit {
    userId: String
    credits: Int
  }
  
  input LineItemInput {
    price: String
    quantity: Int
  }

  type CheckoutSession {
    id: ID
    url: String
  }

  input CreateIconInput {
    prompt: String!
    color: String!
  }

  input StyleInput {
    name: String!
    value: String!
  }

  type Query {
    user(_id: ID!): User
    me: User
    communityIcons: [Icon]
  }

  type Session {
    sessionId: String
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateCredits(token: String!, credits: Int!): User
    createCheckoutSession(token: String!): Session
    createIcon(input: CreateIconInput!, style: StyleInput!): [Icon]
    deleteIcon(_id: ID!): User
  }
`

module.exports = typeDefs
