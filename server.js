const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose
	.connect(process.env.MONGO_URI)
	.then((result) => {
		app.listen(process.env.PORT);
		console.log(
			`\x1b[36mserver started at http://localhost:${process.env.PORT}/`
		);
	})
	.catch((err) => console.log(err));

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
