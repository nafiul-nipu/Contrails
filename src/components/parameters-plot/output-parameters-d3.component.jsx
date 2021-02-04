import * as d3 from 'd3';



const height = 200
const url ="https://github.com/CarlaFloricel/Contrails/blob/master/src/data/test_input_output_param/statistics.csv"
export default class OutputParametersD3 {
   

    
        constructor(element, data){

            function rotate(cx, cy, x, y, angle) {
                  var radians = (Math.PI / 180) * angle,
                     cos = Math.cos(radians),
                     sin = Math.sin(radians),
                     nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                     ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
                 return [nx, ny];
               }
               const line = d3.line()
               .x((d) => (d.x))
               .y((d) => (d.y))
               .curve(d3.curveCardinal.tension(0.5));
            const width=100
            const height=100
            const svg = d3.select(element)
                        .append("svg")
                        .attr("width",300)
                        .attr("height",250)

            const g = svg.append('g')
            
            const sum = data
            const angleRange = Math.PI/2;
            console.log(sum)

            var prevX=100;
            var prevY=100;
            var points = [{x: 100, y: 100}];


            var prevX2=100;
            var prevY2=100;
            var points2 = [{x: 100, y: 100}];


            var prevX3=100;
            var prevY3=100;
            var points3 = [{x: 100, y: 100}];

            var prevX4=100;
            var prevY4=100;
            var points4 = [{x: 100, y: 100}];


            var prevX5=100;
            var prevY5=100;
            var points5 = [{x: 100, y: 100}];

            var prevX6=100;
            var prevY6=100;
            var points6 = [{x: 100, y: 100}];

            var prevX7=100;
            var prevY7=100;
            var points7 = [{x: 100, y: 100}];


            for(var k = 1; k< sum.length; k++){
                  console.log(sum[k][["eul_T_avg"]])
                  var dif =sum[k]["eul_T_avg"]- sum[k-1]["eul_T_avg"]; 
                  var angle = (dif) *  angleRange -  angleRange/2;
                  const vala = rotate(0,0,0,20,-angle/(2*Math.PI)*360);
                  prevX = vala[0] + prevX;
                  prevY = vala[1] + prevY;
                  points.push({x: prevX, y: prevY})

                  g.append('circle')
                  .attr('cx', prevX)
                  .attr('cy', prevY)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')


                  var dif2 =sum[k]["lag_T_avg"]- sum[k-1]["lag_T_avg"]; 
                  var angle2 = (dif2) *  angleRange -  angleRange/2;
                  const vala2 = rotate(0,0,0,20,angle2/(2*Math.PI)*360);
                  prevX2 = vala2[0] + prevX2;
                  prevY2 = vala2[1] + prevY2;
                  points2.push({x: prevX2, y: prevY2})

                  g.append('circle')
                  .attr('cx', prevX2)
                  .attr('cy', prevY2)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')


                  var dif3 =sum[k]["eul_k_avg"]- sum[k-1]["eul_k_avg"]; 
                  var angle3 = (dif3*100) *  angleRange -  angleRange/2;
                  const vala3 = rotate(0,0,0,20,angle3/(2*Math.PI)*360);
                  prevX3 = vala3[0] + prevX3;
                  prevY3 = vala3[1] + prevY3;
                  points3.push({x: prevX3, y: prevY3})

                  g.append('circle')
                  .attr('cx', prevX3)
                  .attr('cy', prevY3)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')
 


                  var dif4 =sum[k]["eul_rho_avg"]- sum[k-1]["eul_rho_avg"]; 
                  var angle4 = (dif4*1000) *  angleRange -  angleRange/2;
                  const vala4 = rotate(0,0,0,20,angle4/(2*Math.PI)*360);
                  prevX4 = vala4[0] + prevX4;
                  prevY4 = vala4[1] + prevY4;
                  points4.push({x: prevX4, y: prevY4})

                  g.append('circle')
                  .attr('cx', prevX4)
                  .attr('cy', prevY4)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')


                  var dif5 =sum[k]["lag_Ygas_avg"]- sum[k-1]["lag_Ygas_avg"]; 
                  var angle5 = (dif5) *  angleRange -  angleRange/2;
                  const vala5 = rotate(0,0,0,20,angle5/(2*Math.PI)*360);
                  prevX5 = vala5[0] + prevX5;
                  prevY5 = vala5[1] + prevY5;
                  points5.push({x: prevX5, y: prevY5})

                  g.append('circle')
                  .attr('cx', prevX5)
                  .attr('cy', prevY5)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')


                  var dif6 =sum[k]["lag_d_avg"]- sum[k-1]["lag_d_avg"]; 
                  var angle6 = (dif6*1000) *  angleRange -  angleRange/2;
                  const vala6 = rotate(0,0,0,20,angle6/(2*Math.PI)*360);
                  prevX6 = vala6[0] + prevX6;
                  prevY6 = vala6[1] + prevY6;
                  points6.push({x: prevX6, y: prevY6})
				  console.log(sum[k]["lag_d_avg"]) 
				  console.log(sum[k-1]["lag_d_avg"])
                  g.append('circle')
                  .attr('cx', prevX6)
                  .attr('cy', prevY6)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')
                      
                  var dif7 =sum[k]["lag_rho_avg"]- sum[k-1]["lag_rho_avg"];

				  console.log(sum[k]["lag_rho_avg"]) 
				  console.log(sum[k-1]["lag_rho_avg"])
                  var angle7 = (-20+ dif7) *  angleRange -  angleRange/2;
                  const vala7 = rotate(0,0,0,20,angle7/(2*Math.PI)*360);
                  prevX7 = vala7[0] + prevX7;
                  prevY7 = vala7[1] + prevY7;
                  points7.push({x: prevX7, y: prevY7})

                  g.append('circle')
                  .attr('cx', prevX7)
                  .attr('cy', prevY7)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')

            }
// for( var i= 0; i < points5.length; i++){
// 	console.log(points5[i].x+ " "+ points5[i].y)
// }
        
// for( var i= 0; i < points6.length; i++){
// 	console.log(points6[i].x+ " "+ points6[i].y)
// }
console.log("points5 " + points5[0].x + " "+ points5[1].x+ " "+ points5[2].x)
            console.log("points6 " + points6[0].x+ " "+ points6[1].x+ " "+ points6[2].x)
            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points))
            .on('mouseover', function () {

                  d3.select(this)
                    .append("title")
                    .text("eul_T_avg" )
            })


            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points2))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_P_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'yellow')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points3))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_k_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points4))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_rho_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points5))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_Ygas_avg" )
            })


            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'pink')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points6))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("lag_d_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'purple')
            .attr('stroke-width', '2px')
            .attr("opacity", 1 )
            .attr('d', line(points7))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("lag_rho_avg" )
            })
      }

}

