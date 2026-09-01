const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { getUserFromToken } = require("../middlewares/auth");

/**
 * Configura e retorna o Apollo Server, já com o contexto de autenticação
 * (usuário extraído do JWT) disponível para todos os resolvers.
 */
function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = getUserFromToken(req.headers.authorization);
      return { user };
    },
    formatError: (err) => {
      return {
        message: err.message,
        code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
        path: err.path,
      };
    },
  });
}

module.exports = { createApolloServer };
