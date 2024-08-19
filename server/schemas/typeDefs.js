const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
    orders: [Order]
    cart: [Book]
  }

  type Book {
    bookId: ID!
    bookISBN: String
    description: String!
    image: String
    link: String
    title: String!
    authors: [String]
    categories: [String]
    price: Float!
    quantity: Int
    inventory: Int!
  }
  
  input CartItem {
    userId: ID!
    bookId: ID!
    title: String!
    price: Float!
    quantity: Int!
  }

  type Order {
    _id: ID
    purchaseDate: String
    books: [Book]
  }
  
  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(_id: ID!): User
    bookSearch(query: String!): [Book]
    getBooks: [Book]
    getSingleBook(bookISBN: String!): Book
    viewOrderHistory(userId: ID!): [Order]
    getCheckout(books: [CartItem]!): Checkout
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Auth
    signIn(username: String!, password: String!): Auth
    changeUsername(userId: ID!, username: String!): Auth
    changeEmail(userId: ID!, email: String!): Auth
    changePassword(userId: ID!, password: String!): Auth
    signOut(userId: ID!): Boolean
    addToCart(userId: ID!, bookId: String!, title: String!, price: Int!, quantity: Int!): Book
    saveBook(userId: ID!, bookISBN: String!): Boolean
    removeItemFromCart(userId: ID!, bookISBN: String!): Boolean
    sendEmail(username: String, email: String!, message: String!): Boolean
  }
`;

module.exports = typeDefs;
