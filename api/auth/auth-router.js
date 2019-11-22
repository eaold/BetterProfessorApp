const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../users/users-model');
const router = express.Router();
const validateUser = require('../../middleware/validateUser');
const { generateJWT } = require('./authentication-helpers');

// User Registration
router.post('/register', validateUser, (req, res) => {
	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 12);
	user.password = hash;

	User.insert(user)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to register user.' });
		});
});

// User Login
router.post('/login', validateUser, (req, res) => {
	const { username, password } = req.body;

	User.getBy({username})
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateJWT(user);
				res.status(200).json({
					message: `Welcome back, ${user.username}!`,
					token: token
				});
			} else if (user) {
				res.status(403).json({
					message: 'The password you entered is invalid. Please try again.'
				});
			} else {
				res.status(401).json({
					message:
						'The username you entered is invalid. Please check and try again.'
				});
			}
		})
		.catch(error => {
			res.status(500).json({
				message: 'There was an error logging in.'
			});
		});
});

module.exports = router;
