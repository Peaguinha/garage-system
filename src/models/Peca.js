const mongoose = require("mongoose");

const pecaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    preco: { type: Number, required: true, min: 0.01 },
    quantidadeDisponivel: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true, collection: "pecas" }
);

module.exports = mongoose.model("Peca", pecaSchema);
