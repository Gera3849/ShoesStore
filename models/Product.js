const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    image: [String]
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;