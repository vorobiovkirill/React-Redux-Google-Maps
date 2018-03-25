const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {

	devtool: 'cheap-module-eval-source-map',

	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		'./src/scripts/index.js',
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '/assets/',
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.css', '.sass', '.scss', '.html'],
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader'],
				}),
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /node_modules/,
				use: 'file-loader?name=[path][name].[ext]?[hash]',
			},
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				exclude: /node_modules/,
				use: 'file-loader?limit=100000&name=assets/[name].[hash:8].[ext]',
			},
		],
	},

	plugins: [

		/**
		 * @link https://webpack.js.org/plugins/hot-module-replacement-plugin/
		 */
		new webpack.HotModuleReplacementPlugin(),

		/**
		 * @link https://webpack.js.org/plugins/no-emit-on-errors-plugin/
		 */
		new webpack.NoEmitOnErrorsPlugin(),

		/**
		 * @link https://webpack.js.org/plugins/ignore-plugin/
		 */
		new webpack.IgnorePlugin(/\.json$/),

		new webpack.optimize.ModuleConcatenationPlugin(),

		/**
		 * @link https://github.com/webpack-contrib/extract-text-webpack-plugin
		 */
		new ExtractTextPlugin({
			filename: 'css/style.[hash].css',
		}),

		/**
		 * @link https://webpack.js.org/plugins/define-plugin/
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			__DEVELOPMENT__: true,
			__PRODUCTION__: false,
		}),

		/**
		 * @link https://www.npmjs.com/package/open-browser-webpack-plugin
		 */
		new OpenBrowserPlugin({
			url: 'localhost:3000',
		}),
	],

};

module.exports = config;
