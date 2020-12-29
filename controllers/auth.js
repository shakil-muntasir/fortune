const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const register = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { name, email, password, confirm_password } = req.body;

	const duplicateUser = await User.findOne({ email });

	if (duplicateUser) {
		return res.status(422).json({ errors: [{ msg: 'email already taken.' }] });
	}

	if (password !== confirm_password) {
		return res.status(422).json({ errors: [{ msg: 'password does not match.' }] });
	}

	try {
		const user = new User({
			name,
			email,
			password
		});

		user.password = await bcrypt.hash(password, 10);

		await user.save();

		const payload = { user: { id: user.id, email: user.email } };

		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

		return res.status(200).json({
			user: {
				name: user.name,
				email: user.email,
				token
			}
		});
	} catch (err) {
		return res.sendStatus(500);
	}
};

const login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(422).json({ errors: [{ msg: 'invalid credentials.' }] });
		}

		const matched = await bcrypt.compare(password, user.password);

		if (!matched) {
			return res.status(422).json({ errors: [{ msg: 'invalid credentials.' }] });
		}

		const payload = { user: { id: user.id, email: user.email } };

		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

		return res.status(200).json({
			user: {
				name: user.name,
				email: user.email,
				token
			}
		});
	} catch (err) {
		return res.sendStatus(500);
	}
};

module.exports = {
	register,
	login
};
