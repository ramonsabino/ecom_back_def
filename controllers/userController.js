const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Controlador para registrar um novo usuário
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Verificar se o usuário já existe no banco de dados
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Este email já possui cadastro.' });
        }

        // Criar um novo usuário
        const newUser = new User({
            name,
            email,
            password,
            isAdmin // A senha será automaticamente hashada pelo hook pre-save
        });

        // Salvar o novo usuário no banco de dados
        await newUser.save();

        // Responder com sucesso
        res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
};

// Controlador para buscar todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
};

// Controlador para buscar um usuário pelo ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
};

// Controlador para atualizar um usuário
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        
        // Verificar se o usuário existe no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        
        // Atualizar os dados do usuário
        user.name = name;
        user.email = email;
        await user.save();

        res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
};

// Controlador para excluir um usuário
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Verificar se o usuário existe no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Excluir o usuário do banco de dados
        await user.remove();

        res.json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
};
