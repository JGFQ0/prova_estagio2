const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let agendamento = [];

app.post('/agendamento', (req, res) => {
    const { nome, data, horario } = req.body;
    agendamento.push({ nome, data, horario });
    res.json({ message: 'Agendamento realizado com sucesso!' });
});

app.get('/agendamento', (req, res) => {
    res.json(agendamento);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
