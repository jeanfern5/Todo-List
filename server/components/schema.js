//User and Todos GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Todo {
        _id: ID!
        title: String!
        description: String
        date: String!
        user: User!
    }
    input TodoInput {
        title: String!
        description: String
        date: String!
    }
    type User {
        _id: ID!
        email: String!
        awsId: String!
        createdTodos: [Todo!]
    }
    input UserInput {
        email: String!
        password: String
    }
    type LoginData {
        userId: ID!
        token: String!
    }
    type RootQuery {
        getTodos: [Todo!]!
        getSingleTodo(todoId:ID!): Todo!
        loginUser(email: String!, password: String!): LoginData!
    }
    type RootMutation {
        createTodo(todoInput: TodoInput!): Todo
        updateTodo(todoId: ID!, todoInput: TodoInput!): Todo!
        deleteTodo(todoId: ID!): Todo!
        signupUser(userInput: UserInput!): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)