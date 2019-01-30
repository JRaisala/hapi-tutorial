'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
	host: 'localhost'
});

const liftoff = async () => {

	await server.register([{
        plugin: require('hapi-geo-locate'),
        options: {
			enablebyDefault: true
		},
		plugin: require('./server/my-custom-plugin'),
		options: {
			name: 'JR',
			isDeveloper: true
		},
	}]);

	await server.register(require('inert'));

	await server.register(require('vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views',
	})

	
	try {
		await server.start()
			
		console.log("Server started at " + server.info.uri);
	} catch (err) {
	
	  console.log("Hapi error starting server", err);
	
	}
};

liftoff();

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
		var data = { name: 'Juha' }

		return h.view('index', data);
    }
});

server.route({
    method: 'GET',
    path: '/file.js',
    handler: (request, h) => {

		return h.file('./public/js/file.js');
    }
});

server.route({
    method: 'GET',
    path: '/test1/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});