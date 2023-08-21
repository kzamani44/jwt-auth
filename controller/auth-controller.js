const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This is a function to handle errors during signup
const handleError = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	// Duplicate error code
	if (err.code === 11000) {
		errors.email = 'This email has already been registered';
		return errors;
	}

	// Validation error
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

// Create Token to keep track user Login
const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_KEY, {
		expiresIn: '30m',
	});
};

const signup_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({
			email,
			password,
		});

		const token = createToken(user._id);
		res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 30 });
		res.status(201).json({ user: user._id });
	} catch (err) {
		let errors = handleError(err);
		res.status(400).json({ errors });
	}
};
const signup_get = (req, res) => {
	res.render('signup');
};
const login_post = async (req, res) => {
	const { email,password } = req.body;
	console.log(email);

	try{
		const user = await User.login(email,password)

		res.status(200).json({user:user._id})
	}catch(error){
		res.status(400).json({})
	}
	res.json(email);
};

const login_get = (req, res) => {
	res.render('login');
};

module.exports = { signup_get, login_get, signup_post, login_post };
