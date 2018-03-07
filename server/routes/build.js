const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const Page = require('../models/Page');

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

router.post('/page', (req, res, next) => {
	Page.find({ disabled: false }, (err, docs) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			})
		} else {
			docs.forEach(item => {

			});
		}
	});
})



module.exports = router;