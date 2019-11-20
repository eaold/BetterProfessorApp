const db = require('../../data/db.js');

module.exports = {
	get,
	getById,
	insert,
	update,
	remove,
	getStudentProjects
};

function get() {
	return db('students');
}

function getById(id) {
	return db('students')
		.where({ id })
		.first();
}

function insert(student) {
	return db('students')
		.insert(student)
		.then(ids => {
			return getById(ids[0]);
		});
}

function update(id, changes) {
	return db('students')
		.where({ id })
		.update({ changes });
}

function remove(id) {
	return db('students')
		.where({ id })
		.del();
}

function getStudentProjects(studentId) {
	return db('projects as p')
		.join('students as s', 's.id', 'p.student_id')
		.select('p.id', 'p.project', 'p.project_type', 'p.deadline', 's.id')
		.where('p.student_id', studentId);
}
