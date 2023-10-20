const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../db/models').User;

router.get('/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({email: decoded.email})
        if(!user){
            return res.status(404).send('User does not found')
        }
        user.verified = true;
        await user.save()
        res.redirect('https://foogle.foo/login')
    } catch (error) {
        res.status(400).send('Invalid or expired verification link');
    }
});

module.exports = router;