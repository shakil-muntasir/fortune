const jwt = require('jsonwebtoken');

const authAPI = (req, res, next) => {
	try {
		const token = req.header('Authorization').split('Bearer ')[1];

		if (!token) throw new Error();

		const verified = jwt.verify(token, process.env.JWT_SECRET);

		if (!verified) throw new Error();

		req.user = verified.user;

		next();
	} catch (err) {
		return res.status(401).json({ msg: 'Unauthenticated.' });
	}
};

module.exports = authAPI;
