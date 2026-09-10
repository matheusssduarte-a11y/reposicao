// ==========================================
// FORMULÁRIO DE CADASTRO
// ==========================================

const cadastroForm =
    document.getElementById("cadastroForm");


// ==========================================
// ENVIO DO FORMULÁRIO
// ==========================================

cadastroForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ======================================
        // PEGAR OS DADOS
        // ======================================

        const nome =
            document.getElementById("nome").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const cargo =
            document.getElementById("cargo").value;

        const senha =
            document.getElementById("senha").value;

        const confirmarSenha =
            document.getElementById("confirmarSenha").value;


        // ======================================
        // VALIDAR CAMPOS
        // ======================================

        if (
            nome === "" ||
            email === "" ||
            cargo === "" ||
            senha === "" ||
            confirmarSenha === ""
        ) {

            alert(
                "Preencha todos os campos."
            );

            return;
        }


        // ======================================
        // VALIDAR SENHAS
        // ======================================

        if (senha !== confirmarSenha) {

            alert(
                "As senhas não são iguais."
            );

            return;
        }


        // ======================================
        // VALIDAR TAMANHO DA SENHA
        // ======================================

        if (senha.length < 6) {

            alert(
                "A senha deve possuir pelo menos 6 caracteres."
            );

            return;
        }


        // ======================================
        // ENVIAR PARA O BACKEND
        // ======================================

        try {

            const resposta = await fetch(
                "http://localhost:3000/api/usuarios",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        nome: nome,
                        email: email,
                        cargo: cargo,
                        senha: senha

                    })

                }
            );


            const dados =
                await resposta.json();


            // ==================================
            // ERRO
            // ==================================

            if (!resposta.ok) {

                alert(
                    dados.mensagem ||
                    "Erro ao criar a conta."
                );

                return;
            }


            // ==================================
            // CADASTRO REALIZADO
            // ==================================

            alert(
                "Conta criada com sucesso!"
            );


            // Marcar usuário como logado
            localStorage.setItem(
                "ecofactory_logado",
                "true"
            );


            // Salvar nome temporariamente
            // para o dashboard
            localStorage.setItem(
                "ecofactory_nome",
                dados.usuario.nome
            );


            // Redirecionar
            window.location.href =
                "dashboard.html";


        } catch (erro) {

            console.error(
                "Erro:",
                erro
            );

            alert(
                "Não foi possível conectar ao servidor."
            );

        }

    }
);