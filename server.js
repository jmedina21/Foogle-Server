const express = require('express')
const app = express()
const cors = require('cors')
const craigslist = require('./routes/craigslist');
require('dotenv').config()

app.use(cors())

app.listen(8080, () => {
    console.log('listening on, ', 8080 );
  });

  app.use('/craigslist', craigslist);