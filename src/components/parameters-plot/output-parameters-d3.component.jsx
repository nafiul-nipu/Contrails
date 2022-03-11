import * as d3 from 'd3';
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );
import $ from 'jquery'

import d3Tip from 'd3-tip'
import "./parameters-plot.styles.css"
import { filter } from 'd3';


const height = window.innerHeight
export default class OutputParametersD3 {



      constructor(element,  data_registry, tendril, top, bottom) {
            this.element = element
            this.contrailMembers = [top, bottom]
            this.draw_tendrils(element, data_registry, false, this.contrailMembers)
      }

      draw_tendrils(element, data_registry, split, members) {
            // console.log(members)
            const dataRegistry = data_registry

            const line = d3.line()
                  .x((d) => (d.x))
                  .y((d) => (d.y))
                  .curve(d3.curveCardinal.tension(0.5));
            const width = d3.select(element).node().parentNode.clientWidth
            const height = 100
            const svg = d3.select(element)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", window.innerHeight - 10)
            svg.append("text").text("Members' Output Params")
            .attr('transform', `translate(${width /35},20)`)
            .attr("fill", '#05ecec')


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

            function normalize_data(el) {
                  const normalized_data = []
                  const min_el = Math.min(...el)
                  const max_el = Math.max(...el)
                  if (min_el == max_el) {
                        return el
                  }
                  for (var j = 0; j < el.length; j++) {
                        normalized_data.push((el[j] - min_el) / (max_el - min_el))

                  }

                  return normalized_data
            }

            function get_mean_attr_val(data){
                  // console.log(data)
                  var total_sum =0
                  for(var i = 0; i< data.length; i++){
                        const normalized_data = normalize_data(data[i])
                        const el_avg = normalized_data[0]
                        total_sum+=el_avg
                  }
                  return total_sum/data.length
                  
            }


            function create_tendril_plot(data, prevX_first, prevY_first, points, title, ids, avg_val, members) {
                  svg.append("text").text(title)
                        .attr('transform', `translate(${prevX_first + 30},${prevY_first - 50})`)
                        .attr('fill', 'white')

                  var prevX = new Array(data.length)
                  var prevY = new Array(data.length)

                  // console.log(data.length)
                  for (var i = 0; i<data.length; i++) {
                        // console.log(data[i])
                        
                        // if(ids[i] == 5 || ids[i] == 6){
                              if(true){
                        const title_id = ids[i]
                        const values = data[i]
                        var p = Object.assign([], points)

                        let tendrilTip = d3Tip().attr().attr('class', 'd3-tip')
                                          .html(function(){
                                                let tip = `Member: ${title_id} <br>
                                                Time Points : ${data[title_id - 1]}
                                                `
                                                return tip
                                          })
                         svg.call(tendrilTip)

                        var normalized_data = normalize_data(data[i])
                        if(split){
                              var dif_first = avg_val - normalized_data[0] 
                              var angle_first = (dif_first * 50) * angleRange
                              const val_first = rotate(0,0,0,16, angle_first)
                              prevX[i] = prevX_first + val_first[0]
                              prevY[i] = prevY_first + val_first[1]
                              p.push({ x: prevX[i], y: prevY[i] })
                        }
                        else{
                              prevX[i] = prevX_first 
                              prevY[i] = prevY_first 
                        }

                        for (var k = 1; k < data[i].length; k++) {
                              var dif = normalized_data[k] - normalized_data[k - 1]
                              var angle = (dif * 50) * angleRange
                              const val = rotate(0, 0, 0, 16, angle);
                              prevX[i] = val[0] + prevX[i];
                              prevY[i] = val[1] + prevY[i];
                              p.push({ x: prevX[i], y: prevY[i] })
                              g.append('circle')
                                    .attr('class', 'output-circle circle_' + title_id)
                                    .attr('id', "circles_" + title_id + "_")
                                    .attr('cx', prevX[i])
                                    .attr('cy', prevY[i])
                                    .attr('r', 4)
                                    .attr('fill-opacity', 0.65)
                                    .attr('fill', () => {
                                          // console.log(members)
                                          // console.log(title_id)
                                          if(members.includes(title_id)){
                                                
                                                return '#42A5B3'
                                          }else{
                                                return '#FF6F61'
                                          }
                                         
                                    })
                        }
                        g.append('path')
                              .attr('fill', 'none')
                              .attr('stroke', () => {
                                    // console.log(title_id)
                                    if(members.includes(title_id)){
                                          // console.log('i am here inside tendrils')
                                          return '#42A5B3'
                                    }else{
                                          return '#FF6F61'
                                    }
                                   
                              })
                              .attr("class", "tendrils path_" + title_id + "_")
                              .attr('stroke-width', '2.5px')
                              .attr('id', "path_" + title_id + "_")
                              .attr("opacity", 1)
                              .attr('d', line(p))
                              .on('mouseover', function () {
                                    tendrilTip.show(this)
                                    const el_id = this.id.replace("path_","")
                                    const el_idfinal = el_id.replace("_",'')
                                    // console.log(el_idfinal)
                                    $('.tendrils').css("opacity", '0.1')
                                    $('.circles').css("opacity", '0.1')
                                    $(`.${this.id}`).css("stroke-width", '2.8')
                                          .css('opacity', 1)
                                    $(`.circle_${this.id}`).css("opacity", '1')
                                    $(`.hoverhighlight_${el_idfinal}`).css("opacity", '0.7')
                                    $(`.cluster_airplane_${el_idfinal}`).css("fill", '#05ecec')
                              })
                              .on('mouseout', function () {
                                    const el_id = this.id.replace("path_","")
                                    const el_idfinal = el_id.replace("_",'')
                                    d3.select(this)
                                    $(`.${this.id}`).css("stroke-width", '2.5')
                                    $('.tendrils').css("opacity", '1')
                                    $('.circles').css("opacity", '0.65')
                                    tendrilTip.hide(this)
                                    $(`.hoverhighlight_${el_idfinal}`).css("opacity", '0')
                                    $(`.cluster_airplane_${el_idfinal}`).css("fill", 'white')
                              })

                  }
            }

            }
            // console.log(dataRegistry)

            const ids = dataRegistry.map(el => { return el['id'] })
            
            // const T_euls = dataRegistry.map(el => {
            //       // console.log(el['output-parameters'])
            //       if(el['output-parameters'] !== undefined){
            //             var e = el['output-parameters']
            //             return e['T_eul_avg_timepoints']
            //       }
                  
            // })
            const T_euls = dataRegistry.reduce((res, el) => {
                  // console.log(el)
                  if(el['output-parameters'] !== undefined){
                        var e = el['output-parameters']
                        res.push(e['T_eul_avg_timepoints'])
                  }
                  return res
            }, [])

            const T_lags = dataRegistry.reduce((res, el) => {
                  // console.log(el)
                  if(el['output-parameters'] !== undefined){
                        var e = el['output-parameters']
                        res.push(e['T_lag_avg_timepoints'])
                  }
                  
                  return res
            }, [])
            // const Ygas_lags = dataRegistry.map(el => {var e = el['output-parameters']
            //       return e['Ygas_lag_avg']})

            const d_lags = dataRegistry.reduce((res, el) => {
                  // console.log(el)
                  if(el['output-parameters'] !== undefined){
                        var e = el['output-parameters']
                        res.push(e['d_lag_avg_timepoints'])
                  }
                  
                  return res
            }, [])
            // const rho_euls = dataRegistry.map(el => {
            //       var e = el['output-parameters']
            //       return e['rho_eul_avg_timepoints']
            // })
            const rho_lags = dataRegistry.reduce((res, el) => {
                  // console.log(el)
                  if(el['output-parameters'] !== undefined){
                        var e = el['output-parameters']
                        res.push(e['rho_lag_avg_timepoints'])
                  }
                  
                  return res
            }, [])
            
            const p_euls = dataRegistry.reduce((res, el) => {
                  // console.log(el)
                  if(el['output-parameters'] !== undefined){
                        var e = el['output-parameters']
                        res.push(e['p_eul_avg_timepoints'])
                  }
                  
                  return res
            }, [])
            const k_euls = dataRegistry.reduce((res, el) => {
                  // console.log(el)
                  if(el['output-parameters'] !== undefined){
                        // console.log('c')
                        var e = el['output-parameters']
                        res.push(e['k_eul_avg_timepoints'])
                  }
                  
                  return res
            }, [])



            // console.log(this.contrailMembers)
            create_tendril_plot(T_lags, 15, 100, [{ x: 15, y: 100 }], 'T_lag_avg', ids, get_mean_attr_val(T_lags), members)
            create_tendril_plot(T_euls, 15, 200, [{ x: 15, y: 200 }], 'T_eul_avg', ids, get_mean_attr_val(T_euls), members)
            create_tendril_plot(d_lags, 15, 320, [{ x: 15, y: 320 }], 'd_lag_avg', ids, get_mean_attr_val(d_lags), members)
            // create_tendril_plot(rho_lags, 15, 440, [{ x: 15, y: 440 }], 'rho_lag_avg', ids, get_mean_attr_val(rho_lags), members)
            // create_tendril_plot(rho_euls, 15, 580, [{ x: 15, y: 580 }], 'rho_eul_avg', ids, get_mean_attr_val(rho_euls), members)
            create_tendril_plot(k_euls, 15, 440, [{ x: 15, y: 440 }], 'k_eul_avg', ids, get_mean_attr_val(k_euls), members)
            create_tendril_plot(p_euls, 15, 560, [{ x: 15, y: 560 }], 'p_eul_avg', ids, get_mean_attr_val(p_euls), members)

           
      }

      update(data, split, top, bottom) {
            let el = this
            // console.log(el.element)
            d3.select(el.element).select('svg').remove()

            // let updatedData = []

            // console.log(top, bottom)
            let filtered_d = data.filter(d => d['id'] !== top && d['id'] !== bottom && d['id'] !== 20)
            // console.log(filtered_d)
            // console.log(data)
            let topdata = data.filter(d => d['id'] == top)[0]
            let bottomdata = data.filter(d => d['id'] == bottom)[0]
            if(topdata !==undefined && bottomdata !== undefined){
                  filtered_d.push(topdata)
            filtered_d.push(bottomdata)
                  
            }
            
            // console.log(filtered_d)

            this.contrailMembers = [top, bottom]
            this.draw_tendrils(el.element, filtered_d, split, this.contrailMembers)

      }

}

