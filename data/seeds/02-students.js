exports.seed = function(knex) {
	return knex('students').insert([
		{
			student_fname: 'John',
			student_lname: 'Doe',
			student_email: 'john.doe@email.com',
			user_id: 1
		},
		{
			student_fname: 'Jane',
			student_lname: 'Doe',
			student_email: 'jane.doe@email.com',
			user_id: 2
		},
		{
			student_fname: 'Mark',
			student_lname: 'Smith',
			student_email: 'mark.smith@email.com',
			user_id: 3
		},
		{
			student_fname: 'Adam',
			student_lname: 'Stephens',
			student_email: 'adam.stephens@email.com',
			user_id: 1
		},
		{
			student_fname: 'Chloe',
			student_lname: 'Chin',
			student_email: 'chloe.chin@email.com',
			user_id: 1
		},
		{
			student_fname: 'Rebecca',
			student_lname: 'McVean',
			student_email: 'rebecca.mcvean@email.com',
			user_id: 2
		},
		{
			student_fname: 'Katy',
			student_lname: 'Bell',
			student_email: 'katy.bell@email.com',
			user_id: 4
		}
	]);
};
