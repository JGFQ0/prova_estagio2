document.getElementById('agendForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const esporte = document.getElementById('esporte').value;
    
    const response = await fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, data, horario, esporte })
    });
    
    const result = await response.json();
    
    document.getElementById('message').textContent = result.message;
});

document.getElementById('verAgendamentos').addEventListener('click', async function() {
    const response = await fetch('http://localhost:3000/agendamento');
    const agendamentos = await response.json();
    
    const agendamentosList = document.getElementById('listaDAgend');
    agendamentosList.innerHTML = '';
    
    agendamentos.forEach(agendamento => {
        const agendamentoItem = document.createElement('div');
        agendamentoItem.className = 'agendamento-item';
        agendamentoItem.textContent = `Nome: ${agendamento.nome}, Data: ${agendamento.data}, Hora: ${agendamento.horario}, Esporte: ${agendamento.esporte}`;
        agendamentosList.appendChild(agendamentoItem);
    });
});
