const express = require('express');
const app = express();
const postsRouter = require('./routers/posts');
 
app.use('/posts', postsRouter);
app.use('/', express.static(__dirname + '/static'));

app.listen(4000, () => {
    console.log('server listen on http://localhost:4000');
})