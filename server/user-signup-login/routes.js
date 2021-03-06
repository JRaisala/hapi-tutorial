'use strict'

const Handler = require('./handler')

const Routes = [ 
  // the signup routes
  {	
    method: 'GET',
    path: '/signup',
    config: Handler.showSignup
  },
  {
    method: 'POST',
    path: '/signup',
    config: Handler.signup
  },

  // the login routes
  {
    method: 'GET',
    path: '/login',
    config: Handler.showLogin
  },
  {
    method: 'POST',
    path: '/login',
    config: Handler.login
  },
	// the logout route
	{
    method: 'GET',
    path: '/logout',
    config: Handler.logout
  },
  	// the password reset routes
  {
    method: 'GET',
    path: '/forgot-password',
    config: Handler.showForgotPassword
  },
  {
    method: 'POST',
    path: '/forgot-password',
    config: Handler.forgotPassword
  },
  {
    method: 'GET',
    path: '/reset-password/{email}/{resetToken}',
    config: Handler.showResetPassword
  },
  {
    method: 'POST',
    path: '/reset-password/{email}/{resetToken}',
    config: Handler.resetPassword
  }
]

module.exports = Routes  