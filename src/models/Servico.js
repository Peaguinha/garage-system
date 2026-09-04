const mongoose = require("mongoose");

const servicoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String },
    valor: { type: Number, required: true, min: 0.01 },
  },
  { timestamps: true, collection: "servicos" }
);

module.exports = mongoose.model("Servico", servicoSchema);
