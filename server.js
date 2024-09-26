const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web_banco'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.post('/agendamento', (req, res) => {
    const { nome, data, horario, esporte } = req.body;
    const query = 'INSERT INTO agendamentos (nome, data, horario,esporte) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, data, horario,esporte], (err, result) => {
        if (err) {
            console.error('Erro ao inserir agendamento:', err);
            res.status(500).json({ message: 'Erro ao realizar agendamento' });
            return;
        }
        res.json({ message: 'Agendamento realizado com sucesso!' });
    });
});

app.get('/agendamento', (req, res) => {
    const query = 'SELECT * FROM agendamentos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            res.status(500).json({ message: 'Erro ao buscar agendamentos' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
