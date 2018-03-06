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
	path: String,
	node: String,
	group_ids: [{type: Schema.Types.ObjectId, ref: "group"}],
	create_time: {
		type: Date,
		default: Date.now
	}
});

module.exports = pageSchema;