const express = require('express');
const path = require('path');
const port = 3003;

const app = express();

function listenCB () {
    console.log("we are runnning on " + port);
}

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, listenCB);