const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyparser.json);
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors);

mongoose.connect(
    'mongodb://localhost:27017/comparadoutor',
    {useNewUrlParser: true}
);

//app.use('/products', product_controller);
app.use('/oders', order_controller);

app.listen(3000);
