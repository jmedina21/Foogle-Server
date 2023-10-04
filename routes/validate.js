const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

router.get('/:token', (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        knex('users')
            .where({ id: decoded.id, email: decoded.email })
            .update({ verified: true })
            .then(() => {
                res.redirect('https://foogle.foo/login')
            })
            .catch(err => {
                res.status(500).send('Verification failed');
            });
    } catch (error) {
        res.status(400).send('Invalid or expired verification link');
    }
});

module.exports = router;