const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_Env || 'development';

module.exports = knex(config[dbEnv]);