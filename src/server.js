const express = require("express");
require("dotenv").config();

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

app.listen(PORT, () => {
    console.log(`Garage System is running on port ${PORT}`);
});