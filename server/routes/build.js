const express = require('express');
const router = express.Router();
const writeFile = require('write');
const path = require('path');
const endOfLine = require('os').EOL;
const decamelize = require('decamelize');

const webpack = require('webpack');
const config = require('../webpack.config.js');
const Page = require('../models/Page');


const genAction = require('../build/actions.js');
const genActionTypes = require('../build/actionTypes.js');
const genComponents = require('../build/components.js');
const genGroups = require('../build/groups.js');
const genIndex = require('../build/index.js');
const genReducers = require('../build/reducers.js');

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
	var action, actionTypes, components, index, reducers, groups = [];
	var query = Page.findById(req.query.id);
	query.populate({
		path: 'groups',
		populate: {
			path: 'charts'
		}
	})
	query.exec((err, doc) => {
		if (err) {
			res.json({
				code: 1,
				message: err.toString()
			});
		} else {

			action = genAction(doc);
			actionTypes = genActionTypes(doc);
			components = genComponents(doc);
			index = genIndex(doc);
			reducers = genReducers(doc);

			doc.groups.forEach(group => {
				let groupTemp = genGroups(group);

				groups.push({
					name: decamelize(group.name),
					template: groupTemp
				});
			});

			let pathName = `./client/views/${decamelize(doc.name)}`;

			writeFile(path.resolve(pathName, './actions.js'), action, handleErr);
			writeFile(path.resolve(pathName, './actionTypes.js'), actionTypes, handleErr);
			writeFile(path.resolve(pathName, './reducers.js'), reducers, handleErr);
			writeFile(path.resolve(pathName, './index.js'), index, handleErr);
			writeFile(path.join(pathName, 'components', 'index.js'), components, handleErr);

			groups.forEach(group => {
				writeFile(path.join(pathName, 'components',  `${group.name}.js`), group.template, handleErr);
			});
			
			res.json({
				code: 0,
				message: 'success'
			});
		}
	});

})

function handleErr(err) {
	if (err) {
		console.log(err)
	}
}


module.exports = router;