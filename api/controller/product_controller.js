var express = require('express');
var router = express.Router();
var Product = require('./../model/product.js');
var Order = require('./../model/order.js');

router.post('/', (req, res) => {
    let prod = new Product(
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
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

router.delete('/:id', async (req, res) => {
    try {
        const ords = await Order.find({orders: id}).exec();
        if (ords.length > 0) {
            res.status(500).send({
                msg: 'Você não pode remover um produto que pertence a uma cotação.'
            }) 
        } else {
            await Product.deleteOne({_id: req.params.id});
            res.status(200).send({});
        }
    } catch (error) {
       res.status(500).send({msg: 'Internal error.', error: err});
    }
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
            prod.stock = req.body.stock;
            prod.linkProduct = req.body.linkProduct;
            prod.linkImg = req.body.linkImg;
            prod.save()
                .then((product) => res.status(200).send(product))
                .catch((e) => res.status(500).send(e));
        }
    });
});

module.exports = router;
