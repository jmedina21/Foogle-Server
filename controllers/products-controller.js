const knex = require("knex")(require("../knexfile"));

const getProducts = (req, res) => {
        knex('products')
            .select('*')
            .where({user_id: req.user.id})
            .then((products) => {
                res.status(200).send(products);
            }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error getting products');
        })
}

const postProduct = (req, res) => {
    const {title, image, link, location, price} = req.body;
    if(!title || !link){
        return res.status(400).send('Please enter a title and link')
    }
    knex('products')
        .insert({title, image, link, location, price, user_id: req.user.id})
        .then(() => {
            res.status(201).send('Product added');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error adding product');
        })
}

    




module.exports = {
    getProducts,
    postProduct
}