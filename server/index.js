const express = require('express');
const multer = require('multer');
const PORT = 3001;
var app = express();
const clearFolderRecursive = require('./utils');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Method', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type,cache-control');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.send('Ok');
    } else {
        next();
    }
})
var upload = multer({ storage: storage });
app.get('/', function (req, res) {
    res.send("Hello World!")
});

app.post('/uploadfiles', upload.array('images', 10), function (req, res) {
    res.json({ 'message': 'Files uploaded successfully' });
});
app.get('/clearUploads', function (req, res) {
    clearFolderRecursive('server/public/uploads', (err) => {
        if (err) throw err;
        res.json({
            'message': 'All uploads cleared...'
        })
    });
});

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});