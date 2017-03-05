const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

var http = require('http').Server(server)
var io = require('socket.io')(http)
var users = []
io.on('connection', function(socket){
	//alert client a user has joined
	var username;
	
	socket.on('user:join', function(name){
		console.log(name + ' joined')
		username = name
		users.push(name)
		io.emit('user:join', name, users)
	})

	socket.on('send:message', function(message){
		console.log('message sent!')
		io.emit('send:message', message)
	})

	socket.on('disconnect', function(){
		console.log(username + ' left')
		var index = users.indexOf(username)
		users.splice(index, 1)
		if (username !== undefined) {
			io.emit('user:left', {name: username, users: users})
		}
	})

});

debug(`Server is now running at http://localhost:${project.server_port}.`)
http.listen(project.server_port)