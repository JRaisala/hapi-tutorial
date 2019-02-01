'use strict';

const Hapi = require('hapi');
const Path = require('path')
const Handlebars = require('handlebars')
const Routes = require('./src/routes.js')

// create new server instance and connection information
const server = Hapi.server({
    port: 3000,
	host: 'localhost'
});

// register plugins, configure views and start the server instance
async function start () {
	// register plugins to server instance
	await server.register([
		{ plugin: require('inert')}, // serving folders and files
		{ plugin: require('vision')}, // handles templating
		{ plugin: require('hapi-auth-basic')}, // provides basic auth
		{ plugin: require('./src/auth/basic/')}, // provides basic auth
		{ plugin: require('./src/db')}, // mongoose db
		{ plugin: require('good'),
			options: {
				reporters: {
				myConsoleReporter: [{
					module: 'good-console'
				}, 'stdout']
				}
			}
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

	// import routes
	server.route(Routes);

	// start your server
	try {
		await server.start()
		console.log("Server started at " + server.info.uri);
	} catch (err) {
		console.log("Error starting server!!!", err);
		process.exit(1)
	}
}

start()