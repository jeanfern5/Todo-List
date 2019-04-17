//GraphQL Todos Resolver
const TodoDB = require('../models/todos');

dateToString = date => new Date(date).toISOString();

module.exports = 
{
    getTodos: async () => {
        try {
            const retrievedTodos = await TodoDB
                .find()
                .then(results => {
                    console.log('\n-----> GetTodos:\n', results);
                    return results;
                })  
            
            return retrievedTodos      
        }
        catch (err) {
            console.log('\n-----> GraphQL getTodos Error:\n', err);
            throw err;
        } 
    },
    getSingleTodo: async (args) => {
        try {
            const todo = args.todoId;

            if (todo){
                const retrievedSingleTodo = await TodoDB
                    .findById(todo)
                    .then(result => {
                        console.log('\n-----> getSingleTodo:\n', result);
                        if (result === null){
                            console.log(`\n Todo with id:${ todo } does not exist or was deleted.\n`)
                        }
                        return result;
                    })  
                
                return retrievedSingleTodo    
            }   
        }
        catch (err) {
            console.log('\n-----> GraphQL getSingleTodo Error:\n', err);
            throw err;
        } 
    },
    createTodo: async (args) => {
        const newTodo = new TodoDB({
            title: args.todoInput.title,
            description: args.todoInput.description,
            date: new Date(args.todoInput.date),
        });

        try {
            const createdTodo = await newTodo
                .save()
                .then(result => {
                    console.log('\n-----> createTodo:\n', result);
                    return result;
                })

            return createdTodo; 
        }
        catch (err) {
            console.log('\n----> GraphQL createTodo Error:\n', err);
            throw err;
        }
    },
    updateTodo: async (args) => {
        try {
            const todo = args.todoId;

            if (todo){
                const updatedTodo = await TodoDB
                    .findById(todo)
                    .then(result => {
                        console.log('\n-----> updateTodo:\n', result);
                        console.log('\n-----> todoInput:\n', args.todoInput);
                        if (result === null){
                            console.log(`\n Todo with id:${ todo } does not exist or was deleted.\n`)
                        }
                        return result;
                    })

                await TodoDB
                    .updateOne(
                        { _id: todo }, 
                        { date:  new Date(args.todoInput.date), 
                        description: args.todoInput.description }
                    )
            
                return updatedTodo;  
            }     
        }
        catch (err) {
            console.log('\n----> GraphQL updateTodo Error:\n', err);
            throw err; 
        }
    },
    deleteTodo: async (args) => {
        try {
            const todo = args.todoId;

            if (todo){
                const deletedTodo = await TodoDB
                    .findById(todo)
                    .then(result => {
                        console.log('\n-----> deleteTodo:\n', result);
                        if (result === null){
                            console.log(`\n Todo with id:${ todo } does not exist or was deleted.\n`)
                        }
                        return result;
                    })                    

                await TodoDB
                    .deleteOne({ _id: todo });
            
                return deletedTodo;    
            }
        }
        catch (err) {
            console.log('\n----> GraphQL deleteTodo Error:\n', err);
            throw err;
        }
    }

}