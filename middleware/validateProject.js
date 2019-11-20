function validateProject(req, res, next) {
	if (Object.keys(req.body) == 0) {
		res.status(400).json({ message: 'Missing project data' });
	} else if (req.body.project && req.body.project_type && req.body.deadline) {
		next();
	} else {
		res.status(400).json({
			message: 'Project, project type and deadline are required.'
		});
	}
}

module.exports = validateProject;
