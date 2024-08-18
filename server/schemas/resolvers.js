const { User, Book, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require("bcrypt");
const stripe = require('stripe')('sk_test_51PlFYdHfqfAlbTXAMhC0QCYZrf8Ku4aoAiiiqlQhMImOIZxPW4tCiErrc99zNyX3V5D3wTAweSDG8Hlq2GH28SUL005Qt65XxZ');


const resolvers = {
   Query: {
       me: async (parent, { _id }) => {
           const foundUser = await User.findById(_id);

           if (!foundUser) {
               throw new Error('Cannot find a user with this id!');
           }

           return foundUser;
       },
      bookSearch: async (parent, { query }, context) => {
         try {
           const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
           const data = await response.json();

           const books = data.items.map((item) => ({
             bookId: item.id,
             title: item.volumeInfo.title,
             authors: item.volumeInfo.authors || [],
             description: item.volumeInfo.description || 'No description available',
             bookISBN: item.volumeInfo.industryIdentifiers
            ? item.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10')?.identifier
            : 'No ISBN-10 available',
             image: item.volumeInfo.imageLinks?.thumbnail || '',
             categories: item.volumeInfo.categories || [],
             inventory: Math.floor(Math.random() * 100),
             price: item.saleInfo?.retailPrice?.amount || Math.floor(Math.random() * (80 - 50 + 1)) + 50,
           }));
           return books;

         } catch (error) {
           console.error('Error fetching books:', error);
           throw new Error('Failed to fetch books');
         }
      },

      getSingleBook: async (parent, {isbn}, context) => {
         const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
         const item = await response.json();

         return {
            bookId: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            description: item.volumeInfo.description || 'No description available',
            bookISBN: item.volumeInfo.industryIdentifiers
           ? item.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10')?.identifier
           : 'No ISBN-10 available',
            image: item.volumeInfo.imageLinks?.thumbnail || '',
            categories: item.volumeInfo.categories || [],
            price: item.saleInfo?.retailPrice?.amount || Math.floor(Math.random() * (80 - 50 + 1)) + 50,
         }
      },

      getBooks: async(parent, args, context) => {
         return await Book.find({})
      },

       viewOrderHistory: async (parent, { userId }, context) => {
           if (context.user && context.user._id === userId) {
               const orders = await Order.find({ user: userId });
               return orders;
           }
       },

       getCheckout: async (parent, args, context) => {
           const url = new URL(context.headers.referer).origin;

           const line_items = [];

           for (const book of args.books) {
               const product = await stripe.products.create({
                   name: book.name
               });

               const price = await stripe.prices.create({
                   product: product.id,
                   unit_amount: book.price * 100,
                   currency: 'usd',
               });

               line_items.push({
                   price: price.id,
                   quantity: 1
               });
           }

           const session = await stripe.checkout.sessions.create({
               payment_method_types: ['card'],
               line_items: line_items,
               mode: 'payment',
               success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
               cancel_url: `${url}/`
           });

           return { session: session.id };
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

        changePassword: async (parent, { userId, password }, context) => {
            if (context.user && context.user._id === userId) {
                const saltRounds = 10;
                const user = await User.findByIdAndUpdate(
                    userId,
                    { password: await bcrypt.hash(password, saltRounds) },
                    { new: true }
                );
                const token = signToken(user);
                return { token, user };
            }
            throw new AuthenticationError('You need to be logged in to change your password');
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

      signUp: async (parent, { username, email, password }) => {
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

      removeItemFromCart: async (parent, { userId, bookISBN }, context) => {
         if (context.user && context.user._id === userId) {
            const user = await User.findById(userId);
            const index = user.cart.indexOf(bookISBN);
            if (index !== -1) {
               user.cart.splice(index, 1);
               await user.save();
               return true;
            }
         }
      },
   },
};

module.exports = resolvers;
