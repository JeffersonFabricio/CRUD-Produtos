var express = require('express');
var router = express.Router();
var Product = require('./../model/product.js');

router.post('/', (req, res) => {
    let prod = new Product(
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            linkProduct: req.body.linkProduct,
            linkImg: req.body.linkImg
        }
    );
    prod.save((err, prod) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    });
});

router.get('/', (req, res) => {
    Product.find().exec((err, prod) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    });
});

router.delete('/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    });
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
            prod.price = req.body.price;
            prod.linkProduct = req.body.linkProduct;
            prod.linkImg = req.body.linkImg;
            prod.save()
                .then((product) => res.status(200).send(product))
                .catch((e) => res.status(500).send(e));
        }
    });
});

module.exports = router;
