var express = require('express');
var router = express.Router();
var Page = require('../models/Page');

router.get('/all', (req, res, next) => {

	let query = Page.find({},'-__v');
	query.populate({
		path: 'groups',
		select: ['_id', 'name'],
		populate: {
			path: 'charts',
			select: ['_id', 'name']
		}
	})
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
	var page = new Page({
		name: req.body.name,
		groups: req.body.groups
	});
	page
	.save()
	.then(doc => {
		Page.findOne(doc).populate('groups', '_id name')
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
	Page.findByIdAndUpdate(req.body.page._id, req.body.page, { new: true }, (err, doc) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			})
		}else {
			Page.findOne(doc).populate('groups', '_id name')
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
	Page.deleteOne({_id: req.body.id}, (err, doc) => {
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

// router.post('/build', (req, res, next) => {
// 	Page.findOne({_id: req.body.id}, (err, doc) => {
// 		if (err) {
// 			res.json({
// 				code: 1,
// 				message: err.toString()
// 			})
// 		} else {

// 		}
// 	});
// });

module.exports = router;
