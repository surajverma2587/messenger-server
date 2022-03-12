const { ApolloError } = require("apollo-server-core");
const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;
const expiration = process.env.TOKEN_EXPIRATION;

const signToken = ({ firstName, lastName, email, username, id }) =>
  jwt.sign({ data: { firstName, lastName, email, username, id } }, secret, {
    expiresIn: expiration,
  });

const authMiddleware = ({ req }) => {
  const ERROR_MESSAGE = "Failed to retrieve token";

  try {
    const token = req?.headers?.authorization?.split(" ").pop().trim();

    if (!token) {
      return req;
    }

    const { data } = jwt.verify(token, secret, { maxAge: expiration });

    req.loggedInUser = data;

    return req;
  } catch (error) {
    console.log(`[ERROR]: ${ERROR_MESSAGE} | ${error.message}`);
    throw new ApolloError(ERROR_MESSAGE);
  }
};

module.exports = {
  signToken,
  authMiddleware,
};
