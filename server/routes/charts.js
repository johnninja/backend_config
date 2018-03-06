var express = require('express');
var router = express.Router();
var Chart = require('../models/Chart');

router.get('/', (req, res, next) => {

	Chart.findOne({
		name: req.query.name,
	}, (err, doc) => {

		if (err) {
			res.send('server or db error');
		} else {
			if (doc == null) {
				res.json({
					code: 1,
					message: '没有查到'
				});
			} else {
				res.json({
					code: 0,
					data: doc
				});
			}
		}

	});
});

router.get('/all', (req, res, next) => {

	let { page, size } = req.params;
	let query = Chart.find({},'-__v');
	query.exec((err, docs) => {
		if (err) {
			res.json({
				code: 1,
				message: err
			});
		} else {

			res.json({
				code: 0,
				data: docs
			})
		}
	});

});

router.post('/', (req, res, next) => {
	var chart = new Chart({
		name: req.body.name,
		api: req.body.api,
		option: req.body.option,
	});
	chart.save((err, doc) => {
		if (err) {
			console.log(err);
			res.json({code: 1, message: err});
		} else {
			console.log('添加成功!');
			res.json({code: 0, data: doc});
		}
	});
});

router.put('/', (req, res, next) => {
	Chart.findByIdAndUpdate(req.body.chart._id, req.body.chart, { new: true }, (err, doc) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			})
		}else {
			res.json({
				code: 0,
				data: doc
			})
		}
	})
});

router.delete('/', (req, res, next) => {
	Chart.deleteOne({_id: req.body.id}, (err, doc) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			})
		}else {
			res.json({
				code: 0,
				data: doc
			})
		}
	})
})

module.exports = router;