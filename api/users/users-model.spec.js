const db = require('../../data/db');
const User = require('./users-model');

beforeAll(async () => {
	await db('users').truncate();
});

describe('users-model', () => {
	describe('add(user)', () => {
		it('should insert user into the db and then return the new user', async () => {
			const initialUsers = await db('users');

			const user1 = await User.insert({ username: 'user1', password: '12345' });
			const user2 = await User.insert({ username: 'user2', password: '54321' });

			const updatedUsers = await db('users');
			expect(updatedUsers).toHaveLength(initialUsers.length + 2);
			expect(user1).toEqual({ id: 1, username: 'user1', password: '12345' });
			expect(user2).toEqual({ id: 2, username: 'user2', password: '54321' });
		});

		it('should not insert user if the provided user contains incorrect data and should return an error message', async () => {
			try {
				await User.insert({ name: 'Not A User' });
			} catch (err) {
				expect(err.message).toEqual(
					"insert into `users` (`name`) values ('Not A User') - SQLITE_ERROR: table users has no column named name"
				);
			}
		});
	});

	describe('get()', () => {
		it('should return an array of users', async () => {
			const usersArray = await User.get();
			expect(Array.isArray(usersArray)).toBe(true);
			expect(usersArray[0]).toEqual({
				id: 1,
				username: 'user1',
				password: '12345'
			});
			expect(usersArray[1]).toEqual({
				id: 2,
				username: 'user2',
				password: '54321'
			});
		});
	});

	describe('getBy(filter)', () => {
		it('should return the first user which matches the filter', async () => {
			let user = await User.getBy({ username: 'user1' });
			expect(user).toEqual({ id: 1, username: 'user1', password: '12345' });

			user = await User.getBy({ password: '12345' });
			expect(user).toEqual({ id: 1, username: 'user1', password: '12345' });
		});

		it('should return an error message if the provided user contains bad data', async () => {
			try {
				await User.getBy({ name: 'Not A User' });
			} catch (err) {
				expect(err.message).toEqual(
					"select * from `users` where `name` = 'Not A User' limit 1 - SQLITE_ERROR: no such column: name"
				);
			}

			try {
				await User.getBy('user1');
			} catch (err) {
				expect(err.message).toEqual(
					'The operator "undefined" is not permitted'
				);
			}
		});
	});

	describe('getById(id)', () => {
		it('should return the user that matches the provided ID', async () => {
			const user1 = await User.getById(1);
			const user2 = await User.getById(2);

			expect(user1).toEqual({ id: 1, username: 'user1', password: '12345' });
			expect(user2).toEqual({ id: 2, username: 'user2', password: '54321' });
		});

		it('should return _undefined_ if the provided ID does not match a record in the database', async () => {
			const user = await User.getById(3);
			expect(user).toEqual(undefined);
		});
	});
});
