function validateStudent(req, res, next) {
	if (Object.keys(req.body) == 0) {
		res.status(400).json({ message: 'Missing student data' });
	} else if (
		req.body.student_fname &&
		req.body.student_lname &&
		req.body.student_email
	) {
		next();
	} else {
		res.status(400).json({
			message: 'Student first name, last name and email address are required.'
		});
	}
}

module.exports = validateStudent;
