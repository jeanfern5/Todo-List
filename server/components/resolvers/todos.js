//GraphQL Todos Resolver
const Todo = require('../models/todos');

dateToString = date => new Date(date).toISOString();

module.exports = 
{
    getTodos: async (args, req) => {
        try {
            const todos = await Todo
                .find()
                .then(todos => {
                    return todos;
                })  
            
            return todos      
        }
        catch (err) {
            console.log('\n-----> getTodos Error:\n', err);
            throw err;
        } 
    },
    createTodo: async (args, req) => {
        const createTodo = new Todo({
            title: args.todoInput.title,
            description: args.todoInput.description,
            date: new Date(args.todoInput.date),
        });

        try {
            const createdTodo = await createTodo
                .save()
                .then(result => {
                    return result;
                })

            return createdTodo;
            
        }
        catch (err) {
            console.log('\n----> createTodo Error:\n', err);
            throw err;
        }
    },
    updateTodo: async (args, req) => {
        try {
            const updatedTodo = await Todo
            .findById(args.todoId)
            .then(result => {
                return result;
            })

            await Todo 
                .updateOne(
                    {_id: args.todoId}, 
                    {date:  new Date(args.todoInput.date), 
                    description: args.todoInput.description}
                )
            
            return updatedTodo;    
        }
        catch (err) {
            console.log('\n----> updateTodo Error:\n', err);
            throw err; 
        }
    },
    deleteTodo: async (args, req) => {
        try {
        const deletedTodo = await Todo
            .findById(args.todoId)
            .then(result => {
                return result;
            })

        await Todo
            .deleteOne({ _id: args.todoId });
       
        return deletedTodo;
        }
        catch (err) {
            console.log('\n----> deleteTodo Error:\n', err);
            throw err;
        }
    }

}