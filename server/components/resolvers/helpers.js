//Helper functions to assist in keeping resolvers DRY
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const poolData = {
    UserPoolId: `${process.env.AWS_USER_POOL_ID}`,
    ClientId: `${process.env.AWS_CLIENT_ID}`
};
const pool_region = `${process.env.AWS_POOL_REGION}`; 


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

//helps get better formatted results in graphiql and it binds results with the user
const reformatResults = todo => {
    return {
        ...todo._doc,
        _id: todo.id,
        date: dateToString(todo._doc.date),
        user: user.bind(this, todo.user)
    }
};

const ValidateToken = token => {
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            
            //validate the token
            var decodedJwt = jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return;
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    console.log("Invalid Token.");
                } else {
                    console.log("Valid Token.");
                    // console.log(payload);
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
        }
    });
} 





module.exports = {
    dateToString,
    todos, 
    user, 
    reformatResults,
    ValidateToken,
}