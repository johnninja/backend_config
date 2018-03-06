var express = require('express');
var router = express.Router();
var Navigation = require('../models/Navigation');

router.get('/all', (req, res, next) => {
	let query = Navigation.find({},'-__v');
	query.exec((err, docs) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			});
		} else {
			res.json({
				code: 0,
				data: docs
			})
		}
	})
});

router.post('/', (req, res, next) => {
	var nav = new Navigation({
		title: req.body.title,
		path: req.body.path,
		children: req.body.children
	});
	nav
	.save()
	.then(doc => {
		Navigation.findOne(doc)
		.then(ret => {
			res.json({code: 0, data: ret});
		})
		.catch(err => {
			res.json({code: 1, message: err.toString()});
		})
	})
	.catch(err => {
		res.json({code: 1, message: err.toString()});
	})
});

router.put('/', (req, res, next) => {
	Navigation.findByIdAndUpdate(req.body.navigation._id, req.body.navigation, { new: true }, (err, doc) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			})
		}else {
			Navigation.findOne(doc)
			.then(ret => {
				res.json({
					code: 0,
					data: ret
				})
			})
			.catch(err => {
				res.json({code: 1, message: err.toString()});
			})
		}
	})
});

router.delete('/', (req, res, next) => {
	Navigation.deleteOne({_id: req.body.id}, (err, doc) => {
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

module.exports = router;