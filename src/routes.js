
'use strict'

const Routes = [
{
	method: 'GET',
	path: '/',
	options: {
		auth: {
			strategy: 'session',
			scope: 'admin'
		}
	},
	handler: (request, h) => {

		if (request.auth.isAuthenticated) {
			return h.view('./index.html');
		}   else {
  
		return h.redirect('./Login/index.html');
		}
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