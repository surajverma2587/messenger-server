const { ApolloError } = require("apollo-server-core");

const { Chat } = require("../models");

const createChat = async (_, { input }, { loggedInUser }) => {
  try {
    if (loggedInUser) {
      const chat = await Chat.create(input);

      const newChat = await Chat.findById(chat._id)
        .populate("sender")
        .populate("receiver");

      return newChat;
    } else {
      console.log(`[ERROR]: Unauthorised operation | User is not logged in`);
      throw new ApolloError("Unauthorised operation");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to create chat | ${error.message}`);
    throw new ApolloError("Failed to create chat");
  }
};

module.exports = createChat;
