'use strict';

const Hapi = require('hapi');
const Path = require('path')
const Handlebars = require('handlebars')

// create new server instance and connection information
const server = Hapi.server({
    port: 3000,
	host: 'localhost'
});

// register plugins, configure views and start the server instance
async function start () {
	// register plugins to server instance
	await server.register([
		{
		plugin: require('inert')
		},
		{
		plugin: require('vision')
		}
	])

	// view configuration
	const viewsPath = Path.resolve(__dirname, 'public', 'views')

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',
	})


	// start your server
	try {
		await server.start()
		console.log("Server started at " + server.info.uri);
	} catch (err) {
		console.log("Error starting server!!!", err);
		process.exit(1)
	}
}

start();

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