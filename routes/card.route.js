const express = require('express');
const cardController = require('../controllers/card.controller');



const router = express.Router();

router.get('/get', cardController.getAllCards )
router.post('/create', cardController.createCard)
router.post('/delete/:id', cardController.deleteCard)







module.exports = router;