const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();

/**
 * express/example-01: using existing express application.
 * from: https://www.apollographql.com/docs/apollo-server/essentials/server#integrations
 * 
 * compile and run: http://localhost:4000 and use the following query:
 * {
 *   books {
 *     title
 *     author
 *   }  
 * }
 */

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
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

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {    
    books: () => {
      console.log("[schema::resolvers] qeury called");
      return books;
    }
  },
};

app.get('/', (req, res) => {
	res.send('Hi it is the root page, ' + __dirname);
})

const apollow = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
});

apollow.applyMiddleware({ app }); // app is from an existing express app

const server = app.listen(4000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log("[express-server] app listening at http://localhost:%s", host, port);
  console.log(`use the following query:
    {
      books {
        title
        author
      }  
    }`
  );
})
