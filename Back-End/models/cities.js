const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  CapitalName: { type: String, required: true },
  CountryName: { type: String, required: true },
  Year: { type: Number, required: true },
  Duration: { type: Number, required: true },
  Unit: { type: String, required: true },
  Completed: { type: Boolean, required: true }
});

module.exports = mongoose.model('city', todoSchema);