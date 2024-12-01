const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'carrocrudprogiv',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/carros', async (req, res) => {
    const { modelo, marca, ano, cor } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO carro (modelo, marca, ano, cor) VALUES ($1, $2, $3, $4) RETURNING *',
            [modelo, marca, ano, cor]
        );
        console.log(result.rows[0]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar carro.' });
    }
});

app.get('/carros', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM carro');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar carros.' });
    }
});

app.put('/carros/:id', async (req, res) => {
    const { id } = req.params;
    const { modelo, marca, ano, cor } = req.body;
    try {
        const result = await pool.query(
            'UPDATE carro SET modelo = $1, marca = $2, ano = $3, cor = $4 WHERE id = $5 RETURNING *',
            [modelo, marca, ano, cor, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar carro.' });
    }
});

app.delete('/carros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM carro WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir carro.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
