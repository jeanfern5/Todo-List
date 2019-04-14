const usersResolver = require('./users');
const todosResolver = require('./todos');

const rootResolver = ({
    ... usersResolver ,
    ... todosResolver ,
});

module.exports = rootResolver;

