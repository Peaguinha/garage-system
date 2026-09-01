const express = require("express");
require("dotenv").config();

const connectDatabase = require("./config/database");
const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");

const clienteRoutes = require("./routes/clienteRoutes");
const veiculoRoutes = require("./routes/veiculoRoutes");
const ordemServicoRoutes = require("./routes/ordemServicoRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/veiculos", veiculoRoutes);
app.use("/api/ordens-servico", ordemServicoRoutes);

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

connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Garage System is running on port ${PORT}`);
        });
    })
    .catch(() => {
        process.exit(1);
    });