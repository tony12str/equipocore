require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Debe estar antes de iniciar el servidor

app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));
