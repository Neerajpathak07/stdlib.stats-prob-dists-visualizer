const width = 750;
const height = 400;
const margin = { top: 40, right: 40, bottom: 44, left: 72 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const dist_type = window.dist_type;
const dist_name = window.dist_name;
const xRange = window.xRange;
const yRange = window.yRange;

const svg = d3.select("#chart")
              .append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale;

if (dist_type == "continuous") {
    xScale = d3.scaleLinear()
        .domain(xRange)
        .range([0, innerWidth]);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale)
        );
}
else if (dist_type == "discrete") {

    xScale = d3.scaleBand()
    .domain(d3.range(xRange[1]+1))
    .rangeRound([0, innerWidth], 0.1)
    .paddingInner(0.4);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale)
            .tickValues(d3.range(xRange[0], xRange[1]+1, (xRange[1] - xRange[0] > 20) ? 5 : 1))
        );
}

const yScale = d3.scaleLinear()
        .domain(yRange)
        .range([innerHeight, 0]);

svg.append("g")
    .attr("class", "y-axis")    
    .call(d3.axisLeft(yScale)
        .ticks(5)
    );

const svgOuter = d3.select("#chart").select("svg");

let xAxisLabel = "x";
let yAxisLabel = "Probability density";
if (dist_type === "discrete") {
	yAxisLabel = "Probability mass";
	if (dist_name === "poisson") {
		xAxisLabel = "k";
	} else {
		xAxisLabel = "x";
	}
}

svgOuter.append("text")
	.attr("class", "axis-label axis-label-x")
	.attr("x", margin.left + innerWidth / 2)
	.attr("y", height - 10)
	.attr("text-anchor", "middle")
	.text(xAxisLabel);

svgOuter.append("text")
	.attr("class", "axis-label axis-label-y")
	.attr("transform", "translate(" + (margin.left * 0.28) + "," + (margin.top + innerHeight / 2) + ") rotate(-90)")
	.attr("text-anchor", "middle")
	.text(yAxisLabel);

window.__chart = {
	svg,
	xScale,
	yScale,
	innerHeight,
	innerWidth
};