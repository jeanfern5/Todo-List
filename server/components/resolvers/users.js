//GraphQL Users Resolver
const bcrypt = require('bcryptjs');

const UserDB = require('../models/users');
dateToString = date => new Date(date).toISOString();

module.exports = 
{
    createUser: async (args) => {
        try {
            //checking if user already exists
            const userExists = await UserDB.findOne({email: args.userInput.email});

            if (userExists){
                throw new Error('User already exists.')
            }

            //if user does not exist, then it creates a user with a hashed password
            const hashedPWD = await bcrypt.hash(args.userInput.password, 12);
         
            const newUser = new UserDB({
                email: args.userInput.email,
                password: hashedPWD,
            });

            const createdUser = await newUser
                .save()
                .then(result => {
                    console.log('\n-----> createUser:\n', result);
                    return {...result._doc, password: null, _id: result.id};
                })

            return createdUser;
        }
        catch (err) {
            console.log('\n----> GraphQL createUser Error:\n', err);
            throw err;
        }
    }

}
