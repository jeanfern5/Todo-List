//User and Todos GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Todo {
        _id: ID!
        title: String!
        date: String!
        description: String!
    }
    input TodoInput {
        title: String!
        date: String!
        description: String!
    }
    type RootQuery {
        getTodos: [Todo!]!
    }
    type RootMutation {
        createTodo(todoInput: TodoInput): Todo
        deleteTodo(todoId: ID!): Todo
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)