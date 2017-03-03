const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

var http = require('http').Server(server);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	//alert client a user has joined
	socket.on('user:join', function(name){
		console.log(name + ' joined')
		io.emit('user:join', name)
	})

	socket.on('send:message', function(message){
		console.log('message sent!')
		io.emit('send:message', message)
	})

});

debug(`Server is now running at http://localhost:${project.server_port}.`)
http.listen(project.server_port)