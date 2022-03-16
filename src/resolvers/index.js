const chat = require("./chat");
const chats = require("./chats");
const users = require("./users");
const signUp = require("./signUp");
const login = require("./login");
const createChat = require("./createChat");
const postMessage = require("./postMessage");
const pubsub = require("./pubSub");

const resolvers = {
  Query: {
    users,
    chat,
    chats,
  },
  Mutation: {
    signUp,
    login,
    createChat,
    postMessage,
  },
  Subscription: {
    messagePosted: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_POSTED"]),
    },
  },
};

module.exports = resolvers;
