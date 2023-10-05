const knex = require("knex")(require("../knexfile"));
const express = require('express')
const listings = require('../controllers/listings-controller')


const router = express.Router()

router.get('/craigslist', listings.getCraigslist)
router.get('/ebay', listings.getEbay)
router.get('/facebook', listings.getFacebook)
router.get('/shfb', listings.shfb)
router.get('/login', listings.loginToFacebook)


module.exports = router;