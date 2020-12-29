const Karma = require('../models/karma');

const index = async (req, res) => {
	const karmaData = await Karma.find();

	return res.status(200).json(karmaData);
};

const show = async (req, res) => {
	const karmaData = await Karma.aggregate([{ $sample: { size: 1 } }]);

	return res.status(200).json(karmaData);
};

module.exports = {
	index,
	show
};
