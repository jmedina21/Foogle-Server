require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const listings = require('./routes/listings');
const signup = require('./routes/signup');
const login = require('./routes/login');
const products = require('./routes/products');
const validate = require('./routes/validate');
require("./db/database")();

app.use(cors({origin: 'https://foogle.foo'}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Random Person!')
})
app.use('/listings', listings);
app.use('/signup', signup);
app.use('/login', login);
app.use('/products', products);
app.use('/validate', validate);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('listening on, ', port );
});