const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;

function generateJWT(user) {
	const payload = {
		sub: user.id,
		username: user.username
	};

	const option = {
		expiresIn: '1d'
	};

	const result = jwt.sign(payload, jwtKey, option);

	return result;
}

function authenticate(req, res, next) {
	const token = req.get('Authorization');

	if (token) {
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) {
				res.status(401).json({
					message: err.message
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(401).json({
			message: 'No token provided, must be set on the Authorization Header'
		});
	}
}

module.exports = { generateJWT, authenticate };
