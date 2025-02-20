const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Verifica se a variável de ambiente JWT_SECRET está definida
const jwtSecret = process.env.JWT_SECRET || 'minha-chave-secreta';  // Substitua por uma chave forte no ambiente de produção

// Cadastro de usuário
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário no banco de dados
    const newUser = await User.create(username, email, hashedPassword);

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
  }
};

// Login do usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      user: { username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
  }
};

module.exports = { register, login };
