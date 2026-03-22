const dist_name = 'chisquare';

const dist_type = 'continuous';

let params = [ 1 ];

const xRange = [ 0, 16 ];
const yRange = [ 0, 0.5 ];

const slider_config = '1-slider';

const slider_0 = document.getElementById( 'slider_0' );

noUiSlider.create( slider_0, {
	start: params[ 0 ],
	step: 1,
	tooltips: wNumb( { decimals: 0 } ),
	range: {
		'min': 1,
		'max': 12
	}
} );

window.dist_name = 'chisquare';
window.dist_type = 'continuous';
window.params = params;
window.xRange = xRange;
window.yRange = yRange;
window.slider_config = slider_config;
window.slider_0 = slider_0;
window.slider_1 = undefined;
