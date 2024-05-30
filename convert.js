const fs = require('fs');

// Importar o arquivo products.ts
const productsModule = require('./json/product.ts');

// Extrair a matriz de produtos do módulo
const products = productsModule.default;

// Converter a matriz de produtos em JSON
const productsJSON = JSON.stringify(products, null, 2);

// Escrever o JSON em um novo arquivo
fs.writeFileSync('products.json', productsJSON);

console.log('Arquivo JSON criado com sucesso.');
