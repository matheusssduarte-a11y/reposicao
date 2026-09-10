
// ==========================================
// CONFIGURAÇÃO DA API
// ==========================================

const API_URL =
    "http://localhost:3000/api/maquinas";


// ==========================================
// LISTA DE MÁQUINAS
// ==========================================

let maquinas = [];


// Máquina que está sendo editada
let maquinaEditando = null;


// ==========================================
// ELEMENTOS
// ==========================================

const machineForm =
    document.getElementById("machineForm");

const machineId =
    document.getElementById("machineId");

const machineName =
    document.getElementById("machineName");

const machineType =
    document.getElementById("machineType");

const machineLocation =
    document.getElementById("machineLocation");

const machineStatus =
    document.getElementById("machineStatus");

const installationDate =
    document.getElementById("installationDate");

const machineList =
    document.getElementById("machineList");

const emptyMessage =
    document.getElementById("emptyMessage");

const totalMachines =
    document.getElementById("totalMachines");

const activeMachines =
    document.getElementById("activeMachines");

const maintenanceMachines =
    document.getElementById("maintenanceMachines");

const stoppedMachines =
    document.getElementById("stoppedMachines");

const searchMachine =
    document.getElementById("searchMachine");

const saveMachine =
    document.getElementById("saveMachine");

const cancelEdit =
    document.getElementById("cancelEdit");


// ==========================================
// BUSCAR MÁQUINAS DA API
// ==========================================

async function carregarMaquinas() {

    try {

        const resposta =
            await fetch(API_URL);


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.mensagem ||
                "Erro ao carregar máquinas."
            );

        }


        maquinas =
            dados.maquinas || [];


        renderizarMaquinas();

        atualizarResumo();


    } catch (erro) {

        console.error(
            "Erro ao carregar máquinas:",
            erro
        );


        alert(
            "Não foi possível carregar as máquinas."
        );

    }

}


// ==========================================
// EXIBIR MÁQUINAS
// ==========================================

function renderizarMaquinas(filtro = "") {

    machineList.innerHTML = "";


    // ======================================
    // FILTRAR MÁQUINAS
    // ======================================

    const maquinasFiltradas =
        maquinas.filter(maquina => {

            const texto = `
                ${maquina.codigo || ""}
                ${maquina.nome || ""}
                ${maquina.tipo || ""}
                ${maquina.localizacao || ""}
                ${maquina.status || ""}
            `.toLowerCase();


            return texto.includes(
                filtro.toLowerCase()
            );

        });


    // ======================================
    // NENHUMA MÁQUINA
    // ======================================

    if (
        maquinasFiltradas.length === 0
    ) {

        emptyMessage.style.display =
            "block";

        return;

    }


    emptyMessage.style.display =
        "none";


    // ======================================
    // CRIAR CADA MÁQUINA
    // ======================================

    maquinasFiltradas.forEach(
        maquina => {

            const item =
                document.createElement("div");


            item.className =
                "machine-item";


            item.innerHTML = `

                <div class="machine-symbol">
                    ⚙
                </div>


                <div class="machine-info">

                    <strong>
                        ${maquina.nome || ""}
                    </strong>

                    <span>
                        ${maquina.codigo || ""}
                    </span>

                </div>


                <div class="machine-data">

                    <span>
                        TIPO
                    </span>

                    ${maquina.tipo || "-"}

                </div>


                <div class="machine-data">

                    <span>
                        LOCALIZAÇÃO
                    </span>

                    ${maquina.localizacao || "-"}

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
                        ${maquina.status || "-"}
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
                                ${maquina.id}
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
                                ${maquina.id}
                            )
                        "
                        title="Excluir"
                    >
                        🗑
                    </button>

                </div>

            `;


            machineList.appendChild(item);

        }
    );

}


// ==========================================
// CLASSE DO STATUS
// ==========================================

function obterClasseStatus(status) {

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
                maquina.status === "Manutenção"
        ).length;


    stoppedMachines.textContent =
        maquinas.filter(
            maquina =>
                maquina.status === "Parada"
        ).length;

}


// ==========================================
// FORMULÁRIO
// ==========================================

machineForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ======================================
        // PEGAR VALORES
        // ======================================

        const codigo =
            machineId.value.trim();

        const nome =
            machineName.value.trim();

        const tipo =
            machineType.value.trim();

        const localizacao =
            machineLocation.value.trim();

        const status =
            machineStatus.value.trim();

        const data_instalacao =
            installationDate.value.trim();


        // ======================================
        // VALIDAR CAMPOS
        // ======================================

        const camposVazios = [];


        if (!codigo) {

            camposVazios.push(
                "ID da máquina"
            );

        }


        if (!nome) {

            camposVazios.push(
                "Nome da máquina"
            );

        }


        if (!tipo) {

            camposVazios.push(
                "Tipo"
            );

        }


        if (!localizacao) {

            camposVazios.push(
                "Localização"
            );

        }


        if (!status) {

            camposVazios.push(
                "Status"
            );

        }


        if (!data_instalacao) {

            camposVazios.push(
                "Data de instalação"
            );

        }


        if (
            camposVazios.length > 0
        ) {

            alert(
                "Preencha os seguintes campos:\n\n" +
                camposVazios.join("\n")
            );

            return;

        }


        // ======================================
        // DADOS PARA A API
        // ======================================

        const dados = {

            usuario_id: 1,

            codigo:
                codigo,

            nome:
                nome,

            tipo:
                tipo,

            localizacao:
                localizacao,

            status:
                status,

            data_instalacao:
                data_instalacao

        };


        // ======================================
        // EDITAR MÁQUINA
        // ======================================

        if (
            maquinaEditando !== null
        ) {

            try {

                const resposta =
                    await fetch(
                        `${API_URL}/${maquinaEditando}`,
                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(dados)

                        }
                    );


                const resultado =
                    await resposta.json();


                if (!resposta.ok) {

                    alert(
                        resultado.mensagem ||
                        "Erro ao atualizar máquina."
                    );

                    return;

                }


                alert(
                    "Máquina atualizada com sucesso!"
                );


                // Sair do modo de edição

                maquinaEditando =
                    null;


                saveMachine.textContent =
                    "+ Cadastrar máquina";


                cancelEdit.style.display =
                    "none";


                machineForm.reset();


                // Atualizar lista

                await carregarMaquinas();


            } catch (erro) {

                console.error(
                    "Erro ao editar máquina:",
                    erro
                );


                alert(
                    "Não foi possível conectar à API."
                );

            }


            return;

        }


        // ======================================
        // VERIFICAR CÓDIGO DUPLICADO
        // ======================================

        const existe =
            maquinas.some(
                maquina =>

                    String(
                        maquina.codigo || ""
                    ).toLowerCase() ===
                    codigo.toLowerCase()
            );


        if (existe) {

            alert(
                "Já existe uma máquina com este ID."
            );

            return;

        }


        // ======================================
        // CADASTRAR NOVA MÁQUINA
        // ======================================

        try {

            const resposta =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(dados)

                    }
                );


            const resultado =
                await resposta.json();


            if (!resposta.ok) {

                alert(
                    resultado.mensagem ||
                    "Erro ao cadastrar máquina."
                );

                return;

            }


            alert(
                "Máquina cadastrada com sucesso!"
            );


            machineForm.reset();


            await carregarMaquinas();


        } catch (erro) {

            console.error(
                "Erro ao cadastrar máquina:",
                erro
            );


            alert(
                "Não foi possível conectar à API."
            );

        }

    }
);


// ==========================================
// EDITAR MÁQUINA
// ==========================================

function editarMaquina(id) {

    const maquina =
        maquinas.find(
            maquina =>
                String(maquina.id) ===
                String(id)
        );


    if (!maquina) {

        alert(
            "Máquina não encontrada."
        );

        return;

    }


    // ======================================
    // PREENCHER FORMULÁRIO
    // ======================================

    machineId.value =
        maquina.codigo || "";

    machineName.value =
        maquina.nome || "";

    machineType.value =
        maquina.tipo || "";

    machineLocation.value =
        maquina.localizacao || "";

    machineStatus.value =
        maquina.status || "";

    installationDate.value =
        maquina.data_instalacao
        ? String(
            maquina.data_instalacao
        ).substring(0, 10)
        : "";


    // ======================================
    // GUARDAR ID DO BANCO
    // ======================================

    maquinaEditando =
        maquina.id;


    // ======================================
    // ALTERAR BOTÃO
    // ======================================

    saveMachine.textContent =
        "Salvar alterações";


    cancelEdit.style.display =
        "block";


    // ======================================
    // VOLTAR PARA O FORMULÁRIO
    // ======================================

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
// EXCLUIR MÁQUINA
// ==========================================

async function excluirMaquina(id) {

    const maquina =
        maquinas.find(
            maquina =>
                Number(maquina.id) ===
                Number(id)
        );


    if (!maquina) {

        alert(
            "Máquina não encontrada."
        );

        return;

    }


    // ======================================
    // CONFIRMAR EXCLUSÃO
    // ======================================

    const confirmar =
        confirm(
            `Deseja realmente excluir a máquina "${maquina.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    // ======================================
    // ENVIAR DELETE PARA A API
    // ======================================

    try {

        const resposta =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "DELETE"

                }
            );


        const resultado =
            await resposta.json();


        // ==================================
        // ERRO
        // ==================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Erro ao excluir máquina."
            );

            return;

        }


        // ==================================
        // SUCESSO
        // ==================================

        alert(
            "Máquina excluída com sucesso!"
        );


        // ==================================
        // ATUALIZAR LISTA
        // ==================================

        await carregarMaquinas();


    } catch (erro) {

        console.error(
            "Erro ao excluir máquina:",
            erro
        );


        alert(
            "Não foi possível conectar à API."
        );

    }

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

carregarMaquinas();