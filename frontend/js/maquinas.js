// ==========================================
// BANCO DE DADOS LOCAL
// ==========================================

let maquinas =
    JSON.parse(
        localStorage.getItem(
            "ecofactory_maquinas"
        )
    ) || [];


// Máquina que está sendo editada
let maquinaEditando = null;


// ==========================================
// ELEMENTOS
// ==========================================

const machineForm =
    document.getElementById(
        "machineForm"
    );

const machineId =
    document.getElementById(
        "machineId"
    );

const machineName =
    document.getElementById(
        "machineName"
    );

const machineType =
    document.getElementById(
        "machineType"
    );

const machineLocation =
    document.getElementById(
        "machineLocation"
    );

const machineStatus =
    document.getElementById(
        "machineStatus"
    );

const installationDate =
    document.getElementById(
        "installationDate"
    );

const machineList =
    document.getElementById(
        "machineList"
    );

const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );

const totalMachines =
    document.getElementById(
        "totalMachines"
    );

const activeMachines =
    document.getElementById(
        "activeMachines"
    );

const maintenanceMachines =
    document.getElementById(
        "maintenanceMachines"
    );

const stoppedMachines =
    document.getElementById(
        "stoppedMachines"
    );

const searchMachine =
    document.getElementById(
        "searchMachine"
    );

const saveMachine =
    document.getElementById(
        "saveMachine"
    );

const cancelEdit =
    document.getElementById(
        "cancelEdit"
    );


// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================

function salvarMaquinas() {

    localStorage.setItem(

        "ecofactory_maquinas",

        JSON.stringify(maquinas)

    );

}


// ==========================================
// EXIBIR MÁQUINAS
// ==========================================

function renderizarMaquinas(
    filtro = ""
) {

    machineList.innerHTML = "";


    // Filtrar

    const maquinasFiltradas =
        maquinas.filter(
            maquina => {

                const texto =
                    `${maquina.id}
                    ${maquina.nome}
                    ${maquina.tipo}
                    ${maquina.localizacao}`
                    .toLowerCase();

                return texto.includes(
                    filtro.toLowerCase()
                );

            }
        );


    // Nenhuma máquina

    if (
        maquinasFiltradas.length === 0
    ) {

        emptyMessage.style.display =
            "block";

        return;

    }


    emptyMessage.style.display =
        "none";


    // Criar cada máquina

    maquinasFiltradas.forEach(
        maquina => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "machine-item";


            item.innerHTML = `

                <div class="machine-symbol">
                    ⚙
                </div>


                <div class="machine-info">

                    <strong>
                        ${maquina.nome}
                    </strong>

                    <span>
                        ${maquina.id}
                    </span>

                </div>


                <div class="machine-data">

                    <span>
                        TIPO
                    </span>

                    ${maquina.tipo}

                </div>


                <div class="machine-data">

                    <span>
                        LOCALIZAÇÃO
                    </span>

                    ${maquina.localizacao}

                </div>


                <div>

                    <span
                        class="
                        status
                        ${obterClasseStatus(
                            maquina.status
                        )}
                        "
                    >
                        ${maquina.status}
                    </span>

                </div>


                <div class="machine-actions">

                    <button
                        class="
                        action-button
                        edit-button
                        "
                        onclick="
                            editarMaquina(
                                '${maquina.id}'
                            )
                        "
                        title="Editar"
                    >
                        ✎
                    </button>


                    <button
                        class="
                        action-button
                        delete-button
                        "
                        onclick="
                            excluirMaquina(
                                '${maquina.id}'
                            )
                        "
                        title="Excluir"
                    >
                        🗑
                    </button>

                </div>

            `;


            machineList.appendChild(
                item
            );

        }
    );

}


// ==========================================
// CLASSE DO STATUS
// ==========================================

function obterClasseStatus(
    status
) {

    if (
        status === "Ativa"
    ) {

        return "status-ativa";

    }

    if (
        status === "Parada"
    ) {

        return "status-parada";

    }

    if (
        status === "Manutenção"
    ) {

        return "status-manutencao";

    }

    return "";

}


// ==========================================
// ATUALIZAR CONTADORES
// ==========================================

function atualizarResumo() {

    totalMachines.textContent =
        maquinas.length;


    activeMachines.textContent =
        maquinas.filter(
            maquina =>
                maquina.status === "Ativa"
        ).length;


    maintenanceMachines.textContent =
        maquinas.filter(
            maquina =>
                maquina.status ===
                "Manutenção"
        ).length;


    stoppedMachines.textContent =
        maquinas.filter(
            maquina =>
                maquina.status === "Parada"
        ).length;

}


