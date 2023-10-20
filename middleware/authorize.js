require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../db/models').User;

const authorize = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('User not authorized');
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send('User not authorized');
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        try{
            const user = await User.findOne({email: decoded.email})
            if(!user){
                res.status(401).send('User does not exist');
            }
            req.user = user;
            next();
        }catch(err){
            res.status(500).send('Error authorizing user', err);
        }
    })
}
module.exports = authorize;