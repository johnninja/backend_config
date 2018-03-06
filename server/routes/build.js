const express = require('express');
const router = express.Router();
const webpack = require('webpack');
const config = require('../webpack.config.js');

router.post('/', (req, res, next) => {
	webpack(config, (err, stats) => {
		if (err) {
			res.json({code: 1, message: err.toString()});
		} else {
			res.json({
				code: 0,
				data: stats.toJson('minimal')
			})
		}
	})
});

module.exports = router;