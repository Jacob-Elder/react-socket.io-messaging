const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

var app = server.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)
var io = require('socket.io').listen(app);