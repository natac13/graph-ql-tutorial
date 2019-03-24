import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
// import find from 'ramda/src/find';
// import propEq from 'ramda/src/propEq';
// import filter from 'ramda/src/filter';

import Book from '../models/book';
import Author from '../models/author';
// const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
// const books = [
//   { name: 'Atlas Shrugged', genre: 'Fiction', id: '1', authorId: '1' },
//   { name: 'Bible', genre: 'Religious', id: '2', authorId: '2' },
//   { name: 'The Black Swan', genre: 'Finance', id: '3', authorId: '3' },
//   { name: 'The Fountain Head', genre: 'Fiction', id: '4', authorId: '1' },
//   { name: 'Antifragile', genre: 'Finance', id: '5', authorId: '3' },
// ];
//
// const authors = [
//   { name: 'Ayn Rand', age: 114, id: '1' },
//   { name: 'Various', age: 2019, id: '2' },
//   { name: 'Nassim Taleb', age: 59, id: '3' },
// ];

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
        return Author.findById(parent.authorId);
        // return find(propEq('id', parent.authorId))(authors);
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
        return Book.find({ authorId: parent.id });
        // return filter(propEq('authorId', parent.id))(books);
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
        return Book.findById(args.id);
        // return find(propEq('id', args.id))(books);
        // code to get data from db
        // args.id
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
        // return books;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
        // return find(propEq('id', args.id))(authors);
        // code to get data from db
        // args.id
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
