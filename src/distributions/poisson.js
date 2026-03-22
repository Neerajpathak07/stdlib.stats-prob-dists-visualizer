const dist_name = 'poisson';

const dist_type = 'discrete';

let params = [ 4 ];

const xRange = [ 0, 20 ];
const yRange = [ 0, 0.5 ];

const slider_config = '1-slider';

const slider_0 = document.getElementById( 'slider_0' );

noUiSlider.create( slider_0, {
	start: params[ 0 ],
	step: 0.1,
	tooltips: wNumb( { decimals: 1 } ),
	range: {
		'min': 0.8,
		'max': 15
	}
} );

window.dist_name = 'poisson';
window.dist_type = 'discrete';
window.params = params;
window.xRange = xRange;
window.yRange = yRange;
window.slider_config = slider_config;
window.slider_0 = slider_0;
window.slider_1 = undefined;
