const mongoose = require('mongoose');
const config = require('./db');
module.exports = () => {
	mongoose.connect(config.uri);

	const db = mongoose.connection;

	db.on('error', err => {
		console.log('连接错误：', err);
	});
	db.once('open', callback => {
		console.log('连接数据库成功.');
	});

	return db;
}