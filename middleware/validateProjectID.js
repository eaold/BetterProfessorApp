async function validateProjectId(req, res, next) {
	const id = req.params.id;

	const project = await Project.getById(id);

	if (project) {
		req.project = project;
		next();
	} else {
		res.status(400).json({ message: 'Invalid project ID' });
	}
}

module.exports = validateProjectId;
