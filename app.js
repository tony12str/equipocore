const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configura variables de entorno
dotenv.config();

const app = express();

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));

// Carpeta de archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
const cajaRoutes = require('./routes/caja');
app.use('/', cajaRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  // Iniciar servidor
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor en http://localhost:${port}`);
  });
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});
