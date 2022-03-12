const chat = require("./chat");
const signUp = require("./signUp");
const login = require("./login");
const createChat = require("./createChat");
const postMessage = require("./postMessage");
const pubsub = require("./pubSub");

const resolvers = {
  Query: {
    chat,
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
