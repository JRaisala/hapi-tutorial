"use strict"

const users = [
  {
		id: 1,
		username: "john",
		password: "$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm", // secret
		isAdmin: true
	  }
	]


class User {
	static findOne(qry) {
	  return new Promise(resolve => {
		const user = users.find(usr => usr.username === qry.username)
		if (user) {
		  return resolve(user)
		}
		resolve(null)
	  })
	}
  }
  
module.exports = {
	User
  }