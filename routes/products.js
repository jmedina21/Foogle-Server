const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
require("dotenv").config();
const products = require('../controllers/products-controller')

router.use(authorize);
router.route('/')
    .get(products.getProducts)
    .post(products.postProduct)

 router.route('/:id')   
    .delete(products.deleteProduct)

module.exports = router;