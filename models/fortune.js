const mongoose = require('mongoose');

const fortuneSchema = new mongoose.Schema({
	message: String,
});

const Fortune = mongoose.model('Fortune', fortuneSchema);

module.exports = Fortune;
