const express = require('express')
const router = express.Router()
const knex = require("knex")(require("../knexfile"));
const authorize = require('../middleware/authorize')
require("dotenv").config();

router.use(authorize);

router.get('/', (req, res) => {
    knex('products')
        .select('*')
        .where({user_id: req.user.id})
        .then((products) => {
            res.status(200).send(products);
        }
    )
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error getting products');
    })
});

module.exports = router;