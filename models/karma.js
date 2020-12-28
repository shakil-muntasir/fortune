const mongoose = require('mongoose');

const karmaSchema = new mongoose.Schema({
    quote: String,
    said_by: String
});

const Karma = mongoose.model('Karma', karmaSchema);

module.exports = Karma;