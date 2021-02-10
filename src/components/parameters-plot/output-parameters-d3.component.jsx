import * as d3 from 'd3';



const height = 200
// const url ="https://github.com/CarlaFloricel/Contrails/blob/master/src/data/test_input_output_param/statistics.csv"
export default class OutputParametersD3 {
   

    
        constructor(element, data){

            
               const line = d3.line()
               .x((d) => (d.x))
               .y((d) => (d.y))
               .curve(d3.curveCardinal.tension(0.5));
            const width=100
            const height=100
            const svg = d3.select(element)
                        .append("svg")
                        .attr("width",300)
                        .attr("height",200)

            const g = svg.append('g')
            
            const sum = data
            const angleRange = Math.PI/4;


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
            var prevY7=2200;
            var points7 = [{x: 100, y: 220}];


            function rotate(cx, cy, y,x, angle) {
                  var radians = (Math.PI / 180) * angle,
                     cos = Math.cos(radians),
                     sin = Math.sin(radians),
                     nx = (cos * (x+5 - cx)) + (sin * (y - cy)) + cx,
                     ny = (cos * (y - cy)) - (sin * (x+5 - cx)) + cy;
                 return [nx, ny];
               }

            const eul_T_max = 322.423
            const eul_P_max = 29315.44
            const eul_rho_max = 0.345907
            const eul_k_max = 91.03569
            const lag_T_max = 654.7868

            const eul_T_min = 322.4222
            const eul_P_min = 29283.44
            const eul_rho_min = 0.345535
            const eul_k_min = 91.01908
            const lag_T_min = 315.1326

            const lag_d_max = 0.00001
            const lag_rho_max = 10000
            const lag_Ygas_max = 0

            const norm_T_lag = []
            const norm_T_eul = []
            const norm_P_eul = []
            const norm_rho_eul = []
            const norm_k_eul = []
            

            for (var j = 0; j< sum.length; j++){
                  norm_T_lag.push((sum[j]["lag_T_avg"] - lag_T_min)/(lag_T_max - lag_T_min))
                  norm_T_eul.push((sum[j]["eul_T_avg"] - eul_T_min)/(eul_T_max - eul_T_min))
                  norm_P_eul.push((sum[j]["eul_P_avg"] - eul_P_min)/(eul_P_max - eul_P_min))
                  norm_k_eul.push((sum[j]["eul_k_avg"] - eul_k_min)/(eul_k_max - eul_k_min))
                  norm_rho_eul.push((sum[j]["eul_rho_avg"] - eul_rho_min)/(eul_rho_max - eul_rho_min))

                  console.log(norm_k_eul[j] + " " + sum[j]["eul_k_avg"] )

            }


            for(var k = 1; k< sum.length; k++){

            //      console.log(norm_T_eul)
                  var dif =sum[k]["eul_T_avg"]- sum[k-1]["eul_T_avg"]
                  var diff = norm_T_eul[k]-norm_T_eul[k-1]
				 
                  var angle = (diff* 100) *  angleRange
                  const vala = rotate(0,0,0,20,angle);
                  // console.log(diff)
                  prevX = vala[0] + prevX;
                  prevY = vala[1] + prevY;
                  
                  points.push({x: prevX, y: prevY})

                  g.append('circle')
                  .attr('cx', prevX)
                  .attr('cy', prevY)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')
                  .attr("id", k-1)



                  var dif2 =sum[k]["lag_T_avg"]- sum[k-1]["lag_T_avg"]; 
                  var diff2 = norm_T_lag[k] - norm_T_lag[k-1]
                  var angle2 = (diff2*100) *  angleRange;
                  const vala2 = rotate(0,0,0,20,angle2);
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
                  var diff3 = norm_k_eul[k] - norm_k_eul[k-1]
                  var angle3 = (dif3*10000)*  angleRange 
                  const vala3 = rotate(0,0,0,20,angle3);
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
                  var diff4 = norm_rho_eul[k] - norm_rho_eul[k-1]
                  var angle4 = (diff4*100) *  angleRange 
                  const vala4 = rotate(0,0,0,20,angle4);
                  prevX4 = vala4[0] + prevX4;
                  prevY4 = vala4[1] + prevY4;
                  points4.push({x: prevX4, y: prevY4})

                  g.append('circle')
                  .attr('cx', prevX4)
                  .attr('cy', prevY4)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')


                  var dif5 =sum[k]["eul_P_avg"]- sum[k-1]["eul_P_avg"]; 
                  var diff5 = norm_P_eul[k] - norm_P_eul[k-1]
                  var angle5 = (diff5 * 100) * angleRange  
                  const vala5 = rotate(0,0,0,20,angle5);
                  prevX5 = vala5[0] + prevX5;
                  prevY5 = vala5[1] + prevY5;
                  points5.push({x: prevX5, y: prevY5})
                  
                  g.append('circle')
                  .attr('cx', prevX5)
                  .attr('cy', prevY5)
                  .attr('r',4)
                  .attr('fill-opacity', 0.65)
                  .attr('fill', '#83aad4')


                  // var dif6 =sum[k]["lag_d_avg"]- sum[k-1]["lag_d_avg"]; 
                  // var angle6 = (dif6) *  angleRange 
                  // const vala6 = rotate(0,0,0,20,angle6);
                  // prevX6 = vala6[0] + prevX6;
                  // prevY6 = vala6[1] + prevY6;
                  // points6.push({x: prevX6, y: prevY6})
                  // console.log("lala "+ dif6 )
                  // g.append('circle')
                  // .attr('cx', prevX6)
                  // .attr('cy', prevY6)
                  // .attr('r',4)
                  // .attr('fill-opacity', 0.65)
                  // .attr('fill', '#83aad4')
                      
                //   var dif7 =sum[k]["lag_rho_avg"]- sum[k-1]["lag_rho_avg"];

			// 	  console.log(sum[k]["lag_rho_avg"]) 
			// 	  console.log(sum[k-1]["lag_rho_avg"])
                  // var angle7 = (sum[k]["lag_rho_avg"]/(Math.abs(lag_rho_max)*2)) *  angleRange 
                  // const vala7 = rotate(0,0,0,20,angle7/(2*Math.PI)*360);
                  // prevX7 = vala7[0] + prevX7;
                  // prevY7 = vala7[1] + prevY7;
                  // points7.push({x: prevX7, y: prevY7})

                  // g.append('circle')
                  // .attr('cx', prevX7)
                  // .attr('cy', prevY7)
                  // .attr('r',4)
                  // .attr('fill-opacity', 0.65)
                  // .attr('fill', '#83aad4')

            }
// for( var i= 0; i < points5.length; i++){
// 	console.log(points5[i].x+ " "+ points5[i].y)
// }
        
// for( var i= 0; i < points6.length; i++){
// 	console.log(points6[i].x+ " "+ points6[i].y)
// }


            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', '#7b3294')
            .attr('stroke-width', '2.5px')
            .attr("opacity", 1 )
            .attr('d', line(points))
            .on('mouseover', function () {

                  d3.select(this)
                    .append("title")
                    .text("eul_T_avg" )
            })


            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', '#c2a5cf')
            .attr('stroke-width', '2.5px')
            .attr("opacity", 1 )
            .attr('d', line(points2))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("lag_T_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', '#f7f7f7')
            .attr('stroke-width', '2.5px')
            .attr("opacity", 1 )
            .attr('d', line(points3))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_k_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', '#a6dba0')
            .attr('stroke-width', '2.5px')
            .attr("opacity", 1 )
            .attr('d', line(points4))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_rho_avg" )
            })

            g.append('path')
            .attr('fill', 'none')
            .attr('stroke', '#008837')
            .attr('stroke-width', '2.5px')
            .attr("opacity", 1 )
            .attr('d', line(points5))
            .on('mouseover', function () {
                  d3.select(this)
                    .append("title")
                    .text("eul_P_avg" )
            })


            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', 'pink')
            // .attr('stroke-width', '2.5px')
            // .attr("opacity", 1 )
            // .attr('d', line(points6))
            // .on('mouseover', function () {
            //       d3.select(this)
            //         .append("title")
            //         .text("lag_d_avg" )
            // })

            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', 'purple')
            // .attr('stroke-width', '2px')
            // .attr("opacity", 1 )
            // .attr('d', line(points7))
            // .on('mouseover', function () {
            //       d3.select(this)
            //         .append("title")
            //         .text("lag_rho_avg" )
            // })
      }

}

