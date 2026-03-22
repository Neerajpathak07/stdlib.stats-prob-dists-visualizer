const { betaPdf, chisquarePdf, poissonPmf } = require( '../stats/pdfs.js' );

function generate_data( dist_name, dist_type, params ) {
	let pdf;

	switch ( dist_name ) {
	case 'poisson':
		pdf = function( x, params ) {
			const lambda = params[ 0 ];
			return poissonPmf( x, lambda );
		};
		break;

	case 'beta':
		pdf = function( x, params ) {
			const alpha = params[ 0 ];
			const beta = params[ 1 ];
			return betaPdf( x, alpha, beta );
		};
		break;

	case 'chisquare':
		pdf = function( x, params ) {
			const dof = params[ 0 ];
			return chisquarePdf( x, dof );
		};
		break;

	default:
		throw new Error( 'Unknown distribution: ' + dist_name );
	}

	const data = [];
	let start;
	let stop;
	let step;

	const xRange = window.xRange;

	if ( dist_type === 'continuous' ) {
		step = ( xRange[ 1 ] - xRange[ 0 ] ) / 500;
		start = xRange[ 0 ] + step;
		stop = xRange[ 1 ] + step * 2;
	} else if ( dist_type === 'discrete' ) {
		start = xRange[ 0 ];
		stop = xRange[ 1 ] + 1;
		step = 1;
	}

	for ( let x = start; x < stop; x += step ) {
		data.push( [ x, pdf( x, params ) ] );
	}

	return data;
}

module.exports = { generate_data };
