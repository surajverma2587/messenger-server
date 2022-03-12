const { model, Schema } = require("mongoose");

const message = require("./Message");

const chatSchema = {
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  messages: [message],
};

const schema = new Schema(chatSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Chat = model("Chat", schema);

module.exports = Chat;
