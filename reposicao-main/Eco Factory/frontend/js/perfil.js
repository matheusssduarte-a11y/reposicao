// ==========================================
// PERFIL DO USUÁRIO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // VERIFICAR LOGIN
    // ==========================================

    const estaLogado =
        localStorage.getItem(
            "ecofactory_logado"
        );


    if (estaLogado !== "true") {

        alert(
            "Nenhum usuário está logado."
        );

        window.location.href =
            "index.html";

        return;
    }


    // ==========================================
    // PEGAR USUÁRIO
    // ==========================================

    let usuario = null;

    const usuarioLogado =
        localStorage.getItem(
            "ecofactory_usuario_logado"
        );


    // Se existir usuário logado completo
    if (usuarioLogado) {

        try {

            usuario =
                JSON.parse(usuarioLogado);

        } catch (erro) {

            console.error(
                "Erro ao carregar usuário:",
                erro
            );

        }

    }


    // ==========================================
    // CASO NÃO TENHA O OBJETO
    // ==========================================

    if (!usuario) {

        const usuarioSalvo =
            localStorage.getItem(
                "ecofactory_usuario"
            );


        if (usuarioSalvo) {

            try {

                usuario =
                    JSON.parse(usuarioSalvo);

            } catch (erro) {

                console.error(
                    "Erro ao carregar cadastro:",
                    erro
                );

            }

        }

    }


    // ==========================================
    // VERIFICAR NOVAMENTE
    // ==========================================

    if (!usuario) {

        alert(
            "Não foi possível carregar os dados do usuário."
        );

        window.location.href =
        "index.html";

        return;
    }


    console.log(
        "Usuário logado:",
        usuario
    );


    // ==========================================
    // ELEMENTOS
    // ==========================================

    const nameInput =
        document.getElementById("name");

    const usernameInput =
        document.getElementById("username");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const passwordInput =
        document.getElementById("password");

    const profileName =
        document.getElementById("profileName");

    const profileUsername =
        document.getElementById("profileUsername");

    const profileAvatar =
        document.getElementById("profileAvatar");


    // ==========================================
    // PEGAR DADOS DO USUÁRIO
    // ==========================================

    const nome =
        usuario.nome || "";

    const username =
        usuario.usuario ||
        usuario.username ||
        "";

    const email =
        usuario.email || "";

    const telefone =
        usuario.telefone ||
        usuario.phone ||
        "";

    const senha =
        usuario.senha || "";


    // ==========================================
    // PREENCHER FORMULÁRIO
    // ==========================================

    if (nameInput) {
        nameInput.value = nome;
    }

    if (usernameInput) {
        usernameInput.value = username;
    }

    if (emailInput) {
        emailInput.value = email;
    }

    if (phoneInput) {
        phoneInput.value = telefone;
    }

    if (passwordInput) {
        passwordInput.value = senha;
    }


    // ==========================================
    // PREENCHER CABEÇALHO DO PERFIL
    // ==========================================

    if (profileName) {

        profileName.textContent =
            nome || "Usuário";

    }


    if (profileUsername) {

        profileUsername.textContent =
            username
                ? "@" + username
                : "";

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            nome
                ? nome.charAt(0).toUpperCase()
                : "U";

    }


    // ==========================================
    // SALVAR ALTERAÇÕES
    // ==========================================

    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // Atualizar objeto
                usuario.nome =
                    nameInput.value.trim();

                usuario.usuario =
                    usernameInput.value.trim();

                usuario.email =
                    emailInput.value.trim();

                usuario.telefone =
                    phoneInput.value.trim();

                usuario.senha =
                    passwordInput.value;


                // Salvar cadastro atualizado
                localStorage.setItem(
                    "ecofactory_usuario",
                    JSON.stringify(usuario)
                );


                // Salvar usuário logado atualizado
                localStorage.setItem(
                    "ecofactory_usuario_logado",
                    JSON.stringify(usuario)
                );


                // Atualizar nome usado pelo dashboard
                localStorage.setItem(
                    "ecofactory_nome",
                    usuario.nome
                );


                // Atualizar visual
                if (profileName) {

                    profileName.textContent =
                        usuario.nome;

                }


                if (profileAvatar) {

                    profileAvatar.textContent =
                        usuario.nome
                            .charAt(0)
                            .toUpperCase();

                }


                alert(
                    "Perfil atualizado com sucesso!"
                );

            }
        );

    }


    // ==========================================
    // BOTÃO CANCELAR
    // ==========================================

    const cancelButton =
        document.getElementById(
            "cancelButton"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );

    }


    // ==========================================
    // BOTÃO SAIR
    // ==========================================

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "ecofactory_logado"
                );

                localStorage.removeItem(
                    "ecofactory_nome"
                );

                localStorage.removeItem(
                    "ecofactory_usuario_logado"
                );


                window.location.href =
                    "index.html";

            }
        );

    }

});