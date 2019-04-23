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
        const deferred = Q.defer();
        const { email, password } = args.userInput;

        try {
            const attributeList = [];
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name:"email", Value: email }));

            async function AWS_Auth(){
                //adding user's account into AWS Cognito
                await userPool
                .signUp(email, password, attributeList, null, async function (err, result) {
                    if (err) {
                        deferred.reject(err.message);
                    } 
                    else {
                        const awsId = await result.userSub;

                        MongoDB(awsId);
                    };
                });           
            };

            async function MongoDB(id){
                //if AWS Cognito is successful, then it adds the user to MongoDB
                const newUser = new UserDB({
                    email: args.userInput.email,
                    awsId: id
                });

                return await newUser
                    .save()
                    .then(result => {
                        console.log('\n-----> signupUser:\n', result);
                        deferred.resolve(result);
                    })
                    .catch(err => {
                        deferred.reject(err.message);
                    });     
            };

            AWS_Auth();
            return deferred.promise;
        }
        catch (err) {
            throw ('GraphQL loginUser Error:', err);
        };
    },
    loginUser: async ({ email, password }) => {
        const deferred = Q.defer();
        try{
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
                onSuccess: async function (session) {
                    const tokens = {
                        accessToken: session.getAccessToken().getJwtToken(),
                        idToken: session.getIdToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken()
                    };

                    const user = await UserDB.findOne({ email: email });
                    const userId = await user._id;

                    deferred.resolve({ userId: userId, token: tokens.accessToken });
                },
                onFailure: function(err) {
                    deferred.reject(err.message);
                }
            })

            return deferred.promise;
        }
        catch (err) {
            throw ('GraphQL loginUser Error:', err);
        }   
    },

}


