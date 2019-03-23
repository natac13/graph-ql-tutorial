import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';

// const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
const books = [
  { name: 'Atlas Shrugged', genre: 'Fiction', id: '1' },
  { name: 'Bible', genre: 'Religious', id: '2' },
  { name: 'My Life and Work', genre: 'Biography', id: '3' },
];

/* Types */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   fields: () => ({}),
// });

/* Queries */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return find(propEq('id', args.id))(books);
        // code to get data from db
        // args.id
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
