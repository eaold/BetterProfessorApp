exports.up = function(knex) {
	return knex.schema.createTable('messages', messages => {
		messages.increments();
		messages
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
		messages
			.integer('student_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('students');
		messages.string('text').notNullable();
		messages.boolean('send_to_self');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('messages');
};
