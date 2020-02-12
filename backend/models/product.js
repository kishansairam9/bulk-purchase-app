const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vendorId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  vendorName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    required: true,
  },
  quantityLeft: {
    type: Number,
    min: [0, 'Quantity Left cannot be negative'],
    required: true,
  },
  cancelled: Boolean,
  dispatched: Boolean
});

module.exports = mongoose.model('Product', productSchema)
