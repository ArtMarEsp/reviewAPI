const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //This is for the Authorization token.
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY); //The JWT_KEY is in the .env file
    req.userData = decoded;
    next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth Fail'
        });
    }
    
};