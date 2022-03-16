const { ApolloError } = require("apollo-server-core");

const { User } = require("../models");

const signUp = async (_, { input }) => {
  const ERROR_MESSAGE = "Failed to sign up";

  try {
    await User.create(input);

    return {
      success: true,
    };
  } catch (error) {
    console.log(`[ERROR]: ${ERROR_MESSAGE} | ${error.message}`);
    throw new ApolloError(ERROR_MESSAGE);
  }
};

module.exports = signUp;
