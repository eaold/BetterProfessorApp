const router = require('express').Router();
const Project = require('./projects-model');
const validateProjectId = require('../../middleware/validateProjectID');
const validateProject = require('../../middleware/validateProject');

// Get all projects.
router.get('/', (req, res) => {
	Project.get()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(500).json({
				message: 'Unable to retrieve projects.'
			});
		});
});

// Get project by ID.
router.get('/:id', validateProjectId, (req, res) => {
	const id = req.params.id;

	Project.getById(id)
		.then(data => {
			res.status(200).json({ data });
		})
		.catch(error => {
			res.status(500).json({
				message: `Unable to retrieve project with id ${id}`
			});
		});
});

// Update a project.
router.put('/:id', validateProjectId, validateProject, (req, res) => {
	const id = req.params.id;
	const projectData = req.body;

	Project.update(id, projectData)
		.then(data => {
			Project.getById(id).then(data => {
				res.status(200).json(data);
			});
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to update project.' });
		});
});

// Delete a project.
router.delete('/:id', validateProjectId, (req, res) => {
	const id = req.params.id;

	Project.remove(id)
		.then(data => {
			res.status(200).json({
				message: `Project with id of ${id} has been successfully deleted.`,
				data
			});
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to delete project.' });
		});
});

module.exports = router;
