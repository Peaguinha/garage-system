const { gql } = require("apollo-server-express");

/**
 * Schema GraphQL do Garage System.
 * Responsabilidade: Nathan Esley (GraphQL + Testes + Documentação).
 *
 * Reflete as entidades definidas por Washingtton (modelagem MongoDB)
 * e os módulos implementados por Igor (Clientes/Veículos),
 * Israel (Serviços/Peças) e Kaik (Ordens de Serviço).
 */
const typeDefs = gql`
  enum Perfil {
    ADMIN
    ATENDENTE
    MECANICO
  }

  enum StatusOrdemServico {
    ABERTA
    EM_DIAGNOSTICO
    AGUARDANDO_APROVACAO
    EM_EXECUCAO
    CONCLUIDA
    CANCELADA
  }

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    perfil: Perfil!
  }

  type Cliente {
    id: ID!
    nome: String!
    telefone: String!
    email: String
    cpf: String!
    endereco: String
    veiculos: [Veiculo!]!
  }

  type Veiculo {
    id: ID!
    placa: String!
    modelo: String!
    marca: String!
    ano: Int
    cliente: Cliente
    ordensServico: [OrdemServico!]!
  }

  type Servico {
    id: ID!
    nome: String!
    descricao: String
    valor: Float!
  }

  type Peca {
    id: ID!
    nome: String!
    preco: Float!
    quantidadeDisponivel: Int!
  }

  type OrdemServico {
    id: ID!
    veiculo: Veiculo!
    mecanico: Usuario!
    problemaRelatado: String
    diagnostico: String
    servicos: [Servico!]!
    pecas: [Peca!]!
    status: StatusOrdemServico!
    valorTotal: Float!
    dataConclusao: String
    createdAt: String
  }

  type Query {
    "Lista todos os clientes cadastrados"
    clientes: [Cliente!]!
    "Busca um cliente pelo ID"
    cliente(id: ID!): Cliente

    "Lista todos os veículos cadastrados"
    veiculos: [Veiculo!]!
    "Busca um veículo pelo ID"
    veiculo(id: ID!): Veiculo

    "Lista todos os serviços oferecidos"
    servicos: [Servico!]!

    "Lista todas as peças cadastradas"
    pecas: [Peca!]!

    "Lista todas as ordens de serviço"
    ordensServico(status: StatusOrdemServico): [OrdemServico!]!
    "Busca uma ordem de serviço pelo ID"
    ordemServico(id: ID!): OrdemServico

    "Lista todos os usuários (restrito a ADMIN)"
    usuarios: [Usuario!]!
  }
`;

module.exports = typeDefs;
