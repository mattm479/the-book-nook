const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    orders: [Order]
  }

  type Book{
    bookId: ID!
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
    me: User
  }
`;

module.exports = typeDefs;
