//Server's main file
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MongoClient = require('mongoose');
require('dotenv').config()

const Schema = require('./components/schema');
const rootResolver = require('./components/resolvers/rootResolver');
const isAuth = require('./components/resolvers/middleware');

// Create an express server and GraphQL endpoint
const app = express();
app.use(express.json());

app.use(isAuth);

// app.use((req, res, next) => {
//     console.log('--->HEREreq', res)
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//       return res.sendStatus(200);
//     }
//     next();
// });

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
