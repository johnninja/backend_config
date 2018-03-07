const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	title: String,
	disabled: {
		type: Boolean,
		default: false
	},
	charts: [{type: Schema.Types.ObjectId, ref: 'chart'}],
	create_time: {
		type: Date,
		default: Date.now
	}
});

module.exports = groupSchema;