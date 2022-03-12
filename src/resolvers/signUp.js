const { ApolloError } = require("apollo-server-core");

const { User } = require("../models");
const { signToken } = require("../middleware/auth");

const signUp = async (_, { input }) => {
  const ERROR_MESSAGE = "Failed to sign up";

  try {
    const user = await User.create(input);

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: ${ERROR_MESSAGE} | ${error.message}`);
    throw new ApolloError(ERROR_MESSAGE);
  }
};

module.exports = signUp;
