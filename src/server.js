const express = require("express");
require("dotenv").config();

const express = require('express');
require('dotenv').config();

const connectDatabase = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');

const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "Garage System",
    });
});

// Rota protegida - autenticação
app.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Acesso autorizado",
        user: req.user
    });
});

// Rota protegida - autenticação + autorização
app.get(
    "/admin",
    authMiddleware,
    roleMiddleware("ADMIN"),
    (req, res) => {
        res.status(200).json({
            message: "Acesso autorizado",
            user: req.user
        });
    }
);

const servicosRoutes = require('./routes/servicos.routes'); const pecasRoutes = require('./routes/pecas.routes'); app.use('/api/servicos', servicosRoutes); app.use('/api/pecas', pecasRoutes);
app.listen(PORT, () => {
    console.log(`Garage System is running on port ${PORT}`);
});