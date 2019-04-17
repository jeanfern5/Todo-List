//GraphQL Todos Resolver
const TodoDB = require('../models/todos');
const UserDB = require('../models/users');

const { dateToString, user } = require('./helpers')


module.exports = 
{
    getTodos: async () => {
        try {
            const retrievedTodos = await TodoDB.find();

            return retrievedTodos.map(todo => {
                return {
                    ...todo._doc,
                    _id: todo.id,
                    date: dateToString(todo._doc.date),
                    user: user.bind(this, todo.user)
                }
            })    
        }
        catch (err) {
            console.log('\n-----> GraphQL getTodos Error:\n', err);
            throw err;
        } 
    },
    getSingleTodo: async (args) => {
        try {
            const todoExists = await TodoDB.findById(args.todoId)

            if (!todoExists) {
                throw new Error('Todo not found.')
            }

            return {
                ...todoExists._doc,
                _id: todoExists.id,
                date: dateToString(todoExists._doc.date),
                user: user.bind(this, todoExists.user)
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
            user: '5cb75afbc5b650015417c073' 
        });
        let createdTodo;

        try {
            const todo = await newTodo.save();
            createdTodo = { ...todo._doc, _id: todo.id, date: dateToString(todo._doc.date), user: user.bind(this, todo.user) };
            const userExists = await UserDB.findById('5cb75afbc5b650015417c073');

            if (!userExists) {
                throw new Error('User not found.')
            }

            userExists.createdTodos.push(newTodo);
            await userExists.save()

            return createdTodo;
        }
        catch (err) {
            console.log('\n----> GraphQL createTodo Error:\n', err);
            throw err; 
        }
    },
    updateTodo: async (args) => {
        try {
            const todo = await TodoDB.findById(args.todoId);
            console.log('---->todo', todo);

            if (!todo) {
                throw new Error('Todo not found.')
            }   
            
            await TodoDB
                .updateOne(
                    { _id: todo }, 
                    { date:  new Date(args.todoInput.date), 
                    description: args.todoInput.description }
                )
            
            
            return { _id: todo._id, title: todo.title, date: dateToString(args.todoInput.date), description: args.todoInput.description};  
        }
        catch (err) {
            console.log('\n----> GraphQL updateTodo Error:\n', err);
            throw err; 
        }
    },
    deleteTodo: async (args) => {
        try {
            const todo = await TodoDB.findById(args.todoId);

            if (!todo) {
                throw new Error('Todo not found.')
            }             

            await TodoDB.deleteOne({ _id: todo });

            return todo;    
        }
        catch (err) {
            console.log('\n----> GraphQL deleteTodo Error:\n', err);
            throw err;
        }
    }

}