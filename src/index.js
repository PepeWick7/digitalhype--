const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const File = require('./models/file');

//express intance
const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const port = process.env.PORT || 3000;

const url = "mongodb+srv://user-test:Admin123@cluster0.tjhm7ef.mongodb.net/File?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connection with the Data Base successfully');
    app.listen(port, () => {
        console.log('Server running on http://localhost:' + port);
    });
});