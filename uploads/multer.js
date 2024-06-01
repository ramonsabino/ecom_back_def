const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuração do multer para salvar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Renomeia o arquivo para evitar duplicatas
  }
});

const upload = multer({ storage: storage });

// Rota para fazer upload das imagens
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static('uploads')); // Serve os arquivos da pasta 'uploads'
