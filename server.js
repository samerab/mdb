const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');


mongoose.connect('mongodb://*********');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});

app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/posts', postRoute);





server.listen(3000, () => {
    console.log('Server started on port 3000');
});
