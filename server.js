const express = require('express')
const app = express()
const cors = require('cors')
const craigslist = require('./routes/craigslist');
const ebay = require('./routes/ebay');
const facebook = require('./routes/facebook');


require('dotenv').config()

app.use(cors())

app.listen(2121, () => {
    console.log('listening on, ', 2121 );
  });

  app.use('/craigslist', craigslist);
  app.use('/ebay', ebay);
  app.use('/facebook', facebook);

