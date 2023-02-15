require('dotenv').config();
const { Converter } = require('aws-sdk/clients/dynamodb');
const stripe = require('stripe')(process.env.STRIPE_SEC);
const express = require('express');
const data = require('./data');
const app = express();
const port = 2222;
const { transformArray } = require('./functions/transformArray');
const database = require('./configuredb.js').db;

app.use(express.json());
app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));

const DOMAIN = `http://127.0.0.1:5173/`;

app.get('/vinyls', (req, res) => {
    res.send(data.data);
});

app.get('/vinylsDB', (req, res) => {
    const params = {
        TableName: 'vinyls'
    };

    database.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // console.log(data);
            res.send(transformArray(data['Items']));
        }
    });
});


function checkStripe() {
        var strAPI = require("stripe")(process.env.STRIPE_SEC);

        // Retrieve all products
        strAPI.products.list(
        { limit: 100 },
        function(err, products) {
            // Handle any errors
            if (err) {
            console.log(err);
            return;
            }

            // Do something with the products
            console.log(products);
        }
        );
}

// checkStripe();

app.post('/checkout', async (req, res) => {
    const cart = req.body.cart;
    console.log(cart.map(item => {return { price: item.stripe_priceid, quantity: item.quantity }}));

    const session = await stripe.checkout.sessions.create({
        line_items: cart.map(item => {return { price: item.stripe_priceid, quantity: item.quantity }}),
        mode: 'payment',
        success_url: `${DOMAIN}?success=true`,
        cancel_url: `${DOMAIN}?canceled=true`,
      });
      

    res.send(session.url);
});


app.post('/deleteVinyl', async (req, res) => {
    const strAPI = require("stripe")(process.env.STRIPE_SEC);
    const id = req.body.id;

    await strAPI.products.update(
        id,
        {default_price: null, active: false}
      )
    .then(result => { console.log('success creation', result)
        var params = {
            TableName: 'vinyls',
            Key: {
                'id': { "S": id }
            }
        };

        database.deleteItem(params, (err, data) => {
            if (err) { console.log('something went wrong from deleting in db', err) }
            else { console.log('deletion was successful', data); res.send('deletion was successful.') }
        });
        
    })
    .catch(err => { console.log('error', err) })

});

app.put('/createVinyl', async (req, res) => {
    const strAPI = require("stripe")(process.env.STRIPE_SEC);

    await strAPI.products.create({
        name: `${req.body.album} by ${req.body.artist}`,
        default_price_data: { unit_amount: (req.body.price * 100), currency: 'usd' },
        images: [req.body.coverImg],
        metadata: {
            'artist': req.body.artist,
            'album': req.body.album,
            'year': req.body.year,
            'genre': req.body.genre,
        }
    }).then((result) => {
        console.log(`${req.body.album} by ${req.body.artist} added to Stripe! Adding to database now...`);
        const params = {
            TableName: 'vinyls',
            Item: {
                'id': {"S": result.id},
                'artist': {"S": req.body.artist},
                'album': {"S": req.body.album},
                'year': {"S": `${req.body.year}`},
                'genre': {"S": req.body.genre},
                'inStock': {"N": `${req.body.inStock}`},
                'coverImg': {"S": req.body.coverImg},
                'price': {"N": `${req.body.price}`},
                'quantity': {"N" : `0`},
                'stripe_prodid': {"S": result.id },
                'stripe_priceid': {"S": result.default_price}
            }
        };
        // will need result.id for stripe_prodid and result.default_price for stripe_priceid

        database.putItem(params, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(data);
                console.log(`After adding to Stripe and Database, ${req.body.album} by ${req.body.artist} has been added successfully!`)
                res.send(data);
            }
        });
    }).catch((err) => {
        console.log(err)
    });
});

app.listen(port, () => {
    console.log(`server deployed on port ${port}`)
});

