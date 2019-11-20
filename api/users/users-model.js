const db = require('../../data/db.js');

module.exports = {
	get,
	getById,
	insert,
	update,
	remove,
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

function insert(user) {
	return db('users')
		.insert(user)
		.then(ids => {
			return getById(ids[0]);
		});
}

function update(id, changes) {
	return db('users')
		.where({ id })
		.update({ changes });
}

function remove(id) {
	return db('users')
		.where({ id })
		.del();
}

function getUserStudents(userId) {
	return db('students as s')
		.join('users as u', 'u.id', 's.user_id')
		.select('s.id', 's.student_fname', 's.student_lname', 's.student_email')
		.where('s.user_id', userId);
}
