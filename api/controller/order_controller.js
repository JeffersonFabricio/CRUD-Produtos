var express = require('express');
var router = express.Router();
var Order = require('./../model/order.js');

router.post('/', (req, res) => {
    let order = new Order({ 
        products: req.body.products
     });
    order.save((err, order) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(order);
    });
});

router.get('/', (req, res) => {
    Order.find().exec((err, order) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(order);
    });
});

router.delete('/:id', (req, res) => {
    Order.deleteOne({_id: req.params.id}, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    });
});

router.patch('/:id', (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err)
            res.status(500).send(err);
        else if (!order)
            res.status(404).send({});
        else {
            order.products = req.body.products;
            order.save()
                .then((ord) => res.status(200).send(ord))
                .catch((e) => res.status(500).send(e));
        }
    });
});

module.exports = router;
