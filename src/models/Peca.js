const { Schema, model } = require('mongoose');

/**
 * Coleção: pecas
 * Responsável: Integrante 4 (Israel Neto)
 */
const PecaSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome da peça é obrigatório.'],
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
      default: '',
    },
    preco: {
      type: Number,
      required: [true, 'O preço da peça é obrigatório.'],
      validate: {
        validator: (v) => v > 0,
        message: 'O preço da peça deve ser maior que zero.',
      },
    },
    quantidadeDisponivel: {
      type: Number,
      required: [true, 'A quantidade disponível é obrigatória.'],
      default: 0,
      validate: {
        validator: (v) => v >= 0,
        message: 'A quantidade disponível não pode ser negativa.',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Peca', PecaSchema, 'pecas');
