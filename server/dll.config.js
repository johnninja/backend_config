const webpack = require('webpack');
const path = require('path');
const vendors = [
	'react',
	'react-dom',
	'react-router',
	'react-addons-css-transition-group',
	'echarts/lib/echarts',
	'echarts/lib/chart/bar',
	'echarts/lib/chart/line',
	'echarts/lib/chart/pie',
	'echarts/lib/component/tooltip',
	'echarts/lib/component/title',
	'echarts/lib/component/grid',
	'echarts/lib/component/legend',
	'echarts/lib/component/dataZoom',
	'echarts/lib/component/markLine',
	'echarts/lib/component/toolbox',
	'moment'
];

module.exports = {
	output: {
		path: path.resolve('./','./dist/static'),
		filename: 'lib.js',
		library: '[name]_[hash]'
	},
	entry: {
		'lib': vendors
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
                NODE_ENV: JSON.stringify("production")
            }
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]_[hash]',
			context: __dirname
		})
	]
}