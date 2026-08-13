// ==========================================
// ELEMENTOS
// ==========================================

const logoutButton =
    document.getElementById("logoutButton");

const notificationButton =
    document.getElementById(
        "notificationButton"
    );

const newMachine =
    document.getElementById("newMachine");

const newProduction =
    document.getElementById(
        "newProduction"
    );

const newOccurrence =
    document.getElementById(
        "newOccurrence"
    );

const reports =
    document.getElementById("reports");


// ==========================================
// LOGOUT
// ==========================================

logoutButton.addEventListener(
    "click",
    () => {

        const confirmation =
            confirm(
                "Deseja realmente sair do sistema?"
            );

        if (confirmation) {

            window.location.href =
                "index.html";

        }

    }
);


// ==========================================
// NOTIFICAÇÕES
// ==========================================

notificationButton.addEventListener(
    "click",
    () => {

        alert(
            "Você possui 3 novas notificações."
        );

    }
);


// ==========================================
// ATALHO - NOVA MÁQUINA
// ==========================================

newMachine.addEventListener(
    "click",
    () => {

        alert(
            "Abrindo cadastro de nova máquina..."
        );

        /*
         * Futuramente:
         *
         * window.location.href =
         * "maquinas/cadastro.html";
         */

    }
);


// ==========================================
// ATALHO - NOVA PRODUÇÃO
// ==========================================

newProduction.addEventListener(
    "click",
    () => {

        alert(
            "Abrindo cadastro de produção..."
        );

        /*
         * Futuramente:
         *
         * window.location.href =
         * "producao/cadastro.html";
         */

    }
);


// ==========================================
// ATALHO - OCORRÊNCIA
// ==========================================

newOccurrence.addEventListener(
    "click",
    () => {

        alert(
            "Abrindo registro de ocorrência..."
        );

        /*
         * Futuramente:
         *
         * window.location.href =
         * "ocorrencias/cadastro.html";
         */

    }
);


// ==========================================
// RELATÓRIOS
// ==========================================

reports.addEventListener(
    "click",
    () => {

        alert(
            "Abrindo módulo de relatórios..."
        );

        /*
         * Futuramente:
         *
         * window.location.href =
         * "relatorios.html";
         */

    }
);


// ==========================================
// ANIMAÇÃO DOS NÚMEROS
// ==========================================

function animateNumber(
    element,
    target,
    duration = 1000
) {

    const start = 0;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const currentValue =
            Math.floor(
                start +
                (target - start) *
                progress
            );


        element.textContent =
            currentValue.toLocaleString(
                "pt-BR"
            );


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(update);
}


// ==========================================
// ANIMAR PRODUÇÃO
// ==========================================

const productionValue =
    document.getElementById(
        "productionValue"
    );

animateNumber(
    productionValue,
    12540,
    1200
);


// ==========================================
// SELEÇÃO DE UNIDADE
// ==========================================

const productionUnit =
    document.getElementById(
        "productionUnit"
    );

productionUnit.addEventListener(
    "change",
    () => {

        console.log(
            "Unidade selecionada:",
            productionUnit.value
        );

    }
);


// ==========================================
// MENU LATERAL
// ==========================================

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


menuItems.forEach(
    item => {

        item.addEventListener(
            "click",
            event => {

                /*
                 * Impede navegação dos links
                 * que ainda não possuem páginas.
                 */

                if (
                    item.getAttribute("href") ===
                    "#"
                ) {

                    event.preventDefault();

                }


                menuItems.forEach(
                    menu => {

                        menu.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    }
);

// ==========================================
// NOME DO USUÁRIO
// ==========================================

const welcomeMessage =
    document.getElementById("welcomeMessage");

const nomeUsuario =
    localStorage.getItem("ecofactory_nome");

if (nomeUsuario) {

    welcomeMessage.textContent =
        `Olá, ${nomeUsuario}! 👋`;

};
// ==========================================
// INFORMAÇÕES DO USUÁRIO
// ==========================================

const userName =
    document.getElementById(
        "userName"
    );

const userAvatar =
    document.getElementById(
        "userAvatar"
    );


if (nomeUsuario) {

    userName.textContent =
        nomeUsuario;


    // Pega a primeira letra do nome

    userAvatar.textContent =
        nomeUsuario
            .charAt(0)
            .toUpperCase();

}