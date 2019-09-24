const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DtMaps = new Schema({
  title: { type: String },
  lat: { type: Number},
  lng: {type: Number}
});

module.exports = mongoose.model('DtMaps', DtMaps);