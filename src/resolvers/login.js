const { ApolloError } = require("apollo-server-core");

const { User } = require("../models");
const { signToken } = require("../middleware/auth");

const login = async (_, { input }) => {
  const ERROR_MESSAGE = "Failed to login";

  try {
    const user = await User.findOne({ email: input.email });

    if (!user) {
      console.log(`[ERROR]: ${ERROR_MESSAGE} | User does not exist`);
      throw new ApolloError(ERROR_MESSAGE);
    }

    const isValidPassword = await user.isValidPassword(input.password);

    if (!isValidPassword) {
      console.log(`[ERROR]: ${ERROR_MESSAGE} | Incorrect password`);
      throw new ApolloError(ERROR_MESSAGE);
    }

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: ${ERROR_MESSAGE} | ${error.message}`);
    throw new ApolloError(ERROR_MESSAGE);
  }
};

module.exports = login;
