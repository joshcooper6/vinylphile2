const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    accessKeyId: process.env.ACC_KEY,
    secretAccessKey: process.env.SEC_ACC_KEY
});

const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const client = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports = { db, AWS, client };