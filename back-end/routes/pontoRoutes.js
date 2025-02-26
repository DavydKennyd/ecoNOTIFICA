const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// Configuração do Multer para salvar arquivos em disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/')); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para o arquivo
  }
});

// Configuração do multer para upload de arquivos
const upload = multer({ storage: storage });

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

router.post('/pontos-de-coleta', authenticateToken, upload.single('fotoVideo'), async (req, res) => {
  try {
    console.log('Arquivo recebido:', req.file); // Verifique se o arquivo está sendo recebido
    const { nome, endereco, referencia, tipoMaterial, responsavel, contato, descricao } = req.body;
    const fotoVideo = req.file ? req.file.filename : null; // Nome do arquivo salvo

    console.log('Nome do arquivo:', fotoVideo); // Verifique o nome do arquivo

    const query = `
      INSERT INTO collection_points (user_id, name, address, reference, material_type, responsible_name, contact_info, media_url, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      req.user.userId,
      nome,
      endereco,
      referencia,
      tipoMaterial,
      responsavel,
      contato,
      fotoVideo, // Nome do arquivo da imagem
      descricao
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar ponto de coleta:', error);
    res.status(500).json({ error: 'Erro ao adicionar ponto de coleta' });
  }
});

// Rota para buscar os pontos de coleta do usuário
router.get('/meus-pontos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Obtém o ID do usuário a partir do token JWT

    // Query para buscar os pontos de coleta do usuário
    const query = `
      SELECT id, name, address, material_type
      FROM collection_points
      WHERE user_id = $1;
    `;

    const result = await pool.query(query, [userId]);

    res.json(result.rows); // Retorna a lista de pontos de coleta
  } catch (error) {
    console.error('Erro ao buscar pontos de coleta:', error);
    res.status(500).json({ error: 'Erro ao buscar pontos de coleta' });
  }
});

// Rota para excluir um ponto de coleta
router.delete('/pontos-de-coleta/:id', authenticateToken, async (req, res) => {
  const pontoId = req.params.id; // ID do ponto de coleta
  const userId = req.user.userId; // ID do usuário autenticado

  try {
    // Verifica se o ponto de coleta pertence ao usuário
    const verifyQuery = 'SELECT * FROM collection_points WHERE id = $1 AND user_id = $2';
    const verifyResult = await pool.query(verifyQuery, [pontoId, userId]);

    if (verifyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ponto de coleta não encontrado ou não pertence ao usuário' });
    }

    // Exclui o ponto de coleta
    const deleteQuery = 'DELETE FROM collection_points WHERE id = $1';
    await pool.query(deleteQuery, [pontoId]);

    res.json({ message: 'Ponto de coleta excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir ponto de coleta:', error);
    res.status(500).json({ error: 'Erro ao excluir ponto de coleta' });
  }
});

// Rota para registrar interesse em um ponto de coleta
router.post('/registrar-interesse', authenticateToken, async (req, res) => {
  const { pontoId } = req.body;
  const userId = req.user.userId;

  try {
    const query = `
      INSERT INTO ponto_interesse (ponto_id, usuario_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [pontoId, userId];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar interesse:', error);
    res.status(500).json({ error: 'Erro ao registrar interesse' });
  }
});

// Rota para listar os interesses em um ponto de coleta
router.get('/interesses/:pontoId', authenticateToken, async (req, res) => {
  const pontoId = req.params.pontoId;

  try {
    const query = `
      SELECT pi.*, u.username 
      FROM ponto_interesse pi
      JOIN users u ON pi.usuario_id = u.id
      WHERE pi.ponto_id = $1;
    `;

    const result = await pool.query(query, [pontoId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar interesses:', error);
    res.status(500).json({ error: 'Erro ao buscar interesses' });
  }
});

module.exports = router;