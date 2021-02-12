import * as d3 from 'd3';



const height = 900
// const url ="https://github.com/CarlaFloricel/Contrails/blob/master/src/data/test_input_output_param/statistics.csv"
export default class OutputParametersD3 {



      constructor(element, data, data_registry) {
            this.element = element
            let vis = this
            this.draw_tendrils( element, data_registry)
      // vis.update(this.dataRegistry)
      }

      draw_tendrils(element, data_registry){
            
            const dataRegistry = data_registry
            
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

            
            const angleRange = Math.PI / 4;



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
                  // d3.selectAll("circle").remove()
                  // d3.selectAll('path').remove()
                  var prevX = new Array(data.length)
                  var prevY = new Array(data.length)
                  for (var i = 0; i <data.length; i++) {

                       var p = Object.assign([], points)

                        var normalized_data = normalize_data(data[i])
                       prevX[i] = prevX_first
                       prevY[i] = prevY_first
                       
                      
                        for (var k = 1; k < data[i].length; k++) {
                        // console.log(k + " " + data[i])

                              var dif = normalized_data[k] - normalized_data[k - 1]
                              var angle = (dif * 100) * angleRange
                              const val = rotate(0, 0, 0, 20, angle);
                              prevX[i] = val[0] + prevX[i];
                              prevY[i] = val[1] + prevY[i];
                              p.push({ x: prevX[i], y: prevY[i] })
                              g.append('circle')
                                    .attr('cx', prevX[i])
                                    .attr('cy', prevY[i])
                                    .attr('r', 4)
                                    .attr('fill-opacity', 0.65)
                                    .attr('fill', color)
                                    
                        }

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
            const rho_lags =dataRegistry.map(el => {
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

      }

      update(data){
         let vis = this
         d3.selectAll('svg').remove()
        
         this.draw_tendrils(vis.element,data)
         
      }

}

