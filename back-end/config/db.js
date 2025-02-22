const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',               // Seu nome de usuário do banco
  host: 'localhost',  // Endereço do servidor PostgreSQL
  database: 'ecoNOTIFICA',           // Nome do banco de dados
  password: 'ifrn.cn',  // Sua senha
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
