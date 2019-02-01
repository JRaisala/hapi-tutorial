
'use strict'

const Routes = [
/*{
		method: 'GET',
		path: '/',
		handler: (request, h) => {
			var data = { name: 'Juha' }
	
			return h.view('index', data);
	}
}*/{
	method: 'GET',
	path: '/',
	options: {
		auth: 'basic'
	},
	handler: function (request, h) {

		return 'welcome';
	}
},
{
    method: 'GET',
    path: '/file.js',
    handler: (request, h) => {

		return h.file('./public/js/file.js');
	}
},
{
    method: 'GET',
    path: '/test1/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
	}
}
]

module.exports = Routes