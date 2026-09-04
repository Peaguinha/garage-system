const Cliente = require("../models/Cliente");
const Veiculo = require("../models/Veiculo");
const Servico = require("../models/Servico");
const Peca = require("../models/Peca");
const OrdemServico = require("../models/OrdemServico");
const Usuario = require("../models/Usuario");
const { assertAutenticado, assertAutorizado } = require("../middlewares/auth");

/**
 * Resolvers do GraphQL do Garage System.
 * Responsabilidade: Nathan Esley.
 *
 * Todas as queries exigem usuário autenticado (JWT válido).
 * A query `usuarios` é restrita ao perfil ADMIN.
 */
const resolvers = {
  Query: {
    clientes: async (_, __, { user }) => {
      assertAutenticado(user);
      return Cliente.find().sort({ nome: 1 });
    },

    cliente: async (_, { id }, { user }) => {
      assertAutenticado(user);
      return Cliente.findById(id);
    },

    veiculos: async (_, __, { user }) => {
      assertAutenticado(user);
      return Veiculo.find().sort({ modelo: 1 });
    },

    veiculo: async (_, { id }, { user }) => {
      assertAutenticado(user);
      return Veiculo.findById(id);
    },

    servicos: async (_, __, { user }) => {
      assertAutenticado(user);
      return Servico.find().sort({ nome: 1 });
    },

    pecas: async (_, __, { user }) => {
      assertAutenticado(user);
      return Peca.find().sort({ nome: 1 });
    },

    ordensServico: async (_, { status }, { user }) => {
      assertAutenticado(user);
      const filtro = status ? { status } : {};
      return OrdemServico.find(filtro).sort({ createdAt: -1 });
    },

    ordemServico: async (_, { id }, { user }) => {
      assertAutenticado(user);
      return OrdemServico.findById(id);
    },

    usuarios: async (_, __, { user }) => {
      assertAutorizado(user, ["ADMIN"]);
      return Usuario.find().sort({ nome: 1 });
    },
  },

  // Resolvers de campo (relacionamentos entre entidades)
  Cliente: {
    veiculos: (cliente) => Veiculo.find({ clienteId: cliente._id }),
  },

  Veiculo: {
    cliente: (veiculo) => Cliente.findById(veiculo.clienteId),
    ordensServico: (veiculo) => OrdemServico.find({ veiculoId: veiculo._id }),
  },

  OrdemServico: {
    veiculo: (ordem) => Veiculo.findById(ordem.veiculoId),
    mecanico: (ordem) => Usuario.findById(ordem.mecanicoId),
    servicos: (ordem) => Servico.find({ _id: { $in: ordem.servicos } }),
    pecas: (ordem) => Peca.find({ _id: { $in: ordem.pecas } }),
    dataConclusao: (ordem) => (ordem.dataConclusao ? ordem.dataConclusao.toISOString() : null),
    createdAt: (ordem) => (ordem.createdAt ? ordem.createdAt.toISOString() : null),
  },
};

module.exports = resolvers;
