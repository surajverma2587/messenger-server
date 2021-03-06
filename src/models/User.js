const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = {
  firstName: {
    type: String,
    required: true,
    maxLength: 200,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 200,
  },
  username: {
    type: String,
    required: true,
    maxLength: 200,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
};

const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

schema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

schema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", schema);

module.exports = User;
