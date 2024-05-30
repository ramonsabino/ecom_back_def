const mongoose = require('mongoose');
const Product = require('./models/Product');

// Conectar ao banco de dados
mongoose.connect('mongodb+srv://rmnsabino98:2704Nasc9@cluster0.wyg2t0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Importar os dados do arquivo JSON
const productsData = require('./json/product.json');

// Função para inserir os produtos no banco de dados
async function insertProducts() {
    try {
        // Inserir cada produto na coleção de produtos
        await Product.insertMany(productsData);
        console.log('Inserção de produtos concluída.');
    } catch (error) {
        console.error('Erro ao inserir produtos:', error);
    } finally {
        // Fechar a conexão com o banco de dados
        mongoose.connection.close();
    }
}

// Chamar a função para inserir os produtos
insertProducts();
