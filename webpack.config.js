const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/js/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'static/js')
	}
};
