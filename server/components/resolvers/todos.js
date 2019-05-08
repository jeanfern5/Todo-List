//GraphQL Todos Resolver
//retrieves all todos, retrieves single todo, creates a todo, updates a todo, and deletes a todo
const TodoDB = require('../models/todos');
const UserDB = require('../models/users');

const { reformatResults, user, checkAuth } = require('./helpers/helpers');

module.exports = 
{
    getTodos: async (args, req) => {
        checkAuth(req);

        try {
            const retrievedTodos = await TodoDB.find({ user: req.userId });

            return retrievedTodos.map(todo => {
                console.log('Todos Resolver', todo)
                return reformatResults(todo);
            });    
        }
        catch (err) {
            console.log('\n-----> GraphQL getTodos Error:\n', err);
            throw err;
        }; 
    },
    getSingleTodo: async (args, req) => {	
        checkAuth(req);	

         try {	
            const todoExists = await TodoDB.findById(args.todoId)	

             if (!todoExists) {	
                throw new Error('Todo not found.')	
            }	

             return reformatResults(todoExists);   	
        }	
        catch (err) {	
            console.log('\n-----> GraphQL getSingleTodo Error:\n', err);	
            throw err;	
        };	
    },
    createTodo: async (args, req) => {
        checkAuth(req);

        try {
            const user = await UserDB.findById(req.userId);
            // const todo = await TodoDB.findOne({ title: args.todoInput.title });

            if (!user) {
                throw new Error('User not found.')
            }

            const newTodo = await new TodoDB({
                title: args.todoInput.title,
                description: args.todoInput.description,
                date: new Date(args.todoInput.date),
                user: req.userId
            });

            user.createdTodos.push(newTodo);
            await user.save();

            return await newTodo
                .save()
                .then(result => {
                    return reformatResults(result);
                });
        }
        catch (err) {
            console.log('\n----> GraphQL createTodo Error:\n', err);
            throw err; 
        };
    },
    updateTodo: async (args, req) => {
        checkAuth(req);

        try {
            const todo = await TodoDB.findById(args.todoId);

            if (!todo) {
                throw new Error('Todo not found.');
            }   
            
            await TodoDB
                .updateOne(
                    { _id: todo }, 
                    { date:  new Date(args.todoInput.date), 
                    description: args.todoInput.description }
                );
            
            return { _id: todo._id, title: todo.title, date: args.todoInput.date, description: args.todoInput.description, user: user.bind(this, todo.user)};  
        }
        catch (err) {
            console.log('\n----> GraphQL updateTodo Error:\n', err);
            throw err; 
        };
    },
    deleteTodo: async (args, req) => {
        checkAuth(req);

        try {
            const user = await UserDB.findById(req.userId);
            const todo = await TodoDB.findById(args.todoId);

            if (!todo) {
                throw new Error('Todo not found.')
            }   

            const createdTodosArr = user.createdTodos;
            const todoIndex = (createdTodosArr).indexOf(todo._id);
            (createdTodosArr).splice(todoIndex, 1);
            await user.save();

            await TodoDB.deleteOne({ _id: todo });

            return reformatResults(todo);    
        }
        catch (err) {
            console.log('\n----> GraphQL deleteTodo Error:\n', err);
            throw err;
        };
    },

};