const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { getUserFromToken } = require("../middlewares/auth");

const createApolloServer = async (app) => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    app.use(
        "/graphql",
        expressMiddleware(apolloServer, {
            context: async ({ req }) => {
                const user = getUserFromToken(
                    req.headers.authorization
                );

                return {
                    user,
                };
            },
        })
    );

    return apolloServer;
};

module.exports = {
    createApolloServer,
};