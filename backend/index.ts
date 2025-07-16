const express = require('express');

const app = express();
const port = 3000;

// route
app.get('/', (req, res) => {
    res.send('hello world')
})

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})