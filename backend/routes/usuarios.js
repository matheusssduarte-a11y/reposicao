const express = require("express");
const router = express.Router();

const pool = require("../src/database");


// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            nome,
            email,
            senha
        } = req.body;


        // ======================================
        // VALIDAR CAMPOS
        // ======================================

        if (
            !nome ||
            !email ||
            !senha
        ) {

            return res.status(400).json({

                sucesso: false,

                mensagem:
                    "Preencha todos os campos."

            });

        }


        // ======================================
        // VERIFICAR E-MAIL EXISTENTE
        // ======================================

        const usuarioExistente =
            await pool.query(
                `
                SELECT id
                FROM usuarios
                WHERE LOWER(email) = LOWER($1)
                `,
                [email]
            );


        if (
            usuarioExistente.rows.length > 0
        ) {

            return res.status(409).json({

                sucesso: false,

                mensagem:
                    "Já existe uma conta com este e-mail."

            });

        }


        // ======================================
        // CADASTRAR USUÁRIO
        // ======================================

        const resultado =
            await pool.query(
                `
                INSERT INTO usuarios
                (
                    nome,
                    email,
                    senha,
                   
                )
                VALUES
                ($1, $2, $3)

                RETURNING
                    id,
                    nome,
                    email,
                    telefone,
                    criado_em
                `,
                [
                    nome,
                    email,
                    senha,
                    null
                ]
            );


        // ======================================
        // RESPOSTA
        // ======================================

        res.status(201).json({

            sucesso: true,

            mensagem:
                "Usuário cadastrado com sucesso!",

            usuario:
                resultado.rows[0]

        });


    } catch (erro) {

        console.error(
            "Erro ao cadastrar usuário:",
            erro
        );


        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro interno ao cadastrar usuário."

        });

    }

});


module.exports = router;