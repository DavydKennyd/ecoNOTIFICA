const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',               // Seu nome de usuário do banco
  host: 'maliciously-leisurely-hound.data-1.use1.tembo.io',  // Endereço do servidor PostgreSQL
  database: 'postgres',           // Nome do banco de dados
  password: 'aWHgMM4O0SaKmZnp',  // Sua senha
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
