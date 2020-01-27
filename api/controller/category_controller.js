var express = require('express');
var router = express.Router();
var Category = ('./../model/category.js');

router.post('/', function(req, res) {
    let cat = new Category({ name: req.body.name });
    cat.save((err, cat) => {
        if (err)
            res.status(500).send();
        else
            res.status(200).send(cat);
    })
});

router.post('/', function(req, res) {
    Category.find().exec((err, cat) => {
        if (err)
            res.status(500).send();
        else
            res.status(200).send(cat);
    });
});

module.exports = router;
