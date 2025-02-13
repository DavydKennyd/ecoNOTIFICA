const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Ajuste conforme sua conexão com o banco de dados

// Rota para buscar os pontos de coleta
router.get('/pontos-de-coleta', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM collection_points'); // Ajuste conforme o nome da sua tabela
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar pontos de coleta:', error);
    res.status(500).json({ error: 'Erro ao buscar pontos de coleta' });
  }
});

// Rota para adicionar um novo ponto de coleta
router.post('/pontos-de-coleta', async (req, res) => {
  try {
    const { user_id, name, address, reference, material_type, responsible_name, contact_info, description } = req.body;

    const query = `
      INSERT INTO collection_points (user_id, name, address, reference, material_type, responsible_name, contact_info, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [user_id, name, address, reference, material_type, responsible_name, contact_info, description];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]); // Retorna o registro criado
  } catch (error) {
    console.error('Erro ao adicionar ponto de coleta:', error);
    res.status(500).json({ error: 'Erro ao adicionar ponto de coleta' });
  }
});

module.exports = router;
