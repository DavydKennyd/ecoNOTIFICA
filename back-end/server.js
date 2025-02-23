const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pontoRoutes = require('./routes/pontoRoutes');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:8080', // URL do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Para processar JSON
app.use(express.urlencoded({ extended: true })); // Para processar FormData

// Rotas
app.use('/api/auth', authRoutes); // Rotas relacionadas à autenticação
app.use('/api/pontos', pontoRoutes); // Rotas relacionadas aos pontos de coleta

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});