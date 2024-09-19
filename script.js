document.getElementById('agendForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    
    
    const response = await fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, data, horario })
    });
    
    const result = await response.json();
    
    document.getElementById('message').textContent = result.message;
});

document.getElementById('verAgendamentos').addEventListener('click', async function() {
    const response = await fetch('http://localhost:3000/agendamento');
    const agendamento = await response.json();
    
    const listaDAgend = document.getElementById('listaDAgend');
    listaDAgend.innerHTML = '';
    
    agendamento.forEach(agendamento => {
        const itemAgend = document.createElement('div');
        itemAgend.className = 'agendamento-item';
        //na linha 33, a parte de data saí assim na página: ano/mês/dia
        itemAgend.textContent = `Nome: ${agendamento.nome}, Data: ${agendamento.data}, Hora: ${agendamento.horario}`;
        listaDAgend.appendChild(itemAgend);
    });
});