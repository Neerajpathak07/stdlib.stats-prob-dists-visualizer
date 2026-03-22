require( './chart_config.js' );
const { generate_data } = require( './rand.js' );

let path;
let bars;

function chart() {
	return window.__chart;
}

function update_chart( dist_name, dist_type, params ) {
	d3.selectAll( '.bar, .line' ).remove();

	if ( dist_type === 'discrete' ) {
		plot_bars( dist_name, dist_type, params );
		mouseover_bars();
	} else if ( dist_type === 'continuous' ) {
		plot_line( dist_name, dist_type, params );
	}
}

function plot_bars( dist_name, dist_type, params ) {
	const { svg, xScale, yScale, innerHeight } = chart();
	const data = generate_data( dist_name, dist_type, params );

	bars = svg.selectAll( 'bar' )
		.data( data )
		.enter()
		.append( 'rect' )
		.attr( 'class', 'bar' )
		.attr( 'x', d => xScale( d[ 0 ] ) )
		.attr( 'width', xScale.bandwidth() )
		.attr( 'y', d => yScale( d[ 1 ] ) )
		.attr( 'height', d => innerHeight - yScale( d[ 1 ] ) );
}

function mouseover_bars() {
	bars.on( 'mouseover', function() {
		d3.select( this )
			.style( 'fill', '#b30000' );
	} )
		.on( 'mouseout', function() {
			d3.select( this )
				.style( 'fill', 'red' );
		} );
}

function plot_line( dist_name, dist_type, params, ref = false ) {
	const { svg, xScale, yScale } = chart();
	const data = generate_data( dist_name, dist_type, params );

	const line = d3.line()
		.defined( d => Number.isFinite( d[ 0 ] ) && Number.isFinite( d[ 1 ] ) )
		.x( d => xScale( d[ 0 ] ) )
		.y( d => yScale( d[ 1 ] ) );

	if ( ref === false ) {
		path = svg.append( 'path' )
			.attr( 'class', 'line' )
			.datum( data )
			.attr( 'd', line );
	} else {
		path = svg.append( 'path' )
			.attr( 'class', 'line_reference' )
			.datum( data )
			.attr( 'd', line );
	}
}

function initial_transition( dist_name, dist_type, params ) {
	const { svg, xScale, yScale, innerHeight } = chart();
	d3.selectAll( '.bar, .bar-value' ).remove();
	d3.selectAll( '.mean' ).remove();

	update_chart( dist_name, dist_type, params );

	if ( dist_type === 'discrete' ) {
		bars.attr( 'y', innerHeight )
			.attr( 'height', 0 )
			.transition()
			.duration( 700 )
			.delay( ( d, i ) => i * 50 )
			.attr( 'y', d => yScale( d[ 1 ] ) )
			.attr( 'height', d => innerHeight - yScale( d[ 1 ] ) )
			.on( 'end', function() { update_bar_values( dist_name, params ); } );
	} else if ( dist_type === 'continuous' ) {
		const totalLength = path.node().getTotalLength();
		if ( !Number.isFinite( totalLength ) || totalLength < 0.5 ) {
			path.attr( 'stroke-dasharray', null ).attr( 'stroke-dashoffset', null );
			update_aid_lines( dist_name, params );
		} else {
			path.attr( 'stroke-dasharray', totalLength + ' ' + totalLength )
				.attr( 'stroke-dashoffset', totalLength )
				.transition()
				.duration( 1000 )
				.ease( d3.easeLinear )
				.attr( 'stroke-dashoffset', 0 )
				.on( 'end', function() { update_aid_lines( dist_name, params ); } );
		}
	}
}

function update_bar_values( dist_name, params ) {
	const { svg, xScale, yScale } = chart();
	d3.selectAll( '.bar-value' ).remove();

	const data = generate_data( dist_name, window.dist_type, params );

	svg.selectAll( 'text.bar' )
		.data( data )
		.enter()
		.append( 'text' )
		.attr( 'class', 'bar-value' )
		.attr( 'text-anchor', 'middle' )
		.attr( 'x', d => xScale( d[ 0 ] ) + xScale.bandwidth() / 2 )
		.attr( 'y', d => yScale( d[ 1 ] ) - 8 )
		.text( d => {
			if ( d[ 1 ] > 0 ) {
				return '.' + d[ 1 ].toFixed( 3 ).toString().split( '.' )[ 1 ];
			}
		} );
}

function update_aid_lines( _dist_name, _params ) {
}

module.exports = {
	update_chart,
	initial_transition,
	update_aid_lines,
	update_bar_values
};
