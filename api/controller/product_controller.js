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

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Product.deleteOne({_id: id}, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    })
});

router.patch('/:id', (req, res) => {
    Product.findById(req.params.id, (err, prod) => {
        if (err)
            res.status(500).send(err);
        else if (!prod)
            res.status(404).send({});
        else {
            prod.name = req.body.name;
            prod.description = req.body.description;
            prod.save()
                .then((product) => res.status(200).send(product))
                .catch((e) => res.status(500).send(e));
        }
    })
});

module.exports = router;
