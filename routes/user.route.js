const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/get', userController.get);
router.post('/create', userController.create);

module.exports = router;
