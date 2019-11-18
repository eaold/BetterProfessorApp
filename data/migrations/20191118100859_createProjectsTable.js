exports.up = function(knex) {
  return knex.schema.createTable('projects', projects => {
	  projects.increments();
		projects
			.string('project', 128)
			.notNullable();
	});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};