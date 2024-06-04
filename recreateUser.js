const mongoose = require('mongoose');
const User = require('./models/User');

async function recreateUserTable() {
    try {
        // Conectar ao banco de dados
        await mongoose.connect('mongodb+srv://rmnsabino98:2704Nasc9@cluster0.wyg2t0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Apagar a tabela de usuários existente
        await User.deleteMany({});

        console.log('Tabela de usuários apagada com sucesso.');

        // Desconectar do banco de dados
        await mongoose.disconnect();

        console.log('Desconectado do banco de dados.');
    } catch (error) {
        console.error('Erro ao recriar a tabela de usuários:', error);
    }
}

// Executar a função para recriar a tabela de usuários
recreateUserTable();
