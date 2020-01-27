var express = require('express');
var router = express.Router();
var Order = require('./../model/order.js');

router.post('/', function(req, res) {
    let order = new Order({ name: req.body.name });
    order.save((err, order) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(order);
    })
});

router.get('/', function(req, res) {
    Order.find().exec((err, order) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(order);
    });
});

module.exports = router;
