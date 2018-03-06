const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chartSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	api: String,
	option: String,
	disabled: {
		type: Boolean,
		default: false
	},
	create_time: {
		type: Date,
		default: Date.now
	}
});

module.exports = chartSchema;