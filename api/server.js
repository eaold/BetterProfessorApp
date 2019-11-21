require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const studentsRouter = require('./students/students-router');
const projectsRouter = require('./projects/projects-router');
const messagesRouter = require('./messages/messages-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/students', studentsRouter);
server.use('/api/projects', projectsRouter);
//server.use('/api/messages', messagesRouter);

server.get('/', (req, res) => {
	res.send(`<h1>Welcome to Better Professor App API</h1>`);
});

module.exports = server;