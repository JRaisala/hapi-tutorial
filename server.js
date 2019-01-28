const Hapi = require('hapi') 

const server = Hapi.Server({
	host: 'localhost',
	port: 3000
})

	// TODO add routes to your server to accept request

server.route ({
	method: 'GET',
	path: '/',
	handler: () => 'Hello world!'
})

server.start(function (err) {
	if (err) {
		throw err
	}

console.log('Server started at: ' + server.info.uri)
})