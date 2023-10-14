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

//Enable CORS to allow AJAX and HTTP requests from the frontend.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connection with the Data Base successfully');
    app.listen(port, () => {
        console.log('Server running on http://localhost:' + port);
    });
});

//We specify the address to receive the client data ('/api/save')
//request: Data received from client
//response: Response we send to the client
app.post('/api/save', (request, response) => {
    console.log('Response received');
    const data = request.body;

    var file = new File();

    //We assign the values
    file.description = data.description;
    file.image = data.image;

    file.save((err, fileStored) => {
        if (err || !fileStored) {
            return response.status(404).send({
                status: 'error',
                message: 'The post has not been saved'
            });
        }

        //return response
        return response.status(200).send({
            status: 'success',
            fileStored
        });
    });
});

//Image upload
app.post('/api/saveImage', (req, res) => {
    const file = req.files.myFile;
    const fileName = req.files.myFile.name;
    const path = __dirname + '/public/images/' + fileName;
    console.log(path);

    file.mv(path, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({status: 'error', message: error}));
            return;
        }
        return res.status(200).send({status: 'success', path: 'public/images/' + fileName});
    });
});