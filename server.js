const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('./routes/auth-route');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

mongoose
	.connect(process.env.MONGO_URI)
	.then((result) => {
		app.listen(process.env.PORT);
		console.log(
			`\x1b[36mserver started at\x1b[0m \x1b[91m http://localhost:${process.env.PORT}/ \x1b[0m \x1b[93m`
		);
	})
	.catch((err) => console.log(err));

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use('/', AuthRoutes);
