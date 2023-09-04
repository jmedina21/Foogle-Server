const knex = require("knex")(require("../knexfile"));

const getProducts = (req, res) => {
    knex('products')
        .select('*')
        .where({user_id: req.user.id})
        .then((products) => {
            if(!products.length){
                return res.status(404).send('No products found');
            }
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
        .then((product) => {
            res.status(201).send(product);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error adding product');
        })
}

const deleteProduct = (req, res) => {
    const {id} = req.params;
    knex('products')
        .where({id})
        .del()
        .then(() => {
            res.status(200).send('Product deleted');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting product');
        })
}

module.exports = {
    getProducts,
    postProduct,
    deleteProduct
}