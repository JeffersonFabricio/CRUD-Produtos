var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    linkProduct: String,
    linkImg: String
}, {versionKey: false});

module.exports = mongoose.model("Product", productSchema);