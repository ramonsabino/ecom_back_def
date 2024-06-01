const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Product = require('./models/Product');
const productsData = require('./json/product.json');

// Conectando ao MongoDB
mongoose.connect('mongodb+srv://rmnsabino98:2704Nasc9@cluster0.wyg2t0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB', error));

async function insertProducts() {
  try {
    // Limpar o banco de dados
    await Product.deleteMany({});

    // Inserir os produtos do JSON
    for (const productData of productsData) {
      const imagePath = paath.join(__dirname, productData.category, productData.image);
      const imageName = path.basename(imagePath);

      // Verificar se o arquivo de imagem existe
      if (!fs.existsSync(imagePath)) {
        console.error(`Imagem não encontrada: ${imagePath}`);
        continue; // Pular este produto se a imagem não for encontrada
      }

      // Copiar a imagem para a pasta 'uploads'
      const newImagePath = path.join(__dirname, 'uploads', imageName);
      fs.copyFileSync(imagePath, newImagePath);

      const newProduct = new Product({
        name: productData.name,
        price: productData.price,
        category: productData.category,
        subCategory: productData.subCategory,
        description: productData.description,
        image: `/uploads/${imageName}`,
        brand: productData.brand
      });

      await newProduct.save();
    }

    console.log('Todos os produtos foram inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir os produtos', error);
  } finally {
    mongoose.connection.close();
  }
}

insertProducts();
