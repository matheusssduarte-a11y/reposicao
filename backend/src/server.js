const express = require("express");
const cors = require("cors");

const pool = require("./database");


// ==========================================
// ROTAS
// ==========================================

const usuariosRoutes =
    require("../routes/usuarios");

const maquinasRoutes =
    require("../routes/maquinas");


// ==========================================
// CRIAR APLICAÇÃO
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARES
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// ROTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.json({

        mensagem:
            "API EcoFactory funcionando!"

    });

});


// ==========================================
// TESTAR POSTGRESQL
// ==========================================

app.get("/api/teste-banco", async (req, res) => {

    try {

        const resultado =
            await pool.query(
                "SELECT NOW()"
            );


        res.json({

            sucesso: true,

            mensagem:
                "PostgreSQL conectado!",

            data:
                resultado.rows[0]

        });

    } catch (erro) {

        console.error(erro);


        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro ao conectar ao PostgreSQL."

        });

    }

});


// ==========================================
// ROTAS DE USUÁRIOS
// ==========================================

app.use(
    "/api/usuarios",
    usuariosRoutes
);


// ==========================================
// ROTAS DE MÁQUINAS
// ==========================================

app.use(
    "/api/maquinas",
    maquinasRoutes
);


// ==========================================
// LOGIN
// ==========================================

app.post("/api/login", async (req, res) => {

    try {

        const {
            email,
            senha
        } = req.body;


        // ======================================
        // VALIDAR CAMPOS
        // ======================================

        if (
            !email ||
            !senha
        ) {

            return res.status(400).json({

                sucesso: false,

                mensagem:
                    "Informe o e-mail e a senha."

            });

        }


        // ======================================
        // BUSCAR USUÁRIO
        // ======================================

        const resultado =
            await pool.query(
                `
                SELECT
                    id,
                    nome,
                    email,
                    senha,
                    telefone,
                    criado_em

                FROM usuarios

                WHERE LOWER(email) =
                      LOWER($1)
                `,
                [email]
            );


        // ======================================
        // USUÁRIO NÃO ENCONTRADO
        // ======================================

        if (
            resultado.rows.length === 0
        ) {

            return res.status(401).json({

                sucesso: false,

                mensagem:
                    "E-mail ou senha incorretos."

            });

        }


        const usuario =
            resultado.rows[0];


        // ======================================
        // VERIFICAR SENHA
        // ======================================

        if (
            usuario.senha !== senha
        ) {

            return res.status(401).json({

                sucesso: false,

                mensagem:
                    "E-mail ou senha incorretos."

            });

        }


        // ======================================
        // LOGIN REALIZADO
        // ======================================

        res.json({

            sucesso: true,

            mensagem:
                "Login realizado com sucesso!",

            usuario: {

                id:
                    usuario.id,

                nome:
                    usuario.nome,

                email:
                    usuario.email,

                telefone:
                    usuario.telefone,

                criado_em:
                    usuario.criado_em

            }

        });


    } catch (erro) {

        console.error(
            "Erro ao realizar login:",
            erro
        );


        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro interno ao realizar login."

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