const express = require('express');
const app = express();
const port = 2222;

app.use(require('cors')());

app.get('/', (req, res) => {
    res.send('Working.')
});

app.listen(port, () => {
    console.log(`server deployed on port ${port}`)
});