const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'carros',
    password: 'postgres',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/carros', async (req, res) => {
    const { model, brand, year, color } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO carros (model, brand, year, color) VALUES ($1, $2, $3, $4) RETURNING *',
            [model, brand, year, color]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar carro.' });
    }
});

app.get('/carros', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM carros');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar carros.' });
    }
});

app.put('/carros/:id', async (req, res) => {
    const { id } = req.params;
    const { model, brand, year, color } = req.body;
    try {
        const result = await pool.query(
            'UPDATE carros SET model = $1, brand = $2, year = $3, color = $4 WHERE id = $5 RETURNING *',
            [model, brand, year, color, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar carro.' });
    }
});

app.delete('/carros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM carros WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir carro.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
