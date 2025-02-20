const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pontoRoutes = require('./routes/pontoRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Para processar JSON
app.use(express.urlencoded({ extended: true })); // Para processar FormData

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pontos', pontoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});