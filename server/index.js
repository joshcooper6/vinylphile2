require('dotenv').config();
const { Converter } = require('aws-sdk/clients/dynamodb');
const express = require('express');
const data = require('./data');
const app = express();
const port = 2222;
const { transformArray } = require('./functions/transformArray');
const database = require('./configuredb.js').db;

app.use(express.json());
app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));

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
            console.log(data);
            res.send(transformArray(data['Items']));
        }
    });
});

app.put('/createVinyl', (req, res) => {
    const params = {
        TableName: 'vinyls',
        Item: {
            'id': {"S": `${req.body.album}_${req.body.artist}`},
            'artist': {"S": req.body.artist},
            'album': {"S": req.body.album},
            'year': {"S": `${req.body.year}`},
            'genre': {"S": req.body.genre},
            'inStock': {"N": `${req.body.inStock}`},
            'coverImg': {"S": req.body.coverImg},
            'price': {"N": `${req.body.price}`},
            'quantity': {"N" : `0`}
        }
    };

    database.putItem(params, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`server deployed on port ${port}`)
});