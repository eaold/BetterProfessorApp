exports.up = function(knex) {
  return knex.schema.createTable('students', students => {
		students.increments();
		students
			.string('student', 128)
			.notNullable();
	});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students');
};