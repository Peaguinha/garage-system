const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "garage_system_secret_dev";

/**
 * Extrai e valida o usuário autenticado a partir do header Authorization.
 * Usado tanto pelas rotas REST (Pedro) quanto pelo contexto do Apollo
 * Server no módulo GraphQL (Nathan).
 */
function getUserFromToken(authorizationHeader) {
  if (!authorizationHeader) return null;

  const [, token] = authorizationHeader.split(" ");
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload; // { id, nome, perfil }
  } catch (err) {
    return null;
  }
}

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario._id, nome: usuario.nome, perfil: usuario.perfil },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

/** Garante que existe um usuário autenticado no contexto do GraphQL. */
function assertAutenticado(user) {
  if (!user) {
    const err = new Error("Não autenticado. Informe um token JWT válido.");
    err.extensions = { code: "UNAUTHENTICATED" };
    throw err;
  }
}

/** Garante que o usuário autenticado possui um dos perfis permitidos. */
function assertAutorizado(user, perfisPermitidos = []) {
  assertAutenticado(user);
  if (perfisPermitidos.length && !perfisPermitidos.includes(user.perfil)) {
    const err = new Error("Usuário não autorizado para esta operação.");
    err.extensions = { code: "FORBIDDEN" };
    throw err;
  }
}

module.exports = { getUserFromToken, gerarToken, assertAutenticado, assertAutorizado, JWT_SECRET };
