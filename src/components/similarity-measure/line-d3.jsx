import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';



export default class LineD3{
    constructor(element, data, xDomain, yDomain, tID, time, folder){
        this.element = element;
        this.data = data;
        this.xDomain = xDomain;
        this.yDomain = yDomain;
        this.tID = tID;
        this.time = time;
        this.folder = folder

        this.drawLine(this.element, this.data, this.xDomain, this.yDomain, this.tID, this.time, this.folder);
    }

    drawLine(el, shape, xD, yD, tID, time, folder){
        // console.log(shape)
        let margin = {top: 10, right: 37, bottom: 30, left: 60}
        // console.log(d3.select(el).node().parentNode)
        const width = d3.select(el).node().parentNode.clientWidth - margin.left - margin.right;
        const height = d3.select(el).node().parentNode.clientHeight - margin.top - margin.bottom;

        let svg = d3.select(el)
            .append('svg')
            .attr('id', `shape${tID}svg`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
                .domain([0, xD.max])
                .range([ 0, width ]);
        svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr('class', 'axes')
                .call(d3.axisBottom(x));
          
              // Add Y axis
        var y = d3.scaleLinear()
                .domain([yD.min, yD.max])
                .range([ height, 0 ]);

        svg.append("g")
                .attr('class', 'axes')
                .call(d3.axisLeft(y));

        // console.log(y(-3.9933))
        // console.log(y(-3.3916))
        let line = d3.line()
                .x(function(d) { return x(d.X) })
                .y(function(d) { return y(d.Y) })
                .curve(d3.curveBasis)

        svg.append("g")
                .attr("transform", "translate(10,10)")
                .append('text')
                .text(`${folder}_${time}`)
                .attr('fill', '#a2a3a3')
                

        svg.selectAll('.line')
                .data(shape)
                .enter()
                .append("path")
                .attr('class', 'line')
                .attr("fill", "none")
                .attr("stroke", () => {
                        // if(time === 210 || time === 211 || time === 213 || time === 214 || time === 216){
                        //         return 'steelblue'
                        // }else if(time === 212 || time === 215 || time === 217 || time === 218 || time === 219){
                        //         return 'green'
                        // }else{
                                return '#42A5B3'
                        // }
                })
                .attr("stroke-width", 1)
                .attr("d", line)
    }


        
}
