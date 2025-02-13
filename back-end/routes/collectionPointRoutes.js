const express = require('express');
const router = express.Router();
const collectionPointController = require('../controllers/collectionPointController');

router.post('/add', collectionPointController.addCollectionPoint);
router.get('/get', collectionPointController.getCollectionPoints);

module.exports = router;
