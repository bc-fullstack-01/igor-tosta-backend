const express = require('express');
const app = express();

app.get('/', function (req, res) {
    console.log(req.headers);
    res.send('Hello from express server');
});

app.listen(4000, () => {
    console.log('server listen on http://localhost:4000')
})