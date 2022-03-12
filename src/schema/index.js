const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type Message {
    isFromSender: Boolean!
    isFromReceiver: Boolean!
    text: String!
  }

  type Chat {
    id: ID!
    sender: User!
    receiver: User!
    messages: [Message]
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    chat(chatId: ID!): Chat!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  input PostMessageInput {
    chatId: ID!
    isFromSender: Boolean!
    isFromReceiver: Boolean!
    text: String!
  }

  input CreateChatInput {
    sender: ID!
    receiver: ID!
  }

  type Mutation {
    login(input: LoginInput!): Auth!
    signUp(input: SignUpInput!): Auth!
    createChat(input: CreateChatInput!): Chat!
    postMessage(input: PostMessageInput!): Message!
  }

  type Subscription {
    messagePosted(chatId: ID!): Message
  }
`;

module.exports = typeDefs;
