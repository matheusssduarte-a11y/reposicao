const express = require("express");
const router = express.Router();

const pool = require("../src/database");


// ==========================================
// LISTAR MÁQUINAS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const resultado = await pool.query(`
            SELECT
                id,
                usuario_id,
                nome,
                codigo,
                tipo,
                localizacao,
                status,
                data_instalacao
            FROM maquinas
            ORDER BY id ASC
        `);

        res.json({

            sucesso: true,

            maquinas: resultado.rows

        });

    } catch (erro) {

        console.error(
            "Erro ao buscar máquinas:",
            erro
        );

        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro ao buscar máquinas."

        });

    }

});


// ==========================================
// CADASTRAR MÁQUINA
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            usuario_id,
            nome,
            codigo,
            tipo,
            localizacao,
            status,
            data_instalacao
        } = req.body;


        // ======================================
        // VALIDAR CAMPOS
        // ======================================

        if (
            !usuario_id ||
            !nome ||
            !codigo ||
            !tipo ||
            !localizacao ||
            !status ||
            !data_instalacao
        ) {

            return res.status(400).json({

                sucesso: false,

                mensagem:
                    "Todos os campos são obrigatórios."

            });

        }


        // ======================================
        // VERIFICAR CÓDIGO DUPLICADO
        // ======================================

        const maquinaExistente =
            await pool.query(
                `
                SELECT id
                FROM maquinas
                WHERE codigo = $1
                `,
                [codigo]
            );


        if (
            maquinaExistente.rows.length > 0
        ) {

            return res.status(409).json({

                sucesso: false,

                mensagem:
                    "Já existe uma máquina com este código."

            });

        }


        // ======================================
        // INSERIR MÁQUINA
        // ======================================

        const resultado =
            await pool.query(
                `
                INSERT INTO maquinas
                (
                    usuario_id,
                    nome,
                    codigo,
                    tipo,
                    localizacao,
                    status,
                    data_instalacao
                )
                VALUES
                ($1, $2, $3, $4, $5, $6, $7)

                RETURNING *
                `,
                [
                    usuario_id,
                    nome,
                    codigo,
                    tipo,
                    localizacao,
                    status,
                    data_instalacao
                ]
            );


        // ======================================
        // SUCESSO
        // ======================================

        res.status(201).json({

            sucesso: true,

            mensagem:
                "Máquina cadastrada com sucesso!",

            maquina:
                resultado.rows[0]

        });

    } catch (erro) {

        console.error(
            "Erro ao cadastrar máquina:",
            erro
        );

        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro ao cadastrar máquina."

        });

    }

});


// ==========================================
// EDITAR MÁQUINA
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            usuario_id,
            codigo,
            nome,
            tipo,
            localizacao,
            status,
            data_instalacao
        } = req.body;


        // ======================================
        // VALIDAR CAMPOS
        // ======================================

        if (
            !usuario_id ||
            !codigo ||
            !nome ||
            !tipo ||
            !localizacao ||
            !status ||
            !data_instalacao
        ) {

            return res.status(400).json({

                sucesso: false,

                mensagem:
                    "Todos os campos são obrigatórios."

            });

        }


        // ======================================
        // VERIFICAR SE EXISTE
        // ======================================

        const maquinaExistente =
            await pool.query(
                `
                SELECT id
                FROM maquinas
                WHERE id = $1
                `,
                [id]
            );


        if (
            maquinaExistente.rows.length === 0
        ) {

            return res.status(404).json({

                sucesso: false,

                mensagem:
                    "Máquina não encontrada."

            });

        }


        // ======================================
        // ATUALIZAR
        // ======================================

        const resultado =
            await pool.query(
                `
                UPDATE maquinas

                SET
                    usuario_id = $1,
                    codigo = $2,
                    nome = $3,
                    tipo = $4,
                    localizacao = $5,
                    status = $6,
                    data_instalacao = $7

                WHERE id = $8

                RETURNING *
                `,
                [
                    usuario_id,
                    codigo,
                    nome,
                    tipo,
                    localizacao,
                    status,
                    data_instalacao,
                    id
                ]
            );


        // ======================================
        // SUCESSO
        // ======================================

        res.json({

            sucesso: true,

            mensagem:
                "Máquina atualizada com sucesso!",

            maquina:
                resultado.rows[0]

        });

    } catch (erro) {

        console.error(
            "Erro ao editar máquina:",
            erro
        );

        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro ao editar máquina."

        });

    }

});


// ==========================================
// EXCLUIR MÁQUINA
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        const resultado =
            await pool.query(
                `
                DELETE FROM maquinas

                WHERE id = $1

                RETURNING *
                `,
                [id]
            );


        // ======================================
        // NÃO ENCONTRADA
        // ======================================

        if (
            resultado.rows.length === 0
        ) {

            return res.status(404).json({

                sucesso: false,

                mensagem:
                    "Máquina não encontrada."

            });

        }


        // ======================================
        // SUCESSO
        // ======================================

        res.json({

            sucesso: true,

            mensagem:
                "Máquina excluída com sucesso.",

            maquina:
                resultado.rows[0]

        });

    } catch (erro) {

        console.error(
            "Erro ao excluir máquina:",
            erro
        );

        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro ao excluir máquina."

        });

    }

});


module.exports = router;