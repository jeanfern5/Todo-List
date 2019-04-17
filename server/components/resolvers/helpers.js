//Helper functions to assist in keeping resolver code clean
const TodoDB = require('../models/todos');
const UserDB = require('../models/users');

//helps reformat date for graphiql
dateToString = date => new Date(date).toISOString();

//helps bind todos to user
const todos = async todoIds => {
    try {
        const todos = await TodoDB.find({ _id: { $in: todoIds } });
        
        return todos.map(todo => {
            return { ...todo._doc, _id: todo.id, user: user.bind(this, todo.user) }
        })
    }
    catch {
        throw err;
    }
}

//helps bind user to their todos
const user = async userId => {
    try {
        const user = await UserDB.findById(userId)
            return {
                ...user._doc,
                _id: user.id,
                createdTodos: todos.bind(this, user._doc.createdTodos)
            }
    }
    catch {
        throw err;
    }  
}



module.exports ={
    dateToString,
    todos, 
    user
}