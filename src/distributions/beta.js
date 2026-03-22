const dist_name = 'beta';

const dist_type = 'continuous';

let params = [ 2, 2 ];

const xRange = [ 0, 1 ];
const yRange = [ 0, 2.5 ];

const slider_config = '2-sliders';

const slider_0 = document.getElementById( 'slider_0' );
const slider_1 = document.getElementById( 'slider_1' );

noUiSlider.create( slider_0, {
	start: params[ 0 ],
	step: 0.01,
	tooltips: true,
	range: {
		'min': 0.1,
		'max': 5
	}
} );

noUiSlider.create( slider_1, {
	start: params[ 1 ],
	step: 0.01,
	tooltips: true,
	range: {
		'min': 0.1,
		'max': 5
	}
} );

window.dist_name = 'beta';
window.dist_type = 'continuous';
window.params = params;
window.xRange = xRange;
window.yRange = yRange;
window.slider_config = slider_config;
window.slider_0 = slider_0;
window.slider_1 = slider_1;
