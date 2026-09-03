/**
 * Model provisório de Serviço.
 * Responsabilidade oficial de Israel (módulo "Serviços + Peças").
 * Criado aqui apenas com os campos mínimos necessários para o módulo de
 * Ordens de Serviço funcionar de forma independente. Ao subir o branch
 * dele, este arquivo deve ser substituído/mesclado com o model definitivo.
 */
const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, 'Nome do serviço é obrigatório'],
            trim: true,
        },
        descricao: {
            type: String,
            trim: true,
        },
        valor: {
            type: Number,
            required: [true, 'Valor do serviço é obrigatório'],
            min: [0.01, 'Valor do serviço deve ser maior que zero'],
        },
        tempoEstimado: {
            type: Number, // em minutos
        },
    },
    {
        timestamps: true,
        collection: 'servicos',
    }
);

module.exports = mongoose.model('Servico', servicoSchema);
