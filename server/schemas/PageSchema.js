const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pageSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
	},
	path_name: String,
	path: String,
	node: String,
	disabled: {
		type: Boolean,
		default: false
	},
	groups: [{type: Schema.Types.ObjectId, ref: "group"}],
	create_time: {
		type: Date,
		default: Date.now
	}
});

module.exports = pageSchema;