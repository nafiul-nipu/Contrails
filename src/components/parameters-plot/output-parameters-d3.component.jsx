import * as d3 from 'd3';



const height = 900
// const url ="https://github.com/CarlaFloricel/Contrails/blob/master/src/data/test_input_output_param/statistics.csv"
export default class OutputParametersD3 {



      constructor(element, data, dataRegistry) {
            const line = d3.line()
                  .x((d) => (d.x))
                  .y((d) => (d.y))
                  .curve(d3.curveCardinal.tension(0.5));
            const width = 100
            const height = 100
            const svg = d3.select(element)
                  .append("svg")
                  .attr("width", 300)
                  .attr("height", 900)

            const g = svg.append('g')

            const sum = data
            const angleRange = Math.PI / 4;


            var prevX = 100;
            var prevY = 100;
            var points = [{ x: 100, y: 100 }];


            var prevX2 = 100;
            var prevY2 = 100;
            var points2 = [{ x: 100, y: 100 }];


            var prevX3 = 100;
            var prevY3 = 100;
            var points3 = [{ x: 100, y: 100 }];

            var prevX4 = 100;
            var prevY4 = 100;
            var points4 = [{ x: 100, y: 100 }];


            var prevX5 = 100;
            var prevY5 = 100;
            var points5 = [{ x: 100, y: 100 }];

            var prevX6 = 100;
            var prevY6 = 100;
            var points6 = [{ x: 100, y: 100 }];

            var prevX7 = 100;
            var prevY7 = 2200;
            var points7 = [{ x: 100, y: 220 }];


            function rotate(cx, cy, y, x, angle) {
                  var radians = (Math.PI / 180) * angle,
                        cos = Math.cos(radians),
                        sin = Math.sin(radians),
                        nx = (cos * (x + 5 - cx)) + (sin * (y - cy)) + cx,
                        ny = (cos * (y - cy)) - (sin * (x + 5 - cx)) + cy;
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



            function normalize_data(el) {
                  // const norm_T_lag = []
                  // const norm_T_eul = []
                  // const norm_P_eul = []
                  // const norm_rho_eul = []
                  // const norm_k_eul = []
                  const normalized_data = []
                  const min_el = Math.min(...el)
                  const max_el = Math.max(...el)
                  if (min_el == max_el){
                        return el
                  }
                  for (var j = 0; j < el.length; j++) {
                        // norm_T_lag.push((sum[j]["lag_T_avg"] - lag_T_min)/(lag_T_max - lag_T_min))
                        // norm_T_eul.push((sum[j]["eul_T_avg"] - eul_T_min)/(eul_T_max - eul_T_min))
                        // norm_P_eul.push((sum[j]["eul_P_avg"] - eul_P_min)/(eul_P_max - eul_P_min))
                        // norm_k_eul.push((sum[j]["eul_k_avg"] - eul_k_min)/(eul_k_max - eul_k_min))
                        // norm_rho_eul.push((sum[j]["eul_rho_avg"] - eul_rho_min)/(eul_rho_max - eul_rho_min))
                        normalized_data.push((el[j] - min_el) / (max_el - min_el))

                  }
                 
                  return normalized_data
            }

            function create_tendril_plot(data, prevX_first, prevY_first, points, title, ids, color) {
                  var prevX = new Array(data.length)
                  var prevY = new Array(data.length)
                  for (var i = 0; i <data.length; i++) {

                       var p = Object.assign([], points)

                        var normalized_data = normalize_data(data[i])
                       prevX[i] = prevX_first
                       prevY[i] = prevY_first
                       console.log(prevX)
                      
                        for (var k = 1; k < data[i].length; k++) {
                        // console.log(k + " " + data[i])

                              var dif = normalized_data[k] - normalized_data[k - 1]
                              var angle = (dif * 100) * angleRange
                              const val = rotate(0, 0, 0, 20, angle);
                              prevX[i] = val[0] + prevX[i];
                              console.log(prevX[i])
                              prevY[i] = val[1] + prevY[i];
                              p.push({ x: prevX[i], y: prevY[i] })
                              g.append('circle')
                                    .attr('cx', prevX[i])
                                    .attr('cy', prevY[i])
                                    .attr('r', 4)
                                    .attr('fill-opacity', 0.65)
                                    .attr('fill', color)
                                    
                        }
                        console.log(p)

                        g.append('path')
                              .attr('fill', 'none')
                              .attr('stroke', color)
                              .attr('stroke-width', '2.5px')
                              .attr("opacity", 1)
                              .attr('d', line(p))
                              .on('mouseover', function () {

                                    d3.select(this)
                                          .append("title")
                                          .text(title)
                              })
                      
                  }

            }
            
            const ids = dataRegistry.map(el => { return el['id'] })
            const T_euls = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['T_eul_avg_timepoints']
            })
            const T_lags = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['T_lag_avg_timepoints']
            })
            // const Ygas_lags = dataRegistry.map(el => {var e = el['output-parameters']
            //       return e['Ygas_lag_avg']})
            const d_lags = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['d_lag_avg_timepoints']
            })
            const rho_euls = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['rho_eul_avg_timepoints']
            })
            const rho_lags = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['rho_lag_avg_timepoints']
            })
            const p_euls = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['p_eul_avg_timepoints']
            })
            const k_euls = dataRegistry.map(el => {
                  var e = el['output-parameters']
                  return e['k_eul_avg_timepoints']
            })

            create_tendril_plot(T_lags, 100, 50, [{ x: 100, y: 50 }], 'T_lag_avg', ids, '#b2182b')
            create_tendril_plot(T_euls, 100, 150, [{ x: 100, y: 150 }], 'T_eul_avg', ids, '#d6604d')
            create_tendril_plot(d_lags, 100, 250, [{ x: 100, y: 250 }], 'd_lag_avg', ids, '#f4a582')
            create_tendril_plot(rho_lags, 100, 350, [{ x: 100, y: 350 }], 'rho_lag_avg', ids, '#fddbc7')
            create_tendril_plot(rho_euls, 100, 450, [{ x: 100, y: 450 }], 'rho_eul_avg', ids, '#d1e5f0')
            create_tendril_plot(k_euls, 100, 550, [{ x: 100, y: 550 }], 'k_eul_avg', ids, '#92c5de')
            create_tendril_plot(p_euls, 100, 650, [{ x: 100, y: 650 }], 'p_eul_avg', ids, '#4393c3')


            // for(var k = 1; k< sum.length; k++){

            //       var diff = norm_T_eul[k]-norm_T_eul[k-1]

            //       var angle = (diff* 100) *  angleRange
            //       const vala = rotate(0,0,0,20,angle);

            //       prevX = vala[0] + prevX;
            //       prevY = vala[1] + prevY;

            //       points.push({x: prevX, y: prevY})

            //       g.append('circle')
            //       .attr('cx', prevX)
            //       .attr('cy', prevY)
            //       .attr('r',4)
            //       .attr('fill-opacity', 0.65)
            //       .attr('fill', '#83aad4')
            //       .attr("id", k-1)




            //       var diff2 = norm_T_lag[k] - norm_T_lag[k-1]
            //       var angle2 = (diff2*100) *  angleRange;
            //       const vala2 = rotate(0,0,0,20,angle2);
            //       prevX2 = vala2[0] + prevX2;
            //       prevY2 = vala2[1] + prevY2;
            //       points2.push({x: prevX2, y: prevY2})

            //       g.append('circle')
            //       .attr('cx', prevX2)
            //       .attr('cy', prevY2)
            //       .attr('r',4)
            //       .attr('fill-opacity', 0.65)
            //       .attr('fill', '#83aad4')



            //       var diff3 = norm_k_eul[k] - norm_k_eul[k-1]
            //       var angle3 = (diff3*100)*  angleRange 
            //       const vala3 = rotate(0,0,0,20,angle3);
            //       prevX3 = vala3[0] + prevX3;
            //       prevY3 = vala3[1] + prevY3;
            //       points3.push({x: prevX3, y: prevY3})

            //       g.append('circle')
            //       .attr('cx', prevX3)
            //       .attr('cy', prevY3)
            //       .attr('r',4)
            //       .attr('fill-opacity', 0.65)
            //       .attr('fill', '#83aad4')




            //       var diff4 = norm_rho_eul[k] - norm_rho_eul[k-1]
            //       var angle4 = (diff4*100) *  angleRange 
            //       const vala4 = rotate(0,0,0,20,angle4);
            //       prevX4 = vala4[0] + prevX4;
            //       prevY4 = vala4[1] + prevY4;
            //       points4.push({x: prevX4, y: prevY4})

            //       g.append('circle')
            //       .attr('cx', prevX4)
            //       .attr('cy', prevY4)
            //       .attr('r',4)
            //       .attr('fill-opacity', 0.65)
            //       .attr('fill', '#83aad4')



            //       var diff5 = norm_P_eul[k] - norm_P_eul[k-1]
            //       var angle5 = (diff5 * 100) * angleRange  
            //       const vala5 = rotate(0,0,0,20,angle5);
            //       prevX5 = vala5[0] + prevX5;
            //       prevY5 = vala5[1] + prevY5;
            //       points5.push({x: prevX5, y: prevY5})

            //       g.append('circle')
            //       .attr('cx', prevX5)
            //       .attr('cy', prevY5)
            //       .attr('r',4)
            //       .attr('fill-opacity', 0.65)
            //       .attr('fill', '#83aad4')


            // }
            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', '#7b3294')
            // .attr('stroke-width', '2.5px')
            // .attr("opacity", 1 )
            // .attr('d', line(points))
            // .on('mouseover', function () {

            //       d3.select(this)
            //         .append("title")
            //         .text("eul_T_avg" )
            // })


            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', '#c2a5cf')
            // .attr('stroke-width', '2.5px')
            // .attr("opacity", 1 )
            // .attr('d', line(points2))
            // .on('mouseover', function () {
            //       d3.select(this)
            //         .append("title")
            //         .text("lag_T_avg" )
            // })

            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', '#f7f7f7')
            // .attr('stroke-width', '2.5px')
            // .attr("opacity", 1 )
            // .attr('d', line(points3))
            // .on('mouseover', function () {
            //       d3.select(this)
            //         .append("title")
            //         .text("eul_k_avg" )
            // })

            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', '#a6dba0')
            // .attr('stroke-width', '2.5px')
            // .attr("opacity", 1 )
            // .attr('d', line(points4))
            // .on('mouseover', function () {
            //       d3.select(this)
            //         .append("title")
            //         .text("eul_rho_avg" )
            // })

            // g.append('path')
            // .attr('fill', 'none')
            // .attr('stroke', '#008837')
            // .attr('stroke-width', '2.5px')
            // .attr("opacity", 1 )
            // .attr('d', line(points5))
            // .on('mouseover', function () {
            //       d3.select(this)
            //         .append("title")
            //         .text("eul_P_avg" )
            // })


      }

}

