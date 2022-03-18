import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';

import { getKiviatDomain } from './kiviatDomains';
import d3Tip from 'd3-tip'
import './line-d3.css'
const attributes = ['temp', "area", 'particles', 'mass', 'length']

export default class LineD3{
    constructor(element, data, xDomain, yDomain, tID, time, folder, kiviatData, kScale){
        this.element = element;
        this.data = data;
        this.xDomain = xDomain;
        this.yDomain = yDomain;
        this.tID = tID;
        this.time = time;
        this.folder = folder;
        this.domains = getKiviatDomain();
        this.kiviatData=kiviatData;
        this.kScale=kScale

        this.drawLine(this.element, this.data, this.xDomain, this.yDomain, this.tID, this.time, this.folder, this.domains, this.kiviatData, this.kScale);
    }

    drawLine(el, shape, xD, yD, tID, time, folder, domains, kiviatData, kScale){
        // console.log(kiviatData, kScale)
        let margin = {top: 10, right: 37, bottom: 30, left: 60}
        // console.log(d3.select(el).node().parentNode)
        const width = d3.select(el).node().parentNode.clientWidth - margin.left - margin.right;
        const height = d3.select(el).node().parentNode.clientHeight - margin.top - margin.bottom;

        let kiviatCenterTip = d3Tip().attr().attr('class', 'd3-tip')
          .html(function () {
            let tip = `Member: ${time} <br>
                Temp: ${kiviatData['temp']} k <br>
                Particles: ${kiviatData['particles'] * 38} <br>
                Mass: ${kiviatData['mass'].toFixed(7)} <br>
                Length: ${kiviatData['length']} m <br>
                Area: ${kiviatData['area']} m<sup>2</sup> <br>
                `
            return tip
          })

        let svg = d3.select(el)
            .append('svg')
            .attr('id', `shape${tID}svg`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.call(kiviatCenterTip)

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

        // creating kiviat diagram
        let kiviatGroup = svg.append('g').attr('transform', `translate(${margin.right + 10}, ${height - margin.bottom - margin.top})`)


        for(let j = 0; j < attributes.length; j++){
                let axisEndpoint = rotatePointOntoAxis(30, j); 
                kiviatGroup.append("line")
                .attr("class", "axisLine")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", axisEndpoint.x)
                .attr("y2", axisEndpoint.y)
                .style("stroke", "darkgray")
                .style("stroke-width", "1px");

                // axis label
                kiviatGroup.append("text")
                        .attr("x", axisEndpoint.x)
                        .attr("y", axisEndpoint.y + 4)
                        .style("font-size", "0.6em")
                        .style("text-anchor", "middle")
                        .style('fill', 'white')
                        .text(attributes[j]);

                // tool tip circle for each axis
                kiviatGroup.append("circle")
                        .attr("class", "axisTooltipCircle")
                        .attr("cx", axisEndpoint.x)
                        .attr("cy", axisEndpoint.y)
                        .attr("r", 7)
                        .style("opacity", 0.25)
                        .style('fill', '#31393F')
                        // .datum({
                        // "attr": attributes[j]
                        // })
                        // .on('mouseover', self.axisTip.show)
                        // .on('mouseout', self.axisTip.hide);
        }

        kiviatGroup.append("path")
            .attr("class", "kiviatPath")
            .attr("d", calculatePath(kiviatData, this.domains, kScale))
            .style("fill", "#42A5B3")
            .style("opacity", 0.75);

            kiviatGroup.append("circle")
            .attr("class", "centerTooltipCircle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 15)
            .style("opacity", 0)
            .style('fill', '#31393F')
            .on('mouseover', kiviatCenterTip.show)
            .on('mouseout', kiviatCenterTip.hide)

        
    }
        
}

    /* get the coordinates of the point on each axis */
    function rotatePointOntoAxis(pointX, axisIndex) {
        let angle = Math.PI * 2 * axisIndex / attributes.length;
        // console.log(angle)
        return rotatePoint(pointX, angle);
    }

    function rotatePoint(pointX, angle) {
        return {
            x: Math.cos(angle) * (pointX),
            y: Math.sin(angle) * (pointX)
        };
    }
    const calculatePath = (data, domains, scale) =>{
        // console.log(data)
        // console.log(rotatePointOntoAxis(40, 2, 7))
        let pathCoord = [];
        for(let attr in attributes){
            // console.log(attr)
            let attribute = attributes[attr];
            scale.domain(domains[attribute]);
            let xPoint = scale(data[attribute]);
            // console.log(xPoint, domains[attribute], data[attribute])
            let endPoint = rotatePointOntoAxis(xPoint, attr, attributes.length)
    
            pathCoord.push(endPoint.x + " " + endPoint.y)
        }
    
        return "M " + pathCoord.join(" L ") + " Z";
    
    }
