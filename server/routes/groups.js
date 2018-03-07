var express = require('express');
var router = express.Router();
var Group = require('../models/Group');

router.get('/', (req, res, next) => {

	Group.findOne({
		name: req.query.name,
	}).populate('charts', 'name').exec()
	.then(doc => {
		res.json({
			code: 0,
			data: doc
		})
	})
	.catch(err => {
		res.json({
			code: 1,
			message: err.toString()
		})
	})
});

router.get('/all', (req, res, next) => {

	let { page = 1, size = 20 } = req.params;
	let query = Group.find({},'-__v');
	query.populate('charts', '_id name')
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
	});

});

router.post('/', (req, res, next) => {
	var group = new Group({
		name: req.body.name,
		charts: req.body.charts
	});
	group
	.save()
	.then(doc => {
		Group.findOne(doc).populate('charts', '_id name')
		.exec()
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
	Group.findByIdAndUpdate(req.body.group._id, req.body.group, { new: true }, (err, doc) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			})
		}else {
			Group.findOne(doc).populate('charts', '_id name')
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
	Group.deleteOne({_id: req.body.id}, (err, doc) => {
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
