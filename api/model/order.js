var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    stock: Number,
    products: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ],
    /*user: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]*/
}, {versionKey: false});

module.exports = mongoose.model("Order", orderSchema);