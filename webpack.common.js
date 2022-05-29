const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: { main: './scripts/index.js' },
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource',
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './index.html' }),
	]
};
