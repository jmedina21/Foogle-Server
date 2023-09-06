const express = require('express')
const router = express.Router()
require("dotenv").config();
const products = require('../controllers/login-controller')

router.route('/')
    .post(products.login)

router.route('/token')
    .post(products.loginWithToken)

module.exports = router;