//Middleware to assure that the user is authenticated
const { ValidateToken } = require('./validateToken');

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

    let awsRes = await ValidateToken(token, req);
        
    req.isAuth = awsRes.isAuth;
    req.userId = awsRes.userId;
    return next();
};