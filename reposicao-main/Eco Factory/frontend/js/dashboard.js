// ======================================================
// ECOFACTORY - DASHBOARD
// ======================================================


// ======================================================
// 1. VERIFICAR USUÁRIO LOGADO
// ======================================================

const usuarioLogado =
    localStorage.getItem("ecofactory_logado");


// Se não estiver logado,
// volta para a tela de login.

if (usuarioLogado !== "true") {

    window.location.href = "index.html";

}


// ======================================================
// 2. DADOS DO USUÁRIO
// ======================================================

const nomeUsuario =
    localStorage.getItem("ecofactory_nome");


// Elementos do HTML

const welcomeMessage =
    document.getElementById("welcomeMessage");

const userName =
    document.getElementById("userName");

const userAvatar =
    document.getElementById("userAvatar");


// ======================================================
// 3. MOSTRAR NOME DO USUÁRIO
// ======================================================

if (nomeUsuario) {

    // "Olá, Matheus! 👋"

    if (welcomeMessage) {

        welcomeMessage.textContent =
            `Olá, ${nomeUsuario}! 👋`;

    }


    // Nome no canto superior direito

    if (userName) {

        userName.textContent =
            nomeUsuario;

    }


    // Primeira letra no avatar

    if (userAvatar) {

        userAvatar.textContent =
            nomeUsuario
                .charAt(0)
                .toUpperCase();

    }

}


// ======================================================
// 4. FUNÇÃO PARA PEGAR AS MÁQUINAS
// ======================================================

function obterMaquinas() {

    const dados =
        localStorage.getItem(
            "ecofactory_maquinas"
        );


    // Se ainda não existe nenhuma máquina

    if (!dados) {

        return [];

    }


    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar máquinas:",
            erro
        );

        return [];

    }

}


// ======================================================
// 5. ATUALIZAR DADOS DAS MÁQUINAS
// ======================================================

function atualizarMaquinas() {

    const maquinas =
        obterMaquinas();


    // ==================================================
    // CONTAGEM
    // ==================================================

    const total =
        maquinas.length;


    const ativas =
        maquinas.filter(
            maquina =>
                maquina.status === "Ativa"
        ).length;


    const paradas =
        maquinas.filter(
            maquina =>
                maquina.status === "Parada"
        ).length;


    const manutencao =
        maquinas.filter(
            maquina =>
                maquina.status === "Manutenção"
        ).length;


    // ==================================================
    // CARD "MÁQUINAS ATIVAS"
    // ==================================================

    const activeMachines =
        document.getElementById(
            "activeMachines"
        );


    const totalMachines =
        document.getElementById(
            "totalMachines"
        );


    if (activeMachines) {

        activeMachines.textContent =
            ativas;

    }


    if (totalMachines) {

        totalMachines.textContent =
            total;

    }


    // ==================================================
    // STATUS DAS MÁQUINAS
    // ==================================================

    const machineStatusTotal =
        document.getElementById(
            "machineStatusTotal"
        );


    const statusActive =
        document.getElementById(
            "statusActive"
        );


    const statusStopped =
        document.getElementById(
            "statusStopped"
        );


    const statusMaintenance =
        document.getElementById(
            "statusMaintenance"
        );


    if (machineStatusTotal) {

        machineStatusTotal.textContent =
            total;

    }


    if (statusActive) {

        statusActive.textContent =
            ativas;

    }


    if (statusStopped) {

        statusStopped.textContent =
            paradas;

    }


    if (statusMaintenance) {

        statusMaintenance.textContent =
            manutencao;

    }

}


// ======================================================
// 6. PRODUÇÃO
// ======================================================
//
// Ainda não criamos a tela de produção.
// Portanto, não vamos inventar números.
//
// Quando criarmos a tela Produção,
// esses valores poderão vir do localStorage/API.
// ======================================================

