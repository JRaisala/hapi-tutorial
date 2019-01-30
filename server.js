'use strict';

const Hapi = require('hapi');


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});
 


const start = async function () {

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
};


server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
		//reply(request.location)
		const response = h.response(request.location);
		response.type('text/plain');
		return response;
    }
});

server.route({
    method: 'GET',
    path: '/test1/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});


const myServer = async () => {
	try {
		await server.start()
	} catch (err) {
	
	  console.log("Hapi error starting server", err);
	
	}
  };

  
myServer(); // don't forget to call it

start(); // don't forget to call it
  