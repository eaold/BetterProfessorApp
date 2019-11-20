const router = require('express').Router();
const User = require('./users-model');
const Student = require('../students/students-model');
const validateUserId = require('../../middleware/validateUserID');
const validateUser = require('../../middleware/validateUser');
const validateStudent = require('../../middleware/validateStudent');

// Get all users.
router.get('/', (req, res) => {
	User.get()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(500).json({
				message: 'Unable to retrieve users.'
			});
		});
});

// Get user by ID.
router.get('/:id', (req, res) => {
	const id = req.params.id;
	User.getById(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: `Unable to retrieve user with id ${id}` });
		});
});

// Get all of a user's students.
router.get('/:id/students', validateUserId, (req, res) => {
	const id = req.params.id;
	User.getUserStudents(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: 'Unable to retrieve students for this user.' });
		});
});

// Add student to a user.
router.post('/:id/students', validateUserId, validateStudent, (req, res) => {
	const id = req.params.id;
	const studentData = req.body;

	Student.insert({
		student_fname: studentData.student_fname,
		student_lname: studentData.student_lname,
		student_email: studentData.student_email,
		user_id: id
	})
		.then(data => {
			res.status(201).json(data);
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to add student.' });
		});
});

// Update a user.
router.put('/:id', validateUserId, validateUser,  (req, res) => {
	const id = req.params.id;
	const userData = req.body;

	User.update(id, userData)
		.then(data => {
			User.getById(id).then(data => {
				res.status(201).json(data);
			});
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to update user.' });
		});
});

// Delete a user.
router.delete('/:id', validateUserId, (req, res) => {
	const id = req.params.id;

	User.remove(id)
		.then(data => {
			res.status(200).json({
				message: `User with id of ${id} has been successfully deleted`,
				data
			});
		})
		.catch(error => {
			res.status(500).json({ message: `Unable to delete user.` });
		});
});

module.exports = router;
