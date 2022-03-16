const { Chat } = require("../models");

const chats = async (_, __, { loggedInUser }) => {
  try {
    if (loggedInUser) {
      const chats = await Chat.find({
        $or: [{ sender: loggedInUser.id }, { receiver: loggedInUser.id }],
      })
        .populate("sender")
        .populate("receiver");

      return chats;
    } else {
      console.log(`[ERROR]: Unauthorised operation | User is not logged in`);
      throw new ApolloError("Unauthorised operation");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to get chat | ${error.message}`);
    throw new ApolloError("Failed to get chat");
  }
};

module.exports = chats;
