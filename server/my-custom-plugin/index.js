'use strict'

const name = 'myplugin'
const version = '1.0.0'
const options = ''

const register = server => {

	console.log('info', `Registering plugin ${name} v.${version}`)

	server.route({
		method: 'GET',
		path: '/my-path',
		handler: (request, h) => {
			const response = h.response('Hi, buddy');
			response.type('text/plain');
			return response;
		}
	});


	console.log(options)

} 

exports.plugin = { register, name, version, options }