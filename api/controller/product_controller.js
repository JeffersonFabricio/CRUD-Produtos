var express = require('express');
var router = express.Router();
var Product = require('./../model/product.js');

router.post('/', function(req, res) {
    let prod = new Product({ name: req.body.name });
    prod.save((err, prod) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    })
});

router.get('/', function(req, res) {
    Product.find().exec((err, prod) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    })
});

module.exports = router;
