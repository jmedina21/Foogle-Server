const Product = require("../db/models").Product;

const getProducts = async (req, res) => {
    try{
        const products = await Product.find({user_id: req.user.id})
        res.status(200).send(products);
    }catch(err){
        res.status(500).send('Error getting products', err);
    }
}

const postProduct = async (req, res) => {
    const {title, image, link, location, price} = req.body;
    if(!title || !link){
        return res.status(400).send('Please enter a title and link')
    }
    try{
        const product = new Product({
            title,
            image,
            link,
            location,
            price,
            user_id: req.user.id
        })
        const savedProduct = await product.save()
        res.status(201).send(savedProduct);
    }catch(err){
        res.status(500).send('Error adding product', err);
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const product = await Product.deleteOne({_id: id})
        res.status(200).send('Product deleted');
    }catch(err){
        res.status(500).send('Error deleting product', err);
    }
}

module.exports = {
    getProducts,
    postProduct,
    deleteProduct
}