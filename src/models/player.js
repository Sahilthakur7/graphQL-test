const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
	name: String,
	position: String,
	teamId: String,
});

module.exports = mongoose.model('Player', PlayerSchema);