const mongoose = require("mongoose");

const STATUS_VALIDOS = [
  "ABERTA",
  "EM_DIAGNOSTICO",
  "AGUARDANDO_APROVACAO",
  "EM_EXECUCAO",
  "CONCLUIDA",
  "CANCELADA",
];

const ordemServicoSchema = new mongoose.Schema(
  {
    veiculoId: { type: mongoose.Schema.Types.ObjectId, ref: "Veiculo", required: true },
    mecanicoId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    problemaRelatado: { type: String },
    diagnostico: { type: String },
    servicos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servico" }],
    pecas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Peca" }],
    status: { type: String, enum: STATUS_VALIDOS, default: "ABERTA" },
    valorTotal: { type: Number, default: 0 },
    dataConclusao: { type: Date },
  },
  { timestamps: true, collection: "ordens_servico" }
);

module.exports = mongoose.model("OrdemServico", ordemServicoSchema);
module.exports.STATUS_VALIDOS = STATUS_VALIDOS;
