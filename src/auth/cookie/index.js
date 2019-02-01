"use strict";

exports.plugin = {
  name: "cookie",
  version: "1.0.0",
  register: async server => {



	const Boom = require("boom")
	const Bcrypt = require("bcrypt");
	const { User } = require("../users")


    server.auth.strategy("session", "cookie", {
      password: "password-should-be-32-characters",
      cookie: "session",
      isSecure: false,
	  redirectTo: "/login"
    });

	server.route({
		method: 'POST',
		path: '/login',
		config: {
			handler: async request => {
			let user

			if (request.auth.isAuthenticated) {
				return { message: "Yo! You dawg already authenticated." }
			  }
	
			  const username = request.payload.username
			  const pwd = request.payload.password
	
			  try {
				// check if user exists in DB
				user = await User.findOne({ username })
				if (!user) {
				  throw new Error(`Invalid username ${username} tried to logon`)
				}
	
				// compare passwords
				const isValid = await Bcrypt.compare(pwd, user.password)
				if (!isValid) {
				  throw new Error(`User ${username} tried to logon with invalid pwd: ${pwd}`)
				}
	
				const { password, ...credentials } = user // remove pwd from User obj
				request.cookieAuth.set(credentials)
			  } catch (err) {
				console.error(err.stack)
				throw Boom.unauthorized()
			  }
			  return { message: `Welcome ${user.username}` }

		  }
		}
		})

		server.route({
			method: "GET",
			path: "/logout",
			config: {
			  auth: "session",
			  handler: request => {
				// clear the session data
				request.cookieAuth.clear()
				return { message: "User logged out" }
			  }
			}
		  })
	}
};
