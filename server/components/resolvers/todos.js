//GraphQL Todos Resolver
const Todo = require('../models/todos');

dateToString = date => new Date(date).toISOString();

module.exports = 
{
    getTodos: async (args, req) => {
        try{
            const todos = await Todo
                .find()
                .then(todos => {
                    return todos;
                })  
            
            return todos      
        }
        catch (err) {
            console.log('-----> getTodos Error:\n', err);
            throw err;
        } 
    },
    createTodo: async (args, req) => {
        const newTodo = new Todo({
            title: args.todoInput.title,
            description: args.todoInput.description,
            date: new Date(args.todoInput.date),
        });

        try{
            const createdTodo = await newTodo
                .save()
                .then(result => {
                    return result;
                })

            return createdTodo;
            
        }
        catch{
            console.log('----> createTodo Error:\n', err);
            throw err;
        }
    },
    
}