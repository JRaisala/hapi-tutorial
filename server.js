'use strict';

const Hapi = require('hapi');
const Path = require('path')
const Dotenv = require('dotenv')
const Handlebars = require('handlebars')
const Routes = require('./src/routes.js')

// import environment variables from local secrets.env file
Dotenv.config({ path: Path.resolve(__dirname, 'secrets.env') })

// create new server instance and connection information
const server = Hapi.server({
    port: process.env.PORT || 3000,
	host: 'localhost'
});

// register plugins, configure views and start the server instance
async function start () {
	// register plugins to server instance
	await server.register([
		{ plugin: require('inert')}, // serving folders and files
		{ plugin: require('vision')}, // handles templating
		//{ plugin: require('hapi-auth-basic')}, // provides basic auth
		//{ plugin: require('./src/auth/basic/')}, // provides basic auth
		{ plugin: require('hapi-auth-cookie')}, // provides cookie auth
		{ plugin: require('./src/auth/cookie/')}, // provides cookie auth
		{ plugin: require('./src/db')}, // mongoose db
		{ plugin: require('good'),
			options: {
				reporters: {
				myConsoleReporter: [{
					module: 'good-console'
				}, 'stdout']
				}
			}
		},
		{
			plugin: require('./src/user-signup-login')
		  }
	])

	// view configuration
	const viewsPath = Path.resolve(__dirname, 'public', 'views')

    server.views({
        engines: {
			hbs: Handlebars
		},
		path: viewsPath,
		layoutPath: Path.resolve(viewsPath, 'layouts'),
		layout: 'layout',
		// helpersPath: Path.resolve(viewsPath, 'helpers'),
		partialsPath: Path.resolve(viewsPath, 'partials'),
		// isCached: process.env.NODE_ENV === 'production',
		
 
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