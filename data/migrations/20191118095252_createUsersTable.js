exports.up = function(knex) {
	return knex.schema.createTable('users', users => {
		users.increments();
		users
			.string('username', 128)
			.notNullable()
			.unique();
		users.string('password', 128).notNullable();
	})
	.createTable('students', students => {
		students.increments();
		students.string('student_fname', 128).notNullable();
		students.string('student_lname', 128).notNullable();
		students.string('student_email', 128).notNullable();
		students
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	})
	.createTable('projects', projects => {
		projects.increments();
		projects.string('project', 128).notNullable();
		projects.string('project_type', 128).notNullable();
		projects.string('deadline', 128);
		projects
			.integer('student_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('students')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('projects').dropTableIfExists('students').dropTableIfExists('users');
};
