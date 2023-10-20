const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require("dotenv").config();
const User = require('../db/models').User;

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/', async (req, res) => {
    const { email, password} = req.body;
    if(!password || !email){
        return res.status(400).send('Please enter email and password')
    }
    if(!email.includes('@') || !email.includes('.')){
        return res.status(400).send('Email must be valid')
    }
    if(password.length < 8){
        return res.status(400).send('Password must be at least 8 characters')
    }
    if(password.includes('password')){
        return res.status(400).send('Are you for real?')
    }
    try{
        let user = await User.findOne({email: email.toLowerCase()})
        if(user){
            return res.status(400).send('Account already exists')
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            user = new User({
                email: email.toLowerCase(),
                password: hashedPassword,
                verified: false
            })
            const savedUser = await user.save()

            const userId = savedUser._id
            const verificationToken = jwt.sign({id: userId, email}, process.env.JWT_SECRET,
                {
                expiresIn: '1h'
                }
            )
            
            const verificationLink = `${req.protocol}://${req.get('host')}/validate/${verificationToken}`

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Foogle Email Verification',
                html: `<h2>Welcome to Foogle, the best place to find the best deals on the internet!</h2> <br>
                        <h3>Please verify your email by clicking on the link below:</h3> <br>
                        <a href="${verificationLink}">Click here to verify your email</a>`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(500).send('Error sending verification email');
                } else {
                    res.status(201).send({ message: 'Please verify your email by clicking on the link sent to you.' });
                }
              });
              
        }
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;