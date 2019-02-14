const express = require('express');
const multer = require('multer');
const PORT = 3001;
var app = express();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
app.get('/', function (req, res) {
    res.send("Hello World!")
});

app.post('/uploadfile', upload.single('image'), function (req, res) {
    res.json({ 'message': 'File uploaded successfully' });
});

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});