const { ApolloError } = require("apollo-server-core");

const { User } = require("../models");

const users = async (_, __, { loggedInUser }) => {
  try {
    if (loggedInUser) {
      const users = await User.find({});

      return users;
    } else {
      console.log(`[ERROR]: Unauthorised operation | User is not logged in`);
      throw new ApolloError("Unauthorised operation");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to get users | ${error.message}`);
    throw new ApolloError("Failed to get users");
  }
};

module.exports = users;
