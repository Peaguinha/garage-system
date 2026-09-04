require("dotenv").config();
const { createApp } = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  const { app } = await createApp();

  app.listen(PORT, () => {
    console.log(`Garage System API rodando em http://localhost:${PORT}`);
    console.log(`GraphQL disponível em http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
  process.exit(1);
});
