const express = require('express');
const multer = require('multer');
const router = express.Router();
const pool = require('../config/db');

// Configuração do multer para processar o campo "fotoVideo"
const upload = multer({
  storage: multer.memoryStorage(), // Armazena o arquivo na memória (ou configure para salvar no disco)
  fileFilter: (req, file, cb) => {
    // Verifique o tipo de arquivo, se necessário
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Tipo de arquivo não suportado!'), false); // Rejeita o arquivo
    }
  }
});

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
router.post('/pontos-de-coleta', upload.single('fotoVideo'), async (req, res) => {
  try {
    const { nome, endereco, referencia, tipoMaterial, responsavel, contato, descricao } = req.body;
    const fotoVideo = req.file ? req.file.buffer.toString('base64') : null; // Converte o arquivo para base64 (ou salve no disco)

    const query = `
      INSERT INTO collection_points (user_id, name, address, reference, material_type, responsible_name, contact_info, media_url, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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