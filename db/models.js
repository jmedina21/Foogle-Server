const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    verified: Boolean,
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String,
    price: String,
    image: String,
    location: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    User,
    Product,
}