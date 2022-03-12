const { Schema } = require("mongoose");

const messageSchema = {
  isFromSender: {
    type: Boolean,
    default: false,
  },
  isFromReceiver: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    required: true,
    maxLength: 255,
  },
};

const schema = new Schema(messageSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

module.exports = schema;
