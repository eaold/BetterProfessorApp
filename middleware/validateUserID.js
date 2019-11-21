const User = require('../api/users/users-model');

async function validateUserId(req, res, next) {
	const id = req.params.id;

	const user = await User.getById(id);

	if (user) {
		req.user = user;
		next();
	} else {
		res.status(400).json({ message: 'Invalid user ID' });
	}
}

module.exports = validateUserId;
