const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senhaHash: { type: String, required: true },
    perfil: {
      type: String,
      enum: ["ADMIN", "ATENDENTE", "MECANICO"],
      required: true,
    },
  },
  { timestamps: true, collection: "usuarios" }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
