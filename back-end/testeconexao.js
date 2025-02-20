const pool = require('./config/db');

(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexão bem-sucedida ao banco de dados!');
    client.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  }
})();
