const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: {
		index: './src/entries/index.js',
		beta: './src/entries/beta.js',
		chisquare: './src/entries/chisquare.js',
		poisson: './src/entries/poisson.js'
	},
	mode: 'production',
	optimization: {
		minimize: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: './src/index.html',
			filename: 'index.html',
			chunks: [ 'index' ]
		} ),
		new HtmlWebpackPlugin( {
			template: './src/beta.html',
			filename: 'beta.html',
			chunks: [ 'beta' ]
		} ),
		new HtmlWebpackPlugin( {
			template: './src/chisquare.html',
			filename: 'chisquare.html',
			chunks: [ 'chisquare' ]
		} ),
		new HtmlWebpackPlugin( {
			template: './src/poisson.html',
			filename: 'poisson.html',
			chunks: [ 'poisson' ]
		} )
	],
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'dist' ),
		clean: true
	}
};