// ==========================================
// CADASTRAR MÁQUINA
// ==========================================

machineForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ======================================
        // PEGAR VALORES
        // ======================================

        const dados = {

            id:
                machineId.value
                    .trim(),

            nome:
                machineName.value
                    .trim(),

            tipo:
                machineType.value,

            localizacao:
                machineLocation.value
                    .trim(),

            status:
                machineStatus.value,

            dataInstalacao:
                installationDate.value

        };


        // ======================================
        // VALIDAR
        // ======================================

        if (
            !dados.id ||
            !dados.nome ||
            !dados.tipo ||
            !dados.localizacao ||
            !dados.status ||
            !dados.dataInstalacao
        ) {

            alert(
                "Preencha todos os campos."
            );

            return;

        }


        // ======================================
        // EDITAR
        // ======================================

        if (
            maquinaEditando !== null
        ) {

            const index =
                maquinas.findIndex(
                    maquina =>
                        maquina.id ===
                        maquinaEditando
                );


            if (index !== -1) {

                maquinas[index] =
                    dados;

            }


            maquinaEditando = null;


            saveMachine.textContent =
                "+ Cadastrar máquina";


            cancelEdit.style.display =
                "none";


            alert(
                "Máquina atualizada com sucesso!"
            );

        }


        // ======================================
        // NOVA MÁQUINA
        // ======================================

        else {

            // Verificar ID duplicado

            const existe =
                maquinas.some(
                    maquina =>
                        maquina.id.toLowerCase() ===
                        dados.id.toLowerCase()
                );


            if (existe) {

                alert(
                    "Já existe uma máquina com este ID."
                );

                return;

            }


            maquinas.push(
                dados
            );


            alert(
                "Máquina cadastrada com sucesso!"
            );

        }


        // ======================================
        // SALVAR
        // ======================================

        salvarMaquinas();


        // ======================================
        // ATUALIZAR TELA
        // ======================================

        renderizarMaquinas();

        atualizarResumo();


        // ======================================
        // LIMPAR FORMULÁRIO
        // ======================================

        machineForm.reset();

    }
);


// ==========================================
// EDITAR
// ==========================================

function editarMaquina(
    id
) {

    const maquina =
        maquinas.find(
            maquina =>
                maquina.id === id
        );


    if (!maquina) {

        return;

    }


    machineId.value =
        maquina.id;

    machineName.value =
        maquina.nome;

    machineType.value =
        maquina.tipo;

    machineLocation.value =
        maquina.localizacao;

    machineStatus.value =
        maquina.status;

    installationDate.value =
        maquina.dataInstalacao;


    maquinaEditando =
        id;


    saveMachine.textContent =
        "Salvar alterações";


    cancelEdit.style.display =
        "block";


    // Voltar para o formulário

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

cancelEdit.addEventListener(
    "click",
    function () {

        maquinaEditando =
            null;

        machineForm.reset();

        saveMachine.textContent =
            "+ Cadastrar máquina";

        cancelEdit.style.display =
            "none";

    }
);


// ==========================================
// EXCLUIR
// ==========================================

function excluirMaquina(
    id
) {

    const maquina =
        maquinas.find(
            maquina =>
                maquina.id === id
        );


    if (!maquina) {

        return;

    }


    const confirmar =
        confirm(
            `Deseja realmente excluir a máquina "${maquina.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    maquinas =
        maquinas.filter(
            maquina =>
                maquina.id !== id
        );


    salvarMaquinas();

    renderizarMaquinas();

    atualizarResumo();


    alert(
        "Máquina excluída com sucesso!"
    );

}


// ==========================================
// PESQUISA
// ==========================================

searchMachine.addEventListener(
    "input",
    function () {

        renderizarMaquinas(
            searchMachine.value
        );

    }
);


// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


logoutButton.addEventListener(
    "click",
    function () {

        const confirmar =
            confirm(
                "Deseja realmente sair do sistema?"
            );


        if (confirmar) {

            localStorage.removeItem(
                "ecofactory_logado"
            );

            window.location.href =
                "index.html";

        }

    }
);


// ==========================================
// NOTIFICAÇÕES
// ==========================================

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


notificationButton.addEventListener(
    "click",
    function () {

        alert(
            "Você possui 3 novas notificações."
        );

    }
);


// ==========================================
// USUÁRIO LOGADO
// ==========================================

const nomeUsuario =
    localStorage.getItem(
        "ecofactory_nome"
    );


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


    userAvatar.textContent =
        nomeUsuario
            .charAt(0)
            .toUpperCase();

}


// ==========================================
// INICIALIZAR
// ==========================================

renderizarMaquinas();

atualizarResumo();