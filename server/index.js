const express = require('express');
const data = require('./data');
const app = express();
const port = 2222;

app.use(require('cors')());

function findData(param, request) {
    const array = data.data;
    return array.filter(x => x?.[param] === request);
}

console.log(data.data);

app.get('/vinyls', (req, res) => {
    res.send(data.data);
});


app.listen(port, () => {
    console.log(`server deployed on port ${port}`)
});