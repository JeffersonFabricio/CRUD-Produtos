var express = require('express');
var router = express.Router();
var Product = ('./../model/product.js');

router.post('/', function(req, res) {
    let prod = new Product({ name: req.body.name });
    prod.save((err, prod) => {
        if (err)
            res.status(500).send();
    })
});
