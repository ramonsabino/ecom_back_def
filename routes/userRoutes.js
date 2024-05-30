const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Rota para registrar um novo usuário
router.post('/register', UserController.registerUser);

// Rota para buscar todos os usuários
router.get('/', UserController.getAllUsers);

// Rota para buscar um usuário pelo ID
router.get('/:id', UserController.getUserById);

// Rota para atualizar um usuário pelo ID
router.put('/:id', UserController.updateUser);

// Rota para excluir um usuário pelo ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
