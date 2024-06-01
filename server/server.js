const express = require('express');
const cors = require('cors');
const { ApolloServer } =  require('@apollo/server');
const { expressMiddleware } =  require('@apollo/server/express4');

const PORT = 3001;

const AuthorsArr = [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" }
  ];

const BlogsArr = [
  { id: 1, title: "Blog 1", body: "Test", status: true , authorId:2},
  { id: 2, title: "Blog 2", body: "Test 2", status: false , authorId:2}
];

const startServer =  async () =>{
    const app = express();

    const server = new ApolloServer({
        typeDefs: `
          type Author {
            id: ID!
            name: String!
          }
    
          type Blog {
            id: ID!
            title: String!
            body: String!
            status: Boolean
            authorId: ID!
            author: Author
          }
    
          type Query {
            getBlogs: [Blog]
            getAuthors: [Author]
            getAuthor(id: ID!): Author
          }
        `,
        resolvers: {
          Blog: {
            author: (blog) => {
              return AuthorsArr.find(author => author.id === blog.authorId);
            }
          },
          Query: {
            getBlogs: () => BlogsArr,
            getAuthors: () => AuthorsArr,
            getAuthor: (parent, { id }) => {
              const newID = parseInt(id);
              return AuthorsArr.find(author => author.id === newID);
            }
          }
        }
      });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    await server.start();
    app.use('/graphql', expressMiddleware(server));
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}/`);
    });} 

startServer();
  