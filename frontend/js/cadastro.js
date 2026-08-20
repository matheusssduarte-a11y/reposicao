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
    function (event) {

        // Impede o formulário de recarregar a página
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
            document.getElementById(
                "confirmarSenha"
            ).value;


        // ======================================
        // VALIDAÇÃO
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
        // VERIFICAR SE JÁ EXISTE CONTA
        // ======================================

        const usuarioExistente =
            localStorage.getItem(
                "ecofactory_usuario"
            );


        if (usuarioExistente) {

            const usuario =
                JSON.parse(
                    usuarioExistente
                );


            if (
                usuario.email.toLowerCase() ===
                email.toLowerCase()
            ) {

                alert(
                    "Já existe uma conta cadastrada com este e-mail."
                );

                return;
            }
        }


        // ======================================
        // CRIAR OBJETO DO USUÁRIO
        // ======================================

        const usuario = {

            nome: nome,

            email: email,

            cargo: cargo,

            senha: senha

        };


        // ======================================
        // SALVAR NO NAVEGADOR
        // ======================================

        localStorage.setItem(

            "ecofactory_usuario",

            JSON.stringify(usuario)

        );


        // ======================================
        // MARCAR USUÁRIO COMO LOGADO
        // ======================================

        localStorage.setItem(
            "ecofactory_logado",
            "true"
        );


        // ======================================
        // MENSAGEM
        // ======================================

        alert(
            "Conta criada com sucesso!"
        );


        // ======================================
        // REDIRECIONAR PARA DASHBOARD
        // ======================================

        window.location.href =
            "dashboard.html";

    }
);