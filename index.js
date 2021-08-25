const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const port = 3000
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql')


// const resolvers = require('./resolvers')

const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

const books = [
    { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 2 },
    { id: 7, name: 'The Way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]




const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'this is bookiii',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'this is Author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },

    })
})

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: 'Root Queryt desc',
    fields: () => ({
        book: {
            type: BookType,
            description: "Single BOOk ",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },

        books: {
            type: new GraphQLList(BookType),
            description: "list of Books",
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "list of author",
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            description: "Single Author",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        }
    }),

})

const RootMutaionType = new GraphQLObjectType({
    name: "muation",
    description: "mutation description",
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'add a new Book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parant, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.id }
                books.push(book)
                return book
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'add a new Author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parant, args) => {
                const author = { id: authors.length + 1, name: args.name }
                authors.push(book)
                return author
            }
        }
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutaionType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(process.env.PORT || port, () => {
    console.log('server is running')
})