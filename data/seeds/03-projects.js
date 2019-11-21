exports.seed = function(knex) {
	return knex('projects')
		.truncate()
		.then(function() {
			return knex('projects').insert([
				{ project: 'Project 1', project_type: 'Project Type 1', deadline: '22/03/2020', student_id:1 },
				{ project: 'Project 2', project_type: 'Project Type 1', deadline: '22/03/2020', student_id:2 },
				{ project: 'Project 3', project_type: 'Project Type 2', deadline: '22/03/2020', student_id:3 },
				{ project: 'Project 4', project_type: 'Project Type 3', deadline: '22/03/2020', student_id:4 },
				{ project: 'Project 5', project_type: 'Project Type 4', deadline: '22/03/2020', student_id:4 },
				{ project: 'Project 6', project_type: 'Project Type 4', deadline: '22/03/2020', student_id:3 },
				{ project: 'Project 7', project_type: 'Project Type 4', deadline: '22/03/2020', student_id:3 },
				{ project: 'Project 8', project_type: 'Project Type 2', deadline: '22/03/2020', student_id:3 },
				{ project: 'Project 9', project_type: 'Project Type 2', deadline: '22/03/2020', student_id:2 },
				{ project: 'Project 10', project_type: 'Project Type 4', deadline: '22/03/2020', student_id:1 },
				{ project: 'Project 11', project_type: 'Project Type 2', deadline: '22/03/2020', student_id:1 },
				{ project: 'Project 12', project_type: 'Project Type 3', deadline: '22/03/2020', student_id:1 }
			]);
		});
};
