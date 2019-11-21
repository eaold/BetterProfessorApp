const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
	return knex('users')
		.truncate()
		.then(function() {
			return knex('users').insert([
				{ username: 'user1', password: bcrypt.hashSync('password123') },
				{ username: 'user2', password: bcrypt.hashSync('password456') },
				{ username: 'user3', password: bcrypt.hashSync('password789') },
				{ username: 'user4', password: bcrypt.hashSync('password987') },
			]);
		});
};
