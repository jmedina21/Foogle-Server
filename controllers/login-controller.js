const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
require("dotenv").config();
const User = require('../db/models').User;

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!password || !email){
        return res.status(400).send('Please enter email and password')
    }
    try{
        const user = await User.findOne({email: email.toLowerCase()})
        if(!user){
            return res.status(401).send('User does not exist')
        }
        const isValidPassword = bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).send('Incorrect password');
        }
        if(!user.verified){
            return res.status(401).send('Please verify your email');
        }
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({token})
    }catch(err){
        res.status(500).send('Error logging in user', err);
    }
}

const loginWithToken = async (req, res) => {
    const {token} = req.body;
    if(!token){
        return res.status(401).send('User not authorized');
    }
    const decoded = jwt_decode(token);
    
    try{
        const user = await User.findOne({email: decoded.email})
        if(user){
            const token = jwt.sign(
                {id: user._id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            )
            res.status(200).json({token})
        }else{
            const hashedPassword = bcrypt.hash('placeholdePassword', 10)
            user = new User({
                email: decoded.email,
                password: hashedPassword,
                verified: true
            })
            const savedUser = await user.save()
            const token = jwt.sign(
                {id: savedUser._id, email: savedUser.email},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            )
            res.status(200).json({token})
        }
    }catch(err){
        res.status(500).send('Error logging in user', err);
    }
}


module.exports = {
    login,
    loginWithToken
};