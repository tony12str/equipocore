const express = require('express');
const router = express.Router();
const Caja = require('../models/Caja');

// Ruta GET para mostrar el formulario
router.get('/', (req, res) => {
  res.render('efectivo');
});

// Ruta POST para guardar el monto en MongoDB
router.post('/', async (req, res) => {
  const { monto } = req.body;

  try {
    const nuevoRegistro = new Caja({ monto });
    await nuevoRegistro.save();
    res.send(`✅ Efectivo inicial de $${monto} registrado con éxito.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('❌ Error al guardar el efectivo.');
  }
});

module.exports = router;
