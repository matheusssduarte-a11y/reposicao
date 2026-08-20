const express = require("express");
const cors = require("cors");

const pool = require("./database");

const app = express();


// ==========================================
// MIDDLEWARES
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// ROTA DE TESTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        mensagem: "API EcoFactory funcionando!"
    });

});


// ==========================================
// TESTAR POSTGRESQL
// ==========================================

app.get("/api/teste-banco", async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT NOW()"
        );

        res.json({
            sucesso: true,
            mensagem: "PostgreSQL conectado!",
            data: resultado.rows[0]
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao conectar ao PostgreSQL."
        });

    }

});


// ==========================================
// SERVIDOR
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor EcoFactory rodando em http://localhost:${PORT}`
    );

});