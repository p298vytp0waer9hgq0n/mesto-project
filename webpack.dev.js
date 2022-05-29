const merge = require('webpack-merge').merge;
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
	devServer: {
		static: path.resolve(__dirname, './dist'),
		compress: true,
		port: 8080,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
});
