const express = require('express');
const cart = require('./cart');
const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  };

const app = express();
const port = 3000;

const cartArray = cart.cartArray;

app.use(express.json());
app.options('/cart-items/:id', cors()) 

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});

app.get( '/cart-items',  cors(corsOptions), (req, res) => {
    res.json(cartArray);
});

app.get( '/cart-items/:id',  cors(corsOptions),(req, res) => {
    const item = cartArray.find( cartItem => cartItem.id == req.params.id)
    if(!item){
        res.status(404);
        res.json('ID not found');
    } else {
        res.json(item);
    }
});

app.post( '/cart-items',  cors(corsOptions),(req, res) => {
    const body = req.body.data;
    cartArray.push(body);
    res.json("Cart item successfully added");
});

app.put( '/cart-items/:id',  cors(corsOptions), (req, res) => {
    res.status(201);
    const id = req.params.id;
    const body = req.body.data;

    const newCart = {
        id: id,
        product: body.product,
        price: body.price,
        quantity: body.quantity
    };
    
    const index = cartArray.findIndex( cartItem => cartItem.id == id );

    cartArray.splice(index, 1, newCart)
    res.json("Updating cart item by id");
});

app.delete( '/cart-items/:id',  cors(corsOptions), (req, res) => {
    res.status(204);
    const id = req.params.id;
    const index = cartArray.findIndex( cartItem => cartItem.id == id );
    cartArray.splice(index, 1)
    res.json("Deleting cart item");
});