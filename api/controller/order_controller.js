var express = require('express');
var router = express.Router();
var Order = ('./../model/order.js');

router.post('/', function(req, res) {
    let order = new Order({ name: req.body.name });
    order.save((err, order) => {
        if (err)
            res.status(500).send();
        else
            res.status(200).send(order);
    })
});

router.post('/', function(req, res) {
    Order.find().exec((err, order) => {
        if (err)
            res.status(500).send();
        else
            res.status(200).send(order);
    });
});

module.exports = router;
