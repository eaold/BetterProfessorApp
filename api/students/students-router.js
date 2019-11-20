const router = require('express').Router();
const Student = require('./students-model');
const Project = require('../projects/projects-model');
const validateStudentId = require('../../middleware/validateStudentID');

// Get all students.
router.get('/', (req, res) => {
	Student.get()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to retrieve students.' });
		});
});

// Get student by ID.
router.get('/:id', (req, res) => {
	const id = req.params.id;

	Student.getById(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: `Unable to retrieve student with id ${id}` });
		});
});

// Get all of a student's projects.
router.get('/:id/projects', (req, res) => {
	const id = req.params.id;
	Student.getStudentProjects(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: 'Unable to retrieve projects for this student' });
		});
});
