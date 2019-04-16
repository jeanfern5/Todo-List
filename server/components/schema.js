//User and Todos GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Todo {
        _id: ID!
        title: String!
        description: String
        date: String!
    }
    input TodoInput {
        title: String!
        description: String
        date: String!
    }
    type RootQuery {
        getTodos: [Todo!]!
        getSingleTodo(todoId:ID!): Todo!
    }
    type RootMutation {
        createTodo(todoInput: TodoInput!): Todo
        updateTodo(todoId: ID!, todoInput: TodoInput!): Todo!
        deleteTodo(todoId: ID!): Todo!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)