const express = require('express');
const multer = require('multer');
const router = express.Router();
const pool = require('../config/db');

const upload = multer(); // Configuração básica do multer

// Rota para buscar os pontos de coleta
router.get('/pontos-de-coleta', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM collection_points');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar pontos de coleta:', error);
    res.status(500).json({ error: 'Erro ao buscar pontos de coleta' });
  }
});

// Rota para adicionar um novo ponto de coleta
router.post('/pontos-de-coleta', upload.none(), async (req, res) => {
  try {
    const { nome, endereco, referencia, tipoMaterial, responsavel, contato, descricao } = req.body;

    const query = `
      INSERT INTO collection_points (user_id, name, address, reference, material_type, responsible_name, contact_info, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      1, // Defina o user_id corretamente (pode ser dinâmico)
      nome,
      endereco,
      referencia,
      tipoMaterial,
      responsavel,
      contato,
      descricao
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]); // Retorna o registro criado
  } catch (error) {
    console.error('Erro ao adicionar ponto de coleta:', error);
    res.status(500).json({ error: 'Erro ao adicionar ponto de coleta' });
  }
});

module.exports = router;