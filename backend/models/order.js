const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  vendorId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  vendorName: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    min: [0, 'Order Quantity cannot be negative'],
    required: true
  },
  dispatched: Boolean,
  rating: {
    type: Number,
    min: [0, 'Minimum rating is 0'],
    max: [5, 'Maximum rating is 5']
  },
  review: String
});

module.exports = mongoose.model('Order', orderSchema)