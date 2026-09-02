const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const connectDatabase = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "Garage System",
    })
});

// TODO: módulos de servicos, pecas, ordens-servico e auth/JWT serão
// adicionados pelos demais integrantes (ver Divisão de Atividades - Fase 1).
app.use('/api/clientes', clienteRoutes);
app.use('/api/veiculos', veiculoRoutes);

async function start() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Garage System is running on port ${PORT}`);
    });
}

start();