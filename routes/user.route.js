const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/get-users', userController.get);
router.post('/create', userController.create);
router.delete('/delete/:id', userController.delete);
router.put('/update/:id', userController.update);

module.exports = router;
