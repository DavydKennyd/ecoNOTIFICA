const pool = require('../config/db');

const User = {
  // Cadastro de usuário
  create: async (username, email, password) => {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  },

  // Busca de usuário por email
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  // Atualização de dados do usuário por email
  updateByEmail: async (email, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setQuery = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const result = await pool.query(
      `UPDATE users SET ${setQuery} WHERE email = $1 RETURNING *`,
      [email, ...values]
    );
    return result.rows[0];
  },

  // Exclusão de usuário por email
  deleteByEmail: async (email) => {
    const result = await pool.query(
      'DELETE FROM users WHERE email = $1 RETURNING *',
      [email]
    );
    return result.rows[0];
  },

  // Busca de todos os usuários
  findAll: async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },
};

module.exports = User;
