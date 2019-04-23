//Used in isAuth.js to assure user's token is valid
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const Q = require('q');

const UserDB = require('../../models/users');

const poolData = {
    UserPoolId: `${process.env.AWS_USER_POOL_ID}`,
    ClientId: `${process.env.AWS_CLIENT_ID}`
};
const pool_region = `${process.env.AWS_POOL_REGION}`; 


async function ValidateToken(token, req) {
    const deferred = Q.defer();
    let verifiedToken;
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, 
    async function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            const keys = body['keys'];
            for(let i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                const key_id = keys[i].kid;
                const modulus = keys[i].n;
                const exponent = keys[i].e;
                const key_type = keys[i].kty;
                const jwk = { kty: key_type, n: modulus, e: exponent };
                const pem = jwkToPem(jwk);
                pems[key_id] = pem;
            };
            
            //validate the token
            const decodedJwt = await jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                req.isAuth = false; 
                deferred.resolve(req.isAuth);
            };

            const kid = decodedJwt.header.kid;
            const pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                req.isAuth = false; 
                deferred.resolve(req.isAuth);
            };
    
            try {
                verifiedToken = jwt.verify(token, pem);
            } catch (err) {
                req.isAuth = false; 
                deferred.resolve(req.isAuth);
            };

            if (!verifiedToken) {
                req.isAuth = false;
                deferred.resolve(req.isAuth);
            } else {
                req.isAuth = true;

                const awsId = verifiedToken.username;
                const user =  await UserDB.findOne({ awsId: awsId });
                const userId = await user._id;

                deferred.resolve({'isAuth' : req.isAuth, 'userId' : userId});
            };  

        } else {
            console.log("Error! Unable to download JWKs");
            req.isAuth = false;
            deferred.resolve(req.isAuth);
        };
        
    });

    return deferred.promise;
};


module.exports = {
    ValidateToken,
};