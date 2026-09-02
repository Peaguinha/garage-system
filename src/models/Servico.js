const { Schema, model } = require('mongoose');

/**
 * Coleção: servicos
 * Responsável: Integrante 4 (Israel Neto)
 */
const ServicoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do serviço é obrigatório.'],
      trim: true,
    },
    descricao: {
      type: String,
      required: [true, 'A descrição do serviço é obrigatória.'],
      trim: true,
    },
    valor: {
      type: Number,
      required: [true, 'O valor do serviço é obrigatório.'],
      validate: {
        validator: (v) => v > 0,
        message: 'O valor do serviço deve ser maior que zero.',
      },
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Servico', ServicoSchema, 'servicos');
