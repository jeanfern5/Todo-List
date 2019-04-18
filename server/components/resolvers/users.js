//GraphQL Users/Auth Resolver 
//signs up a new user and logs in a user an existing user
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk'); //remove?
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

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

            // async function AWS_Auth(){
            //     //if user does not exist, then it adds user's account into AWS Cognito
            //      userPool
            //     .signUp(email, password, attributeList, null, async function (err, result) {
            //         if (err) {
            //             console.log('\n---->AWS Error', err);
            //         }

            //         cognitoUser = result.user;
            //         console.log('user name is ' + cognitoUser.username);
            //     })
            // }
            // async function MongoDB(){
            //     await AWS_Auth();
            //        //and it creates user's account into MongoDB
            //         const createdUser = await newUser
            //         .save()
            //         .then(result => {
            //             console.log('\n-----> signupUser:\n', result);
            //             return result;
            //         })
            //         return createdUser; 
                
            // }
            // MongoDB();

            //   async function AWS_Auth(MongoDB_CB){
            //     //if user does not exist, then it adds user's account into AWS Cognito
            //      await userPool
            //     .signUp(email, password, attributeList, null, function (err, result) {
            //         if (err) {
            //             console.log('\n---->AWS Error', err);
            //         }

            //         cognitoUser = result.user;
            //         console.log('user name is ' + cognitoUser.username);
            //     });

            //     MongoDB_CB();
            // }
            //  function MongoDB(){
            //        //and it creates user's account into MongoDB
            //         const createdUser = newUser
            //         .save()
            //         .then(result => {
            //             console.log('\n-----> signupUser:\n', result);
            //             return result;
            //         })
            //         return createdUser; 
                
            // }
            // AWS_Auth(MongoDB);


            //if user does not exist, then it adds user's account into AWS Cognito
            await userPool
            .signUp(email, password, attributeList, null, async function (err, result) {
                if (err) {
                    console.log('\n---->AWS signupUser Error', err);
                }

                cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.username);
            })

            //and it creates user's account into MongoDB
            const createdUser = await newUser
            .save()
            .then(result => {
                console.log('\n-----> signupUser:\n', result);
                return result;
            })
            return createdUser;
        }
        catch (err) {
            console.log('\n----> GraphQL signupUser Error:\n', err);
            throw err;
        }
    },
    loginUser: async ({ email, password }) => {
        try{
            const user = await UserDB.findOne({ email: email });
            const userId = await user._id;

            if (!user) {
                throw new Error('User does not exist!');
            }

            const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username : email,
                Password : password,
            });
            const userData = {
                Username : email,
                Pool : userPool
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

            cognitoUser
            .authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());
                    // console.log('id token + ' + result.getIdToken().getJwtToken());
                    // console.log('refresh token + ' + result.getRefreshToken().getToken());
                    const token = result.getAccessToken().getJwtToken();
                },
                onFailure: function(err) {
                    console.log('\n---->AWS loginUser Error', err);
                }
            })
            

            console.log('=====>REsult', cognitoUser.authenticateUser(authenticationDetails, onSuccess))

        
            return { userId: userId }

        }
        catch (err) {
            console.log('\n----> GraphQL loginUser Error:\n', err);
            throw err;
        }   
    }

}
