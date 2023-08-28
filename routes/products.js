const express = require('express')
const router = express.Router()
const knex = require("knex")(require("../knexfile"));
const authorize = require('../middleware/authorize')
require("dotenv").config();
const products = require('../controllers/products-controller')

router.use(authorize);
router.route('/')
    .get(products.getProducts)
    .post(products.postProduct)

module.exports = router;