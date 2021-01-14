
import * as d3 from 'd3';
import { ReplaceStencilOp } from 'three';

const url ="https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class ProjeProjection2DD3 {
    constructor(element){
        const width=300
        const height=200
        const svg = d3.select(element)
                    .append("svg")
                    .attr("width",400)
                    .attr("height",240)

                    d3.csv(url).then(data => {

                        // Add X axis
                        var x = d3.scaleLinear()
                          .domain([0, 4000])
                          .range([ 0, width ]);
                        svg.append("g")
                          .attr("transform", "translate(0," + height + ")")
                          .call(d3.axisBottom(x));
                      
                        // Add Y axis
                        var y = d3.scaleLinear()
                          .domain([0, 500000])
                          .range([ height, 0]);
                        svg.append("g")
                          .call(d3.axisLeft(y));
                      
                        // Add dots
                        svg.append('g')
                          .selectAll("dot")
                          .data(data)
                          .enter()
                          .append("circle")
                            .attr("cx", function (d) { return x(d.GrLivArea); } )
                            .attr("cy", function (d) { return y(d.SalePrice); } )
                            .attr("r", 1.5)
                            .style("fill", "#69b3a2")
                      
                      })

  }
}

