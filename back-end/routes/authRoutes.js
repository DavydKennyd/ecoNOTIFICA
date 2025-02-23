const express = require('express');
const { register, login } = require('../controllers/authController');
const pool = require('../config/db');
const authenticateToken = require('../../middleware/authenticateToken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/cadastro', register);
router.post('/login', login);

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

// Rota para alterar a senha do usuário
router.post('/alterar-senha', authenticateToken, async (req, res) => {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.userId; // Obtém o ID do usuário a partir do token JWT
  
    try {
      // Busca a senha atual do usuário no banco de dados
      const userQuery = 'SELECT password FROM users WHERE id = $1';
      const userResult = await pool.query(userQuery, [userId]);
  
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      const senhaAtualCorreta = await bcrypt.compare(senhaAtual, userResult.rows[0].password);
  
      if (!senhaAtualCorreta) {
        return res.status(400).json({ error: 'Senha atual incorreta' });
      }
  
      // Criptografa a nova senha
      const saltRounds = 10;
      const novaSenhaCriptografada = await bcrypt.hash(novaSenha, saltRounds);
  
      // Atualiza a senha no banco de dados
      const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
      await pool.query(updateQuery, [novaSenhaCriptografada, userId]);
  
      res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      res.status(500).json({ error: 'Erro ao alterar senha' });
    }
  });

module.exports = router;
