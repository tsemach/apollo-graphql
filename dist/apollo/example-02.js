"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const lodash_1 = require("lodash");
/**
 * example-02: fetch data with resolvers.
 * from: https://www.apollographql.com/docs/apollo-server/essentials/data
 *
 * define a schema and resolvers for query the graph. still use ApolloServer as the server.
 * compile and run by: http://localhost:4000/graphql browse and run the following query
 *
 * GraphiQL query
 * {
 *   author(id: 1) {
 *     books {
 *       title
 *     }
 *   }
 * }
 */
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];
const authors = [
    {
        id: "1",
        name: 'J.K. Rowling',
    },
    {
        id: "2",
        name: 'Michael Crichton',
    },
];
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = apollo_server_1.gql `
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: Author    
  }

  type Author { 
    id: String
    books: [Book]
  }

  type Query {
    author(id: ID!): Author
  }
`;
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        author(parent, { id }, context, info) {
            console.log("[Query resolvers]: author is:", JSON.stringify(lodash_1.find(authors, { id: id })));
            console.log("[Query resolvers]: author id =", id);
            return lodash_1.find(authors, { id: id });
        },
    },
    Author: {
        books(author) {
            console.log('[Author] author.name = ', author.name);
            console.log('[Author] going to return: ', lodash_1.filter(books, { author: author.name }));
            return lodash_1.filter(books, { author: author.name });
        },
    },
};
// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`[apollo-server] 🚀  Server ready at ${url}`);
    console.log(`browse to "${url}/qraphql and use the following:
  {
    author(id: 1) {
      books {
        title
      }
    }
  }`);
});
//# sourceMappingURL=example-02.js.map