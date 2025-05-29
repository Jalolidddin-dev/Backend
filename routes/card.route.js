const express = require('express');
const cardController = require('../controllers/card.controller');



const router = express.Router();

router.get('/get', cardController.getAllCards )
router.post('/create', cardController.createCard)
router.post('/delete/:id', cardController.deleteCard)
router.put('/edit/:id', cardController.edit)







module.exports = router;