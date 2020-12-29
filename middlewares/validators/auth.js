const { body } = require('express-validator');

const register = [
	body('name', 'name field is required.').notEmpty(),
	body('email', 'email must be a valid email address.').isEmail(),
	body('password', 'password must be at least 6 digits.').isLength({
		min: 6
	}),
	body('confirm_password', 'confirm password field is required').notEmpty()
];

const login = [
	body('email', 'email field is required').notEmpty(),
	body('password', 'password field is required.').notEmpty()
];

module.exports = {
	register,
	login
};
