const { User, Book, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
   Query: {
      bookSearch: async (parent, { query }, context) => {
            return await Book.find( {$text: {$search : query} })
      },

      getBooks: async (parent, args, context) => {
         return await Book.find({});
      },

      getSingleBook: async(parent, {bookId}, context) => {
         return await Book.findById(bookId)
      }

    },
  
    Mutation: {
       changeUsername: async (parent, { userId, username }, context) => {
          if (context.user && context.user._id === userId) {
          const user = await User.findByIdAndUpdate(
             userId,
             { username },
             { new: true }
          );
 
          const token = signToken(user);
          return { token, user };
          }
          throw new AuthenticationError('You need to be logged in to change your username');
       },
 
       changeEmail: async (parent, { userId, email }, context) => {
          if (context.user && context.user._id === userId) {
          const user = await User.findByIdAndUpdate(
             userId,
             { email },
             { new: true }
          );
          const token = signToken(user);
          return { token, user };
          }
          throw new AuthenticationError('You need to be logged in to change your email');
       },
 
       addToCart: async (parent, { userId, bookISBN }, context) => {
          if (context.user && context.user._id === userId) {
          const book = await Book.findOne({ isbn: bookISBN });
          if (!book) {
             throw new Error('Book not found');
          }
          const user = await User.findById(userId);
          user.cart.push(book._id);
          await user.save();
          return book;
          }
          throw new AuthenticationError('You need to be logged in to add items to your cart');
       },
 
       saveBook: async (parent, { userId, bookISBN }, context) => {
          if (context.user && context.user._id === userId) {
          const book = await Book.findOne({ isbn: bookISBN });
          if (!book) {
             throw new Error('Book not found');
          }
          const user = await User.findById(userId);
          user.savedBooks.push(book._id);
          await user.save();
          return true;
          }
          throw new AuthenticationError('You need to be logged in to save books');
       },
       
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },

      signIn: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
          throw AuthenticationError;
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);
        return { token, user };
      },

   }
};

module.exports = resolvers;
