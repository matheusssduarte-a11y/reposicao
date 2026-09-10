// ==========================================
// FORMULÁRIO DE LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");


// ==========================================
// ENVIO DO LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ======================================
        // PEGAR DADOS DIGITADOS
        // ======================================

        const email =
            document.getElementById("email")
                .value
                .trim();

        const senha =
            document.getElementById("senha")
                .value;


        // ======================================
        // VERIFICAR CAMPOS
        // ======================================

        if (
            email === "" ||
            senha === ""
        ) {

            alert(
                "Preencha seu e-mail e sua senha."
            );

            return;
        }


        // ======================================
        // ENVIAR PARA A API
        // ======================================

        try {

            const resposta = await fetch(
                "http://localhost:3000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        email: email,
                        senha: senha

                    })

                }
            );


            // ==================================
            // CONVERTER RESPOSTA
            // ==================================

            const dados =
                await resposta.json();


            // ==================================
            // VERIFICAR ERRO
            // ==================================

            if (!resposta.ok) {

                alert(
                    dados.mensagem ||
                    "E-mail ou senha incorretos."
                );

                return;
            }


            // ==================================
            // LOGIN REALIZADO
            // ==================================

            localStorage.setItem(
                "ecofactory_logado",
                "true"
            );


            // ==================================
            // SALVAR DADOS DO USUÁRIO
            // ==================================

            localStorage.setItem(
                "ecofactory_usuario_logado",
                JSON.stringify(
                    dados.usuario
                )
            );
            localStorage.setItem(
    "ecofactory_usuario_id",
    dados.usuario.id
);


            localStorage.setItem(
                "ecofactory_nome",
                dados.usuario.nome
            );


            // ==================================
            // MENSAGEM
            // ==================================

            alert(
                "Login realizado com sucesso!"
            );


            // ==================================
            // IR PARA O DASHBOARD
            // ==================================

            window.location.href =
                "dashboard.html";


        } catch (erro) {

            console.error(
                "Erro ao conectar com a API:",
                erro
            );

            alert(
                "Não foi possível conectar ao servidor."
            );

        }

    }
);