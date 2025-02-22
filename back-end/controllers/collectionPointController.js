const CollectionPoint = require('../models/CollectionPoint');

exports.addCollectionPoint = async (req, res) => {
  try {
    const newPoint = await CollectionPoint.create({
      ...req.body,
      user_id: req.user.userId // Adiciona o ID do usuário autenticado
    });
    res.status(201).json({ message: 'Ponto de coleta cadastrado com sucesso!', data: newPoint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o ponto de coleta' });
  }
};

exports.getCollectionPoints = async (req, res) => {
  try {
    const points = await CollectionPoint.findAll();
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pontos de coleta' });
  }
};