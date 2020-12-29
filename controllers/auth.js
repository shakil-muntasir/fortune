const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const store = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { name, email, password, confirm_password } = req.body;

	const duplicate = await User.find({ email });

	if (duplicate.length > 0) {
		return res
			.status(422)
			.json({ errors: [{ msg: 'email already taken.' }] });
	}

	if (password !== confirm_password) {
		return res
			.status(422)
			.json({ errors: [{ msg: 'password does not match.' }] });
	}

	const salt = await bcrypt.genSalt();

	const encryptedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: encryptedPassword,
	});

	const apiToken = await jwt.sign(
		{
			user: {
				id: user.id,
				email: user.email,
			},
		},
		process.env.JWT_SECRET,
		{
			expiresIn: 60 * 60,
		}
	);

	return res.status(200).json({
		success: [
			{
				msg: 'user successfully created.',
				token: apiToken,
			},
		],
	});
};

module.exports = {
	store,
};
