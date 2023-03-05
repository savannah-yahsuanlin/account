const express = require('express');
const app = express();
const people = require('./people');

app.use((req, res, next) => {
	console.log(`${req.method} - ${req.url}`)
	next()
})

app.use(express.static('public'))

app.get('/', (req, res, next) => {
	try {
		res.send(`
			<html>
				<head>
					<link rel="stylesheet" src="./public/styles.css" />
				</head>
				<body>
					<h1>Account</h1>
					<ul>
						${people.map(person => {
							return `
							<a href='/people/${person.id}'>${person.name}</a>
							`
						}).join('')}
					</ul>
				</body>
			</html>
		`)
	} catch (error) {
		next(error);
	}
})

app.get('/people/:id', (req, res) => {
	const person = people.find(person => person.id === req.params.id*1)
	if(person) {
		res.send(`
			<html>
				<head>
					<link rel='stylesheet' src='/styles.css' />
				</head>
				<body>
					<h3>${person.name}</h3>
					<a href="/">Back</a>
					<p>${person.bio}</p>
				</body>
			</html>
		`)
	} else {
		res.status(404).send(`
			<html>
				<body>
					No body found for ${req.params.id} <a href="/">Try again</a>
				</body>
			</html>
		`)
	}
})


const port = process.env.PORT || 3000
app.listen(port, () => {`listening on port ${port}`})