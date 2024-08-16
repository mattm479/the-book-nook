const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
    orders: [Order]
  }

  type Book{
    bookId: ID!
    bookISBN: String
    description: String!
    image: String
    link: String
    title: String!
    authors: [String]
    categories: [String]
    price: Float!
    purchaseQuantity: Int
    inventory: Int!
  }

  type Order {
    _id: ID
    purchaseDate: String
    books: [Book]
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
    orderHistory(userId: ID!): [Order]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Auth
    signIn(username: String!, password: String!): Auth
    changeUsername(userId: ID!, username: String!): Auth
    changeEmail(userId: ID!, email: String!): Auth
    changePassword(userId: ID!, password: String!): Auth
    signOut(userId: ID!): Boolean
    addToCart(userId: ID!, bookISBN: String!): Book
    saveBook(userId: ID!, bookISBN: String!): Boolean
    removeItemFromCart(userId: ID!, bookISBN: String!): Boolean
    viewOrderHistory(userId: ID!): [Order]
  }
`;

module.exports = typeDefs;
