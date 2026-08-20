// ==========================================
// FORMULÁRIO DE LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");


// ==========================================
// VERIFICAR SE O FORMULÁRIO EXISTE
// ==========================================

if (loginForm) {

    // ==========================================
    // ENVIO DO LOGIN
    // ==========================================

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // ======================================
        // PEGAR DADOS DIGITADOS
        // ======================================

        const email = document
            .getElementById("email")
            .value
            .trim();

        const senha = document
            .getElementById("senha")
            .value;


        // ======================================
        // VERIFICAR CAMPOS
        // ======================================

        if (email === "" || senha === "") {

            alert(
                "Preencha seu e-mail e sua senha."
            );

            return;
        }


        // ======================================
        // BUSCAR USUÁRIO CADASTRADO
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

        let usuario;

        try {

            usuario = JSON.parse(usuarioSalvo);

        } catch (erro) {

            alert(
                "Não foi possível carregar os dados da conta."
            );

            return;
        }


        // ======================================
        // COMPARAR LOGIN
        // ======================================

        const emailCorreto =
            usuario.email &&
            usuario.email.toLowerCase() ===
            email.toLowerCase();

        const senhaCorreta =
            usuario.senha === senha;


        // ======================================
        // LOGIN CORRETO
        // ======================================

        if (emailCorreto && senhaCorreta) {

            // Usuário está logado
            localStorage.setItem(
                "ecofactory_logado",
                "true"
            );


            // Salvar nome
            localStorage.setItem(
                "ecofactory_nome",
                usuario.nome
            );


            // Salvar dados completos do usuário
            // para serem utilizados no perfil

            localStorage.setItem(
                "ecofactory_usuario_logado",
                JSON.stringify(usuario)
            );


            // ==================================
            // REDIRECIONAR PARA DASHBOARD
            // ==================================

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

    });

}