const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "Garage System",
    })
});

app.listen(PORT, () => {
    console.log(`Garage System is running on port ${PORT}`);
});

start();