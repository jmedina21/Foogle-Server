const express = require('express')
const app = express()
const cors = require('cors')
const listings = require('./routes/listings');
const signup = require('./routes/signup');
const login = require('./routes/login');
const products = require('./routes/products');
const validate = require('./routes/validate');

require("dotenv").config();

app.use(cors())
app.use(express.json())

app.use('/listings', listings);
app.use('/signup', signup);
app.use('/login', login);
app.use('/products', products);
app.use('/validate', validate);

app.listen(process.env.PORT, () => {
    console.log('listening on, ', process.env.PORT );
});