const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

// Mongoose hook before user is saved to the db

UserSchema.pre('save', async function (next) {
	console.log('This is the user info before it is saved', this);
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	console.log('this is the user info after password is hashed');
	next();
});

// Static method to login user
UserSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });

	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		
		if(auth){
			return user
		}

		throw Error('Incorrect password')
	}
	throw Error('Incorrect Email');
};

const User = model('user', UserSchema);
module.exports = User;
