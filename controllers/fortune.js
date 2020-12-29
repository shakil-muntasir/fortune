const { validationResult } = require('express-validator');

const Fortune = require('../models/fortune');

const index = async (req, res) => {
	const fortuneData = await Fortune.find();

	return res.status(200).json(fortuneData);
};

const show = async (req, res) => {
	const fortuneData = await Fortune.aggregate([{ $sample: { size: 1 } }]);

	return res.status(200).json(fortuneData);
};

const store = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { message } = req.body;

	const fortune = await Fortune.create({ message });

	return res.status(200).json(fortune);
};

module.exports = {
	index,
	store,
	show,
};
