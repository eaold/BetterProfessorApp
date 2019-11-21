const router = require('express').Router();
const Student = require('./students-model');
const Project = require('../projects/projects-model');
const validateStudentId = require('../../middleware/validateStudentID');
const validateStudent = require('../../middleware/validateStudent');
const validateProject = require('../../middleware/validateProject');

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

// Add project to a student.
router.post('/:id/projects', validateProject, (req, res) => {
	const id = req.params.id;
	const projectData = req.body;

	Project.insert({
		project: projectData.project,
		project_type: projectData.project_type,
		deadline: projectData.deadline,
		student_id: id
	})
	.then(data => {
		res.status(201).json(data);
	})
	.catch(error => {
		res.status(500).json({message: 'Unable to add project.'})
	})
});

// Update a student.
router.put('/:id', validateStudentId, validateStudent, (req, res) => {
	const id = req.params.id;
	const studentData = req.body;

	Student.update(id, studentData)
		.then(data => {
			Student.getById(id).then(data => {
				res.status(201).json(data);
			});
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to update student.' });
		});
});

// Delete a student.
router.delete('/:id', (req, res) => {
	const id = req.params.id;

	Student.remove(id)
		.then(data => {
			res.status(200).json({
				message: `Student with id of ${id} has been successfully deleted`,
				data
			});
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to delete student' });
		});
});

module.exports = router;
