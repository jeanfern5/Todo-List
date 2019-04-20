//GraphQL Users/Auth Resolver 
//signs up a new user and logs in a user an existing user
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk'); 
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const Q = require('q');

const UserDB = require('../models/users');
const poolData = {
    UserPoolId: `${process.env.AWS_USER_POOL_ID}`,
    ClientId: `${process.env.AWS_CLIENT_ID}`
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const pool_region = `${process.env.AWS_POOL_REGION}`;            


module.exports = 
{
    signupUser: async (args) => {

        const { email, password } = args.userInput;
        
        const newUser = new UserDB({
            email: args.userInput.email,
            password: true,
        });

        try {
            const attributeList = [];
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name:"email",Value: email }));

            // checking if user already exists in MongoDB
            const userExists = await UserDB.findOne({ email: email });

            if (userExists){
                throw new Error('User already exists.')
            }

            const createdUser = await newUser
                    .save()
                    .then(result => {
                        console.log('\n-----> signupUser:\n', result);
                        return result;
                    })

            return createdUser;

            // async function AWS_Auth(){
            //     //if user does not exist, then it adds user's account into AWS Cognito
            //     await userPool
            //     .signUp(email, password, attributeList, null, async function (err, result) {
            //         if (err) {
            //             console.log('\n---->AWS Error', err);
            //         }else{
            //         cognitoUser = result.user;
            //         console.log('user name is ' + cognitoUser.username);
            //         MongoDB();
            //         }
                
            //     })            
            // }

            // async function MongoDB(){
            //         const createdUser = await newUser
            //         .save()
            //         .then(result => {
            //             console.log('\n-----> signupUser:\n', result);
            //             return result;
            //         })
            //         return createdUser; 
               
            // }
            // AWS_Auth();
        
        }
        catch (err) {
            console.log('\n----> GraphQL signupUser Error:\n', err);
            throw err;
        }
    },
    loginUser: async ({ email }) => {
        // const deferred = Q.defer();
        const user = await UserDB.findOne({ email: email });
        try{
            if (!user) {
                throw new Error('User does not exist!');
              }

            const userId = await user._id;
            return { userId: userId };

            // const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            //     Username : email,
            //     Password : password,
            // });
            // const userData = {
            //     Username : email,
            //     Pool : userPool
            // };
            // const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            
            // cognitoUser
            // .authenticateUser(authenticationDetails, {
            //     onSuccess: function (session) {
            //         const tokens = {
            //             accessToken: session.getAccessToken().getJwtToken(),
            //             idToken: session.getIdToken().getJwtToken(),
            //             refreshToken: session.getRefreshToken().getToken()
            //         };

            //         deferred.resolve({ userId: userId, token: tokens.accessToken });
            //     },
            //     onFailure: function(err) {
            //         deferred.reject(err.message);
            //         return;                    
            //     }
            // })

            // return deferred.promise;
        }
        catch (err) {
            throw ('GraphQL loginUser Error:', err);
        }   
    },

}


