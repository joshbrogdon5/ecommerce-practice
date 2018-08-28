const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const controller = require('./controller');

const app = express();

app.use(bodyParser.json());

const {SERVER_PORT, CONNECTION_STRING} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.get('/api/allproducts', controller.getProducts);
app.post('/api/addtocart', controller.addToCart)
app.get('/api/cartdata', controller.getCartInfo)
app.delete('/api/deletefromcart/:id', controller.deleteFromCart);
app.put('/api/setquantity', controller.setQuantity);
app.delete('/api/clearcart', controller.clearCart)

app.listen(SERVER_PORT, () => {
    console.log(`Server is going off on port ${SERVER_PORT}`)
})