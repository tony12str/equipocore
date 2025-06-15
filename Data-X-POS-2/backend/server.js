require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const app = express();

// 🟢 Este bloque va antes de cualquier ruta
app.use(express.urlencoded({ extended: true })); // ✅ Formulario: req.body
app.use(express.json());                         // ✅ JSON: req.body
app.use(cors());

// 🟢 Luego tus rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const viewsRoutes = require("./routes/viewsRoutes");

app.use("/", viewsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// 🎨 Motor de vistas y estáticos
app.set("view engine", "ejs");
app.set("views", "./backend/views");
app.use(express.static("frontend"));

app.listen(5000, () => console.log('🔥 Servidor corriendo en el puerto 5000'));
