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
const token = [];


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

            async function AWS_Auth(){
                //if user does not exist, then it adds user's account into AWS Cognito
                await userPool
                .signUp(email, password, attributeList, null, async function (err, result) {
                    if (err) {
                        console.log('\n---->AWS Error', err);
                    }else{
                    cognitoUser = result.user;
                    console.log('user name is ' + cognitoUser.username);
                    MongoDB();
                    }
                
                })            
            }

            async function MongoDB(){
                    console.log("ran mongo")
                    const createdUser = await newUser
                    .save()
                    .then(result => {
                        console.log('\n-----> signupUser:\n', result);
                        return result;
                    })
                    return createdUser; 
               
            }
            AWS_Auth();
        
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
                onSuccess: function (session) {
                    const tokens = {
                        accessToken: session.getAccessToken().getJwtToken(),
                        idToken: session.getIdToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken()
                    };

                    // console.log('\naccess token:\n' + session.getAccessToken().getJwtToken());

                    token.push(tokens.accessToken)
                    console.log('\n\ntoken', tokens.accessToken)
                    // console.log('\nid token\n' + session.getIdToken().getJwtToken());
                    // console.log('\nrefresh token\n' + session.getRefreshToken().getToken());
                },
                onFailure: function(err) {
                    console.log('\n---->AWS loginUser Error', err);
                    return;                    
                }
            })

            return { userId: userId, token: token[0] }

        }
        catch (err) {
            console.log('\n----> GraphQL loginUser Error:\n', err);
            throw err;
        }   
    },
    isAuth: async (req, res, next) => {
        const authHeader = req.get('Authorization');
        console.log('------>authHeader:', authHeader);

        if (!authHeader) {
            req.isAuth = false;
            return next();
        }
    
        const token = authHeader.split(' ')[1];
        console.log('------>TOKEN:', token);
        if (!token || token === '') {
            req.isAuth = false;
            return next();
        }
    
        let decodedToken;
        try {
            decodedToken = jwt.verify(token);
        } 
        catch (err) {
            console.log('-------->3')
            req.isAuth = false;
            return next();
        }
    
        if (!decodedToken) {
            console.log('-------->4')
            req.isAuth = false;
            return next();
        }
    
        req.isAuth = true;
        // req.userId = decodedToken.userId;
        next();
    }

}


