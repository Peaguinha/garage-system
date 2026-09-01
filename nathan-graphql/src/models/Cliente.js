const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    email: { type: String },
    cpf: { type: String, required: true, unique: true },
    endereco: { type: String },
  },
  { timestamps: true, collection: "clientes" }
);

module.exports = mongoose.model("Cliente", clienteSchema);
