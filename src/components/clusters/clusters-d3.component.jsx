
import * as d3 from 'd3';
import './clusters.style.css';
import $ from 'jquery'

let top = 'top'
let bottom = 'bottom'
let renderArea = ''
let shouldRender = false
export default class ClustersD3 {
    constructor (element, filtered_ids, all_data) {
        d3.select(element).select('svg').remove()
        
        // console.log(d3.select(element).node().clientWidth)
        const width = d3.select(element).node().clientWidth - 10;
        const height = d3.select(element).node().parentNode.clientHeight

        const svg = d3.select(element)
                    .append("svg")
                    .attr('id', 'svg')
                    .attr("width",width)
                    .attr("height",height)
      svg.append("text").text("Members positioned based on similarity")
      .attr('transform', `translate(20,15)`)
      .attr("fill", '#05ecec')
                    
        const g = svg.append('g')
        
            let valuesX  = all_data.map(function(d) {
             
              return d['x'];
            });
            var minX = Math.min.apply( null, valuesX );
            var maxX = Math.max.apply( null, valuesX );
            let valuesY  = all_data.map(function(d) {
             
              return d['y'];
            });
            var minY = Math.min.apply( null, valuesY );
            var maxY = Math.max.apply( null, valuesY );
            
            var x = d3.scaleLinear()
              .domain([minX, maxX])
              .range([ 20, width-20 ]);

            var y = d3.scaleLinear()
              .domain([minY, maxY])
              .range([ height-20, 50]);

       
           all_data.forEach(element => {
            

            const group = g.append('g')
            .attr("transform", d => `translate(${x(element['x'])-11},${y(element['y'])-11})`)
            //  g.append('circle')
            // .attr('cx', x(element['x']))
            // .attr('cy',  y(element['y']))
            // .attr('r',12)
            // .style("fill", "#69b3a2")
            // .attr("opacity", '0')
            // .on('mouseover', function(){
            //   d3.select(this)
            //   .append("title")
            //   .text("Member " + element['id'])
            // })
            // .on('mouseout', function(){
            //   d3.selectAll('title').remove()
            // })


            // console.log(element['id'])
          group.append('path')
          .style("fill", "white")
          .attr('class', "cluster_airplane_"+element['id'])
          .attr("transform", 'scale(0.04)')
          .attr('d', "M 439.48098,95.969555 L 393.34268,142.46481 L 305.91233,133.41187 L 324.72376,114.58551 L 308.61525,98.464215 L 276.15845,130.94677 L 185.25346,123.08136 L 201.15145,107.27643 L 186.46085,92.574165 L 158.32,120.73735 L 45.386032,112.12042 L 15.000017,131.66667 L 221.20641,192.48691 L 298.26133,237.01135 L 191.91028,345.62828 L 152.82697,408.6082 L 41.549634,393.05411 L 21.037984,413.58203 L 109.25334,470.93369 L 166.38515,558.95725 L 186.8968,538.42933 L 171.35503,427.06371 L 234.28504,387.94939 L 342.81586,281.51396 L 387.305,358.63003 L 448.07703,565.00001 L 467.60778,534.58989 L 458.99769,421.56633 L 487.16033,393.38134 L 473.14247,379.35235 L 456.6139,395.97492 L 448.79636,303.63439 L 481.25315,271.15184 L 465.14464,255.03055 L 446.33321,273.8569 L 436.04766,185.1164 L 482.35108,138.7864 C 501.1942,119.92833 560.62425,61.834815 564.99998,14.999985 C 515.28999,23.707295 476.1521,61.495405 439.48098,95.969555 z ")
          .attr("opacity", d => filtered_ids.includes(element['id']) ? "1" : "0.2")
          .style('fill', ()=> {
            if([17,18,19].includes(element['id'])){
              return '#92C5DE'
            }else{
              return 'white'
            }
          })
          .on('mouseover', function(){
            $('.tendrils').css("opacity", '0.1')
            $('.circles').css("opacity", '0.1')
            $(`.path_${element['id']}_`).css("stroke-width", '2.8')
                  .css('opacity', 1)
            $(`.circle_${element['id']}`).css("opacity", '1')
            $(`.cluster_airplane_${element['id']}`).css("fill", '#05ecec')
            $(`.highlight_${element['id']}`).css("opacity", '0.7')
            d3.select(this)
            .append("title")
            .text("Member " + element['id'])
            
          })
          .on('mouseout', function(){
            $(`.highlight_${element['id']}`).css("opacity", '0')
            $(`.cluster_airplane_${element['id']}`).css('fill', ()=> {
              console.log(element['id'])
              if([17,18,19].includes(element['id'])){
                return '#92C5DE'
              }else{
                return 'white'
              }
            })
            $('.tendrils').css("opacity", '1')
            $('.circles').css("opacity", '0.65')
            // $(`.cluster_airplane_${element['id']}`).css("fill", 'white')
            d3.selectAll('title').remove()
          })
          .on('click', function(d){
            let topMember = +$(`#member${top}`).val()
            let bottomMember = +$(`#member${bottom}`).val()
            let thisMember = element['id']
            if(thisMember != topMember && thisMember != bottomMember){
              if(renderArea === 'top'){
                renderArea = 'bottom'
              }else{
                renderArea = 'top'
              }
              shouldRender = true
            }else{
              // console.log('one member is equal to this member')
              shouldRender = false
            }
            // console.log(`top member = ${topMember}, bottom member = ${bottomMember}, this member = ${thisMember}, render area = ${renderArea}, should render? ${shouldRender}`)
            if(shouldRender){
              // console.log($(`#member${renderArea}`).val(thisMember).trigger('change'))
              // $(`#member${renderArea}`).val(thisMember).trigger('onchange');
              // $(`#member${renderArea}`).val(thisMember)
            }

          })
        })


      }
}

