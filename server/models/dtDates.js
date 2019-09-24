const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dates = new Schema({
  letter: { type: String },
  frequency: { type: Number}
});

module.exports = mongoose.model('Dates', Dates);