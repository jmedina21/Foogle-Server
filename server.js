const express = require('express')
const app = express()
const cors = require('cors')
const craigslist = require('./routes/craigslist');
const ebay = require('./routes/ebay');
const facebook = require('./routes/facebook');
require("dotenv").config();

app.use(cors())
app.use(express.json())


app.use('/craigslist', craigslist);
app.use('/ebay', ebay);
app.use('/facebook', facebook);


app.listen(process.env.PORT, () => {
    console.log('listening on, ', process.env.PORT );
});