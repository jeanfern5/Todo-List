//Server's main file
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MongoClient = require('mongoose');

const Schema = require('./components/schema');
const rootResolver = require('./components/resolvers/rootResolver');

// Create an express server and GraphQL endpoint
const app = express();
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: rootResolver,
    graphiql: true
}));

// Connects to MongoDB
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-oomgm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

MongoClient.connect(MONGO_URI, { useNewUrlParser: true } )
.then(() => {
    app.listen(8080, () => {
        console.log('\n========== Express GraphQL Server Now Running On localhost:8080/graphql ==========\n');  
    })
})
.catch(err => {
    console.log('\n=====> MONGO CONNECTION ERROR:\n', err);
});
