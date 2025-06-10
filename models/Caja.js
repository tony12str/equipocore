const mongoose = require('mongoose');

const cajaSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Caja', cajaSchema);
