const db = require('../../data/db.js');

module.exports = {
	get,
	getById,
	getBy,
	insert,
	getUserStudents
};

function get() {
	return db('users');
}

function getById(id) {
	return db('users')
		.where({ id })
		.first();
}

function getBy(filter) {
	return db('users')
		.where(filter)
		.first();
}

function insert(user) {
	return db('users')
		.insert(user, 'id')
		.then(ids => {
			return getById(ids[0]);
		});
}

function getUserStudents(userId) {
	return db('students as s')
		.join('users as u', 'u.id', 's.user_id')
		.select('s.id', 's.student_fname', 's.student_lname', 's.student_email')
		.where('s.user_id', userId);
}
