const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../../middleware/authenticateToken'); // Middleware de autenticação

// Rota para buscar os dados do perfil do usuário
router.get('/perfil', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Obtém o ID do usuário a partir do token JWT

    // Query para buscar os dados do usuário
    const query = `
      SELECT username, email
      FROM users
      WHERE id = $1;
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Retorna os dados do usuário
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar dados do perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do perfil' });
  }
});

module.exports = router;