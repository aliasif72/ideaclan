const typeDefs = `
   type Movie {
     id: ID!
     name: String!
     producer: String!
     rating: Float!
   }
   type User {
    name:String
    email:String
    password:String
    }

   type Query {
     getMovies: [Movie]
     getMovie(id: ID!): Movie!
     getUser : [User]
     }

   type Mutation {
     addUser(name:String! ,email:String!, password: String!) : User
     addMovie(name: String!, producer: String!, rating: Float!): Movie!
     updateMovie(name: String!, producer: String!, rating: Float): Movie!
     deleteMovie(id: ID!): Movie!
   }
   `;

   module.exports =  typeDefs ;
