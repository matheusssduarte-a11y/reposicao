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
    function (event) {

        event.preventDefault();


        // ======================================
        // PEGAR DADOS DIGITADOS
        // ======================================

        const email =
            document.getElementById(
                "email"
            ).value.trim();

        const senha =
            document.getElementById(
                "senha"
            ).value;


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
        // BUSCAR USUÁRIO
        // ======================================

        const usuarioSalvo =
            localStorage.getItem(
                "ecofactory_usuario"
            );


        // ======================================
        // VERIFICAR SE EXISTE CONTA
        // ======================================

        if (!usuarioSalvo) {

            alert(
                "Nenhuma conta foi encontrada. Crie uma conta primeiro."
            );

            return;
        }


        // ======================================
        // CONVERTER JSON
        // ======================================

        const usuario =
            JSON.parse(
                usuarioSalvo
            );


        // ======================================
        // COMPARAR LOGIN
        // ======================================

        const emailCorreto =
            usuario.email.toLowerCase() ===
            email.toLowerCase();

        const senhaCorreta =
            usuario.senha === senha;


        // ======================================
        // LOGIN CORRETO
        // ======================================

        if (
            emailCorreto &&
            senhaCorreta
        ) {

            // Marcar como logado
            localStorage.setItem(
                "ecofactory_logado",
                "true"
            );


            // Salvar nome para usar no dashboard
            localStorage.setItem(
                "ecofactory_nome",
                usuario.nome
            );


            // Redirecionar
            window.location.href =
                "dashboard.html";

        }

        // ======================================
        // LOGIN INCORRETO
        // ======================================

        else {

            alert(
                "E-mail ou senha incorretos."
            );

        }

    }
);