var webpack = require('webpack');
var path = require('path');
// var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

var config = {
	entry: [
		'react-hot-loader/patch', 
		// 'webpack-dev-server/client?http://0.0.0.0:3001',
		'webpack/hot/only-dev-server',
		'./client/index.js'
	],
	output: {
		filename: 'main.bundle.js',
		publicPath: '/'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				use: [
					'babel-loader'
				],
				exclude: /^node_modules$/,
				include: path.resolve('client')
			},
			{
				test: /\.css$/,
				include: /node_modules|semantic/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules|semantic/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				],
			},
			{
				test: /\.(png|jpg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 20000
						}
					}
				]
			},
			{
				test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
				exclude: /node_modules/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: './manifest.json'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
                NODE_ENV: JSON.stringify("development")
            }
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve: {
		enforceExtension: false,
		alias: {
			images: path.resolve(__dirname, 'dist/images')
		}
	}
}
module.exports = config;
