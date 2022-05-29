const merge = require('webpack-merge').merge;
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin()
	]
});
