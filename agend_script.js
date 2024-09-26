document.addEventListener("DOMContentLoaded", async () => {
    const agendItensDiv = document.getElementById('agendItens')

    // Função para buscar os agendamentos
    async function fetchAgendamentos() {
        const response = await fetch('http://localhost:3000/agendamento');
        const data = await response.json();

        function formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }

        // Criar inputs para cada agendamento
        data.forEach(item => {
            const div = document.createElement('div')
            div.id = `agendamento-${item.id}`
            div.className = "agendamento"

            div.innerHTML = `
            <fieldset>
                <div class="row">
                    <div class="column">
                        <label>Nome:</label>
                    </div>
                    <input class="inputNome" type="text" value="${item.nome}" disabled>

                    <div class="column">
                        <label>Esporte:</label>
                    </div>
                    <select class="opções2" disabled>
                        <option value="Futebol" ${item.esporte === 'Futebol' ? 'selected' : ''}>Futebol</option>
                        <option value="Vôlei" ${item.esporte === 'Vôlei' ? 'selected' : ''}>Vôlei</option>
                    </select>

                    <div class="column">
                        <label>Data:</label>
                    </div>
                    <input class="opções2" type="date" value="${formatDate(item.data)}" disabled>

                    <div class="column">
                        <label>Horário:</label>
                    </div>
                    <select class="opções2" disabled>
                        <option value="08:00" ${item.horario === '08:00' ? 'selected' : ''}>08:00</option>
                        <option value="09:00" ${item.horario === '09:00' ? 'selected' : ''}>09:00</option>
                    </select>
                </div>
                <button class="btnEditar" onclick="editarAgendamentos(${item.id})">Editar</button>
                <button class="btnSalvar" onclick="salvarAgendamentos(${item.id})" style="display:none;">Salvar</button>
                <button class="btnDeletar" onclick="deletarAgendamentos(${item.id})">Deletar</button>
            </fieldset>
            `
            agendItensDiv.appendChild(div)
        })
    }

    // Função para habilitar edição
    window.editarAgendamentos = (id) => {
        const div = document.getElementById(`agendamento-${id}`)
        const inputs = div.querySelectorAll('input')
        const selects = div.querySelectorAll('select')
        const editButton = div.querySelector('.btnEditar')
        const saveButton = div.querySelector('.btnSalvar')

        inputs.forEach(input => input.disabled = false);
        selects.forEach(select => select.disabled = false);
        editButton.style.display = 'none' // Esconde o botão de editar
        saveButton.style.display = 'inline' // Mostra o botão de salvar
    };

    // Função para salvar agendamento
    window.salvarAgendamentos = async (id) => {
        const div = document.getElementById(`agendamento-${id}`);
        const inputs = div.querySelectorAll('input');
        const selects = div.querySelectorAll('select');

        const updatedData = {
            nome: inputs[0].value,
            data: inputs[1].value,
            horario: selects[1].value,
            esporte: selects[0].value
        }

        const response = await fetch(`http://localhost:3000/agendamento/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })

        if (response.ok) {
            alert('Atualização de agendamento feita com sucesso.')
            inputs.forEach(input => input.disabled = true)
            selects.forEach(select => select.disabled = true)
            div.querySelector('.btnEditar').style.display = 'inline' // Mostra o botão de editar
            div.querySelector('.btnSalvar').style.display = 'none' // Esconde o botão de salvar
        } else {
            alert('Erro ao atualizar agendamento.')
        }
    }

    // Função de Delete
    window.deletarAgendamentos = async (id) => {
        const response = await fetch(`http://localhost:3000/agendamento/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            const div = document.getElementById(`agendamento-${id}`)
            div.remove()
        } else {
            alert('Erro ao deletar item.')
        }
    }

    // Chamar a função para buscar os agendamentos
    fetchAgendamentos()
})