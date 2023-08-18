const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [5, 'Password must be 5 characters or more'],
	},
});

const User = model('user', UserSchema);
module.exports = User;
