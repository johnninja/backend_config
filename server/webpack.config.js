const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');

var browserConfig = {
	entry: {
		bundle: './client/index.js'
	},
	output: {
		path: path.resolve('./','./dist/static'),
		filename: 'main.[hash].js',
	},
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
				include: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader'
					}
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
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: './manifest.json'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			"process.env": {
                NODE_ENV: JSON.stringify("production")
            }
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		// new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			title: 'Boxfish DiGi Base',
			filename: '../index.html',
			template: './client/template.html'
		}),
		new CleanWebpackPlugin(
			['dist/static/main.*.js'],
			{
				root: __dirname,
				verbose: true,
				dry: false
			}
		)
	],
	resolve: {
		enforceExtension: false
	}
}

module.exports = browserConfig;