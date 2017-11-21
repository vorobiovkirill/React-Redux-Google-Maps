const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

	entry: './src/scripts/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '/',
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

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		inline: true,
		open: true,
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: false,
			publicPath: false,
		},
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

		new webpack.optimize.ModuleConcatenationPlugin(),

		new ExtractTextPlugin({
			filename: 'css/style.[hash].css',
		}),

		new HtmlWebpackPlugin({
			title: 'My React App!!!!',
			template: './src/index.html.ejs',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),

		new webpack.HotModuleReplacementPlugin(),
	],

};

module.exports = config;
