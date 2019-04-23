const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const Q = require('q');
const  Auth  =  require("aws-amplify");
const AWS = require('aws-sdk'); 

const UserDB = require('../models/users');

const poolData = {
    UserPoolId: `${process.env.AWS_USER_POOL_ID}`,
    ClientId: `${process.env.AWS_CLIENT_ID}`
};
const pool_region = `${process.env.AWS_POOL_REGION}`; 


// const { ValidateToken } = require('./helpers')


async function call_aws(token, req){
    const deferred = Q.defer();
    let verifiedToken;
    let userId;
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, 
    async function (error, response, body) {
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
            var decodedJwt = await jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                req.isAuth = false; 
                deferred.resolve(req.isAuth);
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                req.isAuth = false; 
                deferred.resolve(req.isAuth);
            }
    
            try {
                verifiedToken = jwt.verify(token, pem);
            } catch (err) {
                req.isAuth = false; 
                deferred.resolve(req.isAuth);
            }

            if (!verifiedToken) {
                req.isAuth = false;
                deferred.resolve(req.isAuth);
            } else {
                req.isAuth = true;

                const awsId = verifiedToken.username;
                const user =  await UserDB.findOne({ password: awsId });
                userId = await user._id;

                deferred.resolve({'is_auth' : req.isAuth, 'userId' : userId});
                console.log('======>1', req.isAuth, userId)
            }  

        } else {
            console.log("Error! Unable to download JWKs");
            req.isAuth = false;
            deferred.resolve(req.isAuth);
        }
        
         });
        return deferred.promise;
    }

module.exports =  async (req, res, next) => {
    
    
    
    const authHeader = await req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = await authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }

    let aws_res = await call_aws(token, req);
    console.log("aws_res", aws_res);
        
    req.isAuth = aws_res.is_auth;
    req.userId = aws_res.userId;
    // const user =  await UserDB.findOne({ password: awsId });
    // userId = await user._id;
    return next();
};