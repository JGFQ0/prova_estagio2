document.getElementById('agendForm').addEventListener('submit', async function(event) {
    event.preventDefault()
    
    const nome = document.getElementById('nome').value
    const data = document.getElementById('data').value
    const horario = document.getElementById('horario').value
    const esporte = document.getElementById('esporte').value

    // Definindo o esporte_id com base na escolha do usuário
    let esporte_id
    if (esporte === 'Futebol') {
        esporte_id = 1
    } else if (esporte === 'Vôlei') {
        esporte_id = 2
    }

    const response = await fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, data, horario, esporte, esporte_id })
    })

    const result = await response.json()
    
    document.getElementById('message').textContent = result.message
})