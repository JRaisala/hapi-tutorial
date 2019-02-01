
'use strict'

const Routes = [
{
	method: 'GET',
	path: '/',
	options: {
		auth: {
			strategy: 'session'
		}
	},
	handler: (request, h) => {
  
		return h.view('./Login/index.html');
	}
},
{
  method: 'GET',
  path: '/login',
  config: {
	handler: async function (request, h) {

		return h.view('./Login/index.html');
	}
  }
}
]

module.exports = Routes