const express = require('express');
const statitistic = require('./controller')
const path = require('path');
const app = express();
const port = 9999
app.set('views', '');
app.use(express.static(__dirname));
app.set("view engine", "pug");
app.get('/', statitistic)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})