import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import filter from 'ramda/src/filter';

// const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
const books = [
  { name: 'Atlas Shrugged', genre: 'Fiction', id: '1', authorId: '1' },
  { name: 'Bible', genre: 'Religious', id: '2', authorId: '2' },
  { name: 'The Black Swan', genre: 'Finance', id: '3', authorId: '3' },
  { name: 'The Fountain Head', genre: 'Fiction', id: '4', authorId: '1' },
  { name: 'Antifragile', genre: 'Finance', id: '5', authorId: '3' },
];

const authors = [
  { name: 'Ayn Rand', age: 114, id: '1' },
  { name: 'Various', age: 2019, id: '2' },
  { name: 'Nassim Taleb', age: 59, id: '3' },
];

/* Types */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return find(propEq('id', parent.authorId))(authors);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return filter(propEq('authorId', parent.id))(books);
      },
    },
  }),
});

/* Queries */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return find(propEq('id', args.id))(books);
        // code to get data from db
        // args.id
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return find(propEq('id', args.id))(authors);
        // code to get data from db
        // args.id
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
