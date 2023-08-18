const express = require('express');
const User = require('../models/User');

// This is a function to handle errors during signup
const handleError = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	// Duplicate error code 
	if(err.code === 11000){
		errors.email = 'That email has already been registered'
		return errors
	}


	// Validation error
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

const signup_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({
			email,
			password,
		});
		console.log(user);
		res.status(200).json(user);
	} catch (err) {
		let errors = handleError(err);
		res.status(400).json({ errors });
	}
};
const signup_get = (req, res) => {
	res.render('signup');
};
const login_post = (req, res) => {
	const { email } = req.body;
	console.log(email);
	res.json(email);
};

const login_get = (req, res) => {
	res.render('login');
};

module.exports = { signup_get, login_get, signup_post, login_post };
