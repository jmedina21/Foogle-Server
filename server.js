const express = require('express')
const app = express()
const axios = require('axios');
require('dotenv').config()

const { EBAY_TOKEN } = process.env

app.listen(8080, () => {
    console.log('listening on 8080' );
  });