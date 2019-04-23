//Helper functions to assist in keeping resolvers DRY
const TodoDB = require('../../models/todos');
const UserDB = require('../../models/users');


//helps reformat date for graphiql
const dateToString = date => new Date(date).toISOString();

//helps bind todos to user
const todos = async todoIds => {
    try {
        const todos = await TodoDB.find({ _id: { $in: todoIds } });
        
        return todos.map(todo => {
            return { ...todo._doc, _id: todo.id, user: user.bind(this, todo.user) }
        });
    }
    catch {
        throw err;
    };
};

//helps bind user to their todos
const user = async userId => {
    try {
        const user = await UserDB.findById(userId);
        
        return {
            ...user._doc,
            _id: user.id,
            createdTodos: todos.bind(this, user._doc.createdTodos)
        };
    }
    catch {
        throw err;
    }; 
};

//helps get better formatted results in graphiql and it binds results with the user
const reformatResults = todo => {
    return {
        ...todo._doc,
        _id: todo.id,
        date: dateToString(todo._doc.date),
        user: user.bind(this, todo.user)
    };
};

//helps check that user is authenticated
function checkAuth(req) {
    if ((!req.isAuth) || (req.isAuth === undefined)) {
        throw new Error('Not Authenticated!');
    };    
};



module.exports = {
    dateToString,
    todos, 
    user, 
    reformatResults,
    checkAuth,
};