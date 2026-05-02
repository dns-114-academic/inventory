var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  category: {type: String, enum: ['Électronique', 'Mobilier', 'Consommables']},
  quantity: {type: Number, min: 0},
  minThreshold: {type: Number, default: 5},
  lastUpdated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);