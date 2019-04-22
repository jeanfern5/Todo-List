//GraphQL Todos Resolver
//retrieves all todos, retrieves single todo, creates a todo, updates a todo, and deletes a todo
const TodoDB = require('../models/todos');
const UserDB = require('../models/users');

const { reformatResults, user } = require('./helpers')


module.exports = 
{
    getTodos: async (args) => {
        try {
            const retrievedTodos = await TodoDB.find();

            return retrievedTodos.map(todo => {
                return reformatResults(todo);
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

            return reformatResults(todoExists);   
        }
        catch (err) {
            console.log('\n-----> GraphQL getSingleTodo Error:\n', err);
            throw err;
        } 
    },
    createTodo: async (args, req, res) => {
        if ((!req.isAuth) || (req.isAuth === undefined)){
            console.log('---->4 !createTodo isAuth', req.isAuth, req.userId);
            throw new Error('Not Authenticated!');
        };
        console.log('---->4 createTodo isAuth', req.isAuth, req.userId);

        const newTodo = await new TodoDB({
            title: args.todoInput.title,
            description: args.todoInput.description,
            date: new Date(args.todoInput.date),
            user: req.userId
        });

        try {
            const userExists = await UserDB.findById(req.userId);
            const todoExists = await TodoDB.findOne({ title: args.todoInput.title });

            if (!userExists) {
                throw new Error('User not found.')
            }
            else if (todoExists){
                throw new Error('Todo with that title already exists, try naming it differently.')
            }

            userExists.createdTodos.push(newTodo);
            await userExists.save()

            return await newTodo
                .save()
                .then(result => {
                    return reformatResults(result);
                })
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
            
            
            return { _id: todo._id, title: todo.title, date: dateToString(args.todoInput.date), description: args.todoInput.description, user: user.bind(this, todo.user)};  
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

            return reformatResults(todo);    
        }
        catch (err) {
            console.log('\n----> GraphQL deleteTodo Error:\n', err);
            throw err;
        }
    }

}