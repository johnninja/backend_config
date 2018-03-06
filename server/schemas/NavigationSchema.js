const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let navSchema = new Schema({
	title: String,
	path: String,
	children: [{type: Schema.Types.ObjectId, ref: 'page'}],
	create_time: {
		type: Date,
		default: Date.now
	}
});

module.exports = navSchema;