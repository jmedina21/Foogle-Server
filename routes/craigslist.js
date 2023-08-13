const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello from czxraigslist')
})

module.exports = router;