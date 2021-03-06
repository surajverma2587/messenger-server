const { Chat } = require("../models");

const chat = async (_, { chatId }, { loggedInUser }) => {
  try {
    if (loggedInUser) {
      if (chatId) {
        const chat = await Chat.findById(chatId)
          .populate("sender")
          .populate("receiver");

        return chat;
      }
    } else {
      console.log(`[ERROR]: Unauthorised operation | User is not logged in`);
      throw new ApolloError("Unauthorised operation");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to get chat | ${error.message}`);
    throw new ApolloError("Failed to get chat");
  }
};

module.exports = chat;
