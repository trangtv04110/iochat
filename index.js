var app	 	= require('express')();
var http 	= require('http').Server(app);
var io 		= require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('connected');
	socket.on('disconnect', function() {
		//console.log('disconnect');
	});
	socket.on('login', function(nick) {
		//console.log(nick);
		io.emit('login', nick);
	});
	socket.on('chat message', function(message) {
		socket.broadcast.emit('chat message', message);
	});
});

var port = Number(process.env.PORT || 3000);

http.listen(port, function() {
	console.log('listen on ', port);
});