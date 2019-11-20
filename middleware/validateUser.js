function validateUser(req, res, next) {
	if (Object.keys(req.body) == 0) {
		res.status(400).json({ message: 'Missing user data' });
	} else if (req.body.username && req.body.password) {
		next();
	} else {
		res.status(400).json({ message: 'Username and password are required' });
	}
}

module.exports = validateUser;
