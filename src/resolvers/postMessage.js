const { ApolloError } = require("apollo-server-core");
const { v4: uuidv4 } = require("uuid");

const { Chat } = require("../models");
const Message = require("../models/Message");
const pubsub = require("./pubSub");

const postMessage = async (_, { input }, { loggedInUser }) => {
  try {
    if (loggedInUser) {
      const message = {
        isFromSender: input.isFromSender,
        isFromReceiver: input.isFromReceiver,
        text: input.text,
        messageId: uuidv4(),
      };

      await Chat.findByIdAndUpdate(input.chatId, {
        $push: {
          messages: message,
        },
      });

      pubsub.publish("MESSAGE_POSTED", {
        messagePosted: message,
      });

      return message;
    } else {
      console.log(`[ERROR]: Unauthorised operation | User is not logged in`);
      throw new ApolloError("Unauthorised operation");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to post message | ${error.message}`);
    throw new ApolloError("Failed to post message");
  }
};

module.exports = postMessage;
