const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const order_controller = require('./controller/order_controller');
const product_controller = require('./controller/product_controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/comparadoutor',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use('/products', product_controller);
app.use('/oders', order_controller);

app.listen(3000);
