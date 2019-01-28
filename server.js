const Hapi = require('hapi') 

const server = Hapi.Server({
	host: 'localhost',
	port: 3000
})

	// TODO add routes to your server to accept request
	server.route ({
		method: 'GET',
		path: '/',
		handler: (request, h) => {
			return 'Hello world!'
		  }
	})

server.route ({
	method: 'GET',
	path: '/blog/{page}',
	handler: (request, h) => {
		return ('Hello world!' + request.params.page)
	  },
	  config: {
		  tags: [ 'blog'],
		  description: 'just a simple blog page route',
		  notes: 'text'
	  }
})

server.route ({
	method: 'POST',
	path: '/',
	handler: (request, h) => {
		return ('Created item')
	  }
})

server.start(function (err) {
	if (err) {
		throw err
	}

console.log('Server started at: ' + server.info.uri)
})