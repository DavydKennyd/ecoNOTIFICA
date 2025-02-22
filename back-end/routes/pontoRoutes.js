const express = require('express');
const multer = require('multer');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// Configuração do multer para upload de arquivos
const upload = multer();

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'minha-chave-secreta', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rota para buscar os pontos de coleta
router.get('/pontos-de-coleta', async (req, res) => {
  try {
    const query = `
      SELECT cp.*, u.username 
      FROM collection_points cp
      JOIN users u ON cp.user_id = u.id;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar pontos de coleta:', error);
    res.status(500).json({ error: 'Erro ao buscar pontos de coleta' });
  }
});

// Rota para adicionar um novo ponto de coleta
router.post('/pontos-de-coleta', authenticateToken, upload.single('fotoVideo'), async (req, res) => {
  try {
    const { nome, endereco, referencia, tipoMaterial, responsavel, contato, descricao } = req.body;
    const fotoVideo = req.file ? req.file.buffer.toString('base64') : null; // Converte o arquivo para base64

    const query = `
      INSERT INTO collection_points (user_id, name, address, reference, material_type, responsible_name, contact_info, media_url, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      req.user.userId, // ID do usuário autenticado
      nome,
      endereco,
      referencia,
      tipoMaterial,
      responsavel,
      contato,
      fotoVideo, // URL ou base64 da mídia
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