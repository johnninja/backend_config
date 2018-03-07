const express = require('express');
const router = express.Router();
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.dev.js');

router.post('/:cmd', (req, res, next) => {
	let compiler = webpack(config);
	let server = new WebpackDevServer(compiler, {
		hot: true,
		publicPath: '/'
	});
	if (req.params.cmd == 'start') {
		server.listen(9001, 'localhost', function (err) {
			if (err) {
				res.json({
					code: 1,
					message: err.toString()
				})
			} else {
				res.json({
					code: 0,
					message: 'Test server worked on port: 9001'
				})
			}
		})
	}
});

module.exports = router;