const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema(
  {
    placa: { type: String, required: true, unique: true },
    modelo: { type: String, required: true },
    marca: { type: String, required: true },
    ano: { type: Number },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  },
  { timestamps: true, collection: "veiculos" }
);

module.exports = mongoose.model("Veiculo", veiculoSchema);
