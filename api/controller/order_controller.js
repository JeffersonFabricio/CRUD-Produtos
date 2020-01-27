var express = require('express');
var router = express.Router();
var Order = ('./../model/order.js');

router.post('/', function(req, res) {
    let order = new Order({ name: req.body.name });
    order.save((err, order) => {
        if (err)
            res.status(500).send();
    })
});
