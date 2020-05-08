const express = require('express');
	const projectsRouter = require('./routers/projectsRouter')
	const actionsRouter = require('./routers/actionsRouter')
	const server = express();
	server.use(express.json());//can put logger in here if we want


	server.get('/', (req, res) => {
	  res.send(`<h2>server is up and going</h2>`);
	});

	//custom middleware just making a change for lambda forms

	// function logger(req, res, next) {
	//   console.log(`[${new Date().toISOString()}]: ${req.method} : http://localhost:4444${req.url}`)
	//   next()
	// }

	server.use('/api/projects', projectsRouter)
	server.use('/api/actions', actionsRouter)
	module.exports = server;