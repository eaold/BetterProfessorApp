async function validateStudentId(req, res, next) {
	const id = req.params.id;

	const student = await Student.getById(id);

	if (student) {
		req.student = student;
		next();
	} else {
		res.status(400).json({ message: 'Invalid student ID' });
	}
}

module.exports = validateStudentId;
