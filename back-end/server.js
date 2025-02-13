const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const collectionPointRoutes = require('./routes/collectionPointRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/collection-points', collectionPointRoutes);

const pontoRoutes = require('./routes/pontoRoutes');
app.use('/api/pontos', pontoRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