function atualizarProducao() {

    const totalProduction =
        document.getElementById(
            "totalProduction"
        );


    if (totalProduction) {

        totalProduction.textContent =
            "0";

    }


    // Caso exista algum elemento
    // relacionado ao gráfico de produção

    const productionChart =
        document.getElementById(
            "productionChart"
        );


    if (productionChart) {

        productionChart.innerHTML = "";

    }

}


// ======================================================
// 7. EFICIÊNCIA
// ======================================================
//
// Ainda não existem dados suficientes
// para calcular a eficiência.
// ======================================================

function atualizarEficiencia() {

    const efficiency =
        document.getElementById(
            "efficiency"
        );


    if (efficiency) {

        efficiency.textContent =
            "0%";

    }

}


// ======================================================
// 8. CONSUMO DE ENERGIA
// ======================================================
//
// Ainda não criamos a funcionalidade
// de consumo de energia.
// ======================================================

function atualizarEnergia() {

    const totalEnergy =
        document.getElementById(
            "totalEnergy"
        );


    const energyVariation =
        document.getElementById(
            "energyVariation"
        );


    if (totalEnergy) {

        totalEnergy.textContent =
            "0";

    }


    if (energyVariation) {

        energyVariation.textContent =
            "Sem dados";

    }

}


// ======================================================
// 9. CONSUMO DE ÁGUA
// ======================================================

function atualizarAgua() {

    const totalWater =
        document.getElementById(
            "totalWater"
        );


    const waterVariation =
        document.getElementById(
            "waterVariation"
        );


    if (totalWater) {

        totalWater.textContent =
            "0";

    }


    if (waterVariation) {

        waterVariation.textContent =
            "Sem dados";

    }

}


// ======================================================
// 10. OCORRÊNCIAS
// ======================================================
//
// Ainda não criamos a tela de ocorrências.
// Portanto, os valores começam em zero.
// ======================================================

function atualizarOcorrencias() {

    const totalOccurrences =
        document.getElementById(
            "totalOccurrences"
        );


    const safetyOccurrences =
        document.getElementById(
            "safetyOccurrences"
        );


    const healthOccurrences =
        document.getElementById(
            "healthOccurrences"
        );


    if (totalOccurrences) {

        totalOccurrences.textContent =
            "0";

    }


    if (safetyOccurrences) {

        safetyOccurrences.textContent =
            "0";

    }


    if (healthOccurrences) {

        healthOccurrences.textContent =
            "0";

    }

}


// ======================================================
// 11. ATUALIZAR DASHBOARD COMPLETO
// ======================================================

function atualizarDashboard() {

    atualizarMaquinas();

    atualizarProducao();

    atualizarEficiencia();

    atualizarEnergia();

    atualizarAgua();

    atualizarOcorrencias();

}


// ======================================================
// 12. BOTÃO DE NOTIFICAÇÕES
// ======================================================

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            alert(
                "Não existem novas notificações."
            );

        }
    );

}


// ======================================================
// 13. BOTÃO SAIR
// ======================================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmar =
                confirm(
                    "Deseja realmente sair do sistema?"
                );


            if (!confirmar) {

                return;

            }


            // Remove apenas o estado de login

            localStorage.removeItem(
                "ecofactory_logado"
            );


            // Mantém os dados da conta
            // e das máquinas salvos.


            // Volta para o login

            window.location.href =
                "index.html";

        }
    );

}


// ======================================================
// 14. ATUALIZAR AO ABRIR O DASHBOARD
// ======================================================

atualizarDashboard();


// ======================================================
// 15. ATUALIZAÇÃO AUTOMÁTICA
// ======================================================
//
// A cada 2 segundos o Dashboard verifica
// se alguma máquina foi cadastrada,
// editada ou excluída.
// ======================================================

setInterval(
    atualizarDashboard,
    2000
);


// ======================================================
// 16. ATUALIZAR AO VOLTAR PARA A ABA
// ======================================================

window.addEventListener(
    "focus",
    function () {

        atualizarDashboard();

    }
);


// ======================================================
// FIM DO DASHBOARD.JS
// ======================================================