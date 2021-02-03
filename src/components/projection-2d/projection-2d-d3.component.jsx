
import * as d3 from 'd3';
import { ReplaceStencilOp } from 'three';

const url ="https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class ProjeProjection2DD3 {
    scatterplot = (data, domainData, xDomain, yDomain, element) => {
        d3.select(element).select('svg').remove()
        const width = d3.select(element).node().clientWidth;
        // console.log(d3.select(element).node())
        // console.log(width)
        const height = d3.select(element).node().clientHeight;

        const margin = {left: 40, right: 10, top:20, bottom:20}
        // console.log(height)
        const svg = d3.select(element)
                    .append("svg")
                    .attr("width",width)
                    .attr("height",height)
        let tempColor = ["#fff5f0","#67000d"]
        // console.log(domainData)
        let color  = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([domainData.min, domainData.max])
                        .range(tempColor);
        let x  = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([xDomain.min, xDomain.max])
                        .range([ margin.left , width - margin.right ]);
        let xAxis = d3.axisBottom()
                      .scale(x)
                      // .ticks(5);

        let y  = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([yDomain.min, yDomain.max])
                        .range([ height - margin.bottom, margin.top]);

        let yAxis = d3.axisLeft()
                      .scale(y)

        svg.append("g")
            .attr("transform", "translate(0," + (height -margin.top) + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis);
                      
        // Add dots
        svg.append('g')
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.x); } )
            .attr("cy", function (d) { return y(d.y); } )
            .attr("r", 0.5)
            .style("fill", function(d){ return color(d.temp)})

  }
}

