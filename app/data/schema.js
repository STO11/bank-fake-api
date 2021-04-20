'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
    accounts: [Accounts]
  }
  type Accounts {
    id: Int!
    user: User!
    number: Int!
    balance: Float!
  }
  type Query {
    allUsers: [User]
    fetchUser(id: Int!): User
    allAccounts: [Accounts]
    balance(conta: Int!): Accounts
  }
  type Mutation {
    login (email: String!, password: String!): String
    createAccount (username: String!, number: Int! , email: String!, password: String!): User
    deposit (conta: Int!, valor: Float!): Accounts,
    withdraw (conta: Int!, valor: Float!): Accounts
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })