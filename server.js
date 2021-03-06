require('dotenv').config(); //Load dot env variables
var express = require('express');
var engines = require('consolidate');
var http = require('http');
var io = require('socket.io');
var clientConnection = require('./clientConnection');

var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
io = io.listen(server);
var listener = server.listen(port,
    () => {
        let addr = listener.address();
        console.log(`http://localhost:${addr.port}`);
        console.log(`http://localhost:${addr.port}/host`);

    });

app.engine('html', engines.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/host', function (req, res) {
    res.render('index', { host: true });
});

io.sockets.on('connection', function (socket) {
    clientConnection.init(socket);
});