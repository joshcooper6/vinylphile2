const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    accessKeyId: process.env.ACC_KEY,
    secretAccessKey: process.env.SEC_ACC_KEY
});

const db = new AWS.DynamoDB();

module.exports = { db };