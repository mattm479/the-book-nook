const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  Books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
