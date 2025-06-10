const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
const productRoutes = require('./src/routes/productRoutes');
const saleRoutes = require('./src/routes/saleRoutes');
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// Rutas Frontend
const Product = require('./src/models/Product');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('products/list', { products });
});

app.get('/products/new', (req, res) => {
  res.render('products/new');
});

app.post('/products', async (req, res) => {
  const { name, price, barcode } = req.body;
  await Product.create({ name, price, barcode });
  res.redirect('/products');
});


// Editar producto - mostrar formulario
app.get('/products/edit/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/edit', { product });
});

// Editar producto - guardar cambios
app.post('/products/edit/:id', async (req, res) => {
  const { name, price } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price });
  res.redirect('/products');
});

// Eliminar producto
app.post('/products/delete/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = app;
