const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

router.post('/', (req, res) => {
    const {username, email, password} = req.body;
    knex('users')
        .where({username})
        .then((users) => {
            if (users.length) {
                res.status(409).send('User already exists');
            } else {
                knex('users')
                    .insert({username, email, password})
                    .then(() => {
                        //send jwot token
                        const token = jwt.sign({username, email}, process.env.JWT_SECRET);
                        res.status(201).send(token);
                    })
            }
        }
    )
});

module.exports = router;