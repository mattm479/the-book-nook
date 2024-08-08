const mongoose = require('mongoose');

const { Schema } = mongoose;
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  categories: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  bookISBN: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  purchaseQuantity: {
    type: Number,
  },
  inventory: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 100),
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
