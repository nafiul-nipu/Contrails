import { getDefaultNormalizer } from '@testing-library/react';
import * as d3 from 'd3';
import $ from 'jquery'

const height = 900
const url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class InputParametersD3 {


  constructor(element, data) {
    this.element = element
    this.data = data
    this.draw_airplane(element, data)
  }

  draw_airplane(element, new_data) {
    const data = new_data
    const width = d3.select(element).node().parentNode.clientWidth
    const height = 170
    const svg = d3.select(element)
      .append("svg")
      .attr("width", d3.select(element).node().parentNode.clientWidth)
      .attr("height", data.length* height)

    svg.append("text").text("Members' Input Parameters")
      .attr('transform', `translate(${width /15},20)`)
      .attr("fill", '#05ecec')

    const group = svg.append('g')

    function draw_aircraft_engine(x, y, data, id) {
      const color = data == "one" ? '#b2182b' : "#d6604d"
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
        .on('mouseover', function () {
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')

          d3.select(this)
            .append("title")
            .text("Aircraft engine:" + data)
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }
    function draw_geometry(x, y, data, id) {
      const color = data == "short" ? '#1a9850' : data == "cowl" ? "#66bd63" : "#a6d96a"
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
        .on('mouseover', function () {
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          d3.select(this)
            .append("title")
            .text("Geometry: " + data)
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
        })

    }

    function draw_scope(x, y, data, id) {
      const color = data == "nozzle" ? "#542788" : "#8073ac"
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
        .on('mouseover', function () {
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          d3.select(this)
            .append("title")
            .text("Scope: " + data)
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
        })

    }

    function draw_grid(x, y, data, id) {
      const color = data == "coase" ? '#92c5de' : data == "medium" ? "#4393c3" : "#2166ac"
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
        .on('mouseover', function () {
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          d3.select(this)
            .append("title")
            .text("Grid: " + data)
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }
    function draw_solution(x, y, data, id) {
      const color = data == "coupled" ? '#bebebe' : "#bebebe"
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
        .on('mouseover', function () {
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          d3.select(this)
            .append("title")
            .text("Solution: " + data)
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
        group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x+4)
        .attr("y", y + 17)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('uncoupled') ? 0 : 1)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Solution: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }
    function draw_turbulence(x, y, data, id) {
      const color = data == "kOmegaSST" ? '#F1B900' : "#fee08b"
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
        .on('mouseover', function () {
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          d3.select(this)
            .append("title")
            .text("Turbulence model: " + data)
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }


    function draw_boundary_T(x, y, data, id) {
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 12)
        .attr("height", 5 * 12 + 1)
        .attr("fill", '#bebebe')

      group.append('rect')
        .attr("x", x)
        .attr("y", y + 12)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')
      group.append('rect')
        .attr("x", x)
        .attr("y", y + 24)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')
      group.append('rect')
        .attr("x", x)
        .attr("y", y + 36)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')
      group.append('rect')
        .attr("x", x)
        .attr("y", y + 48)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')

      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 12)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('engine') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition T: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 24)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('farfield') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition T: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 36)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('nozzle') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition T: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 48)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('outlet') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition T: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 60)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('turbine') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition T: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }



    function draw_boundary_U(x, y, data, id) {
      group.append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 12)
        .attr("height", 3 * 12)
        .attr("fill", '#bebebe')

      group.append('rect')
        .attr("x", x)
        .attr("y", y + 12 + 1)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')
      group.append('rect')
        .attr("x", x)
        .attr("y", y + 24)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')

      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 12)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('inlet') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition U: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 24)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('nozzle') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition U: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y + 36)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('outlet') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition U: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }

    function draw_boundary_p(x, y, data, id) {
      group.append('rect')
        .attr("x", x)
        .attr("y", y - 2 * 12 - 1)
        .attr("width", 12)
        .attr("height", 2 * 12 + 1)
        .attr("fill", '#bebebe')

      group.append('rect')
        .attr("x", x)
        .attr("y", y - 12)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')

      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('nozzle') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition p: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y - 12)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('outlet') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition p: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })


    }



    function draw_boundary_k(x, y, data, id) {
      group.append('rect')
        .attr("x", x)
        .attr("y", y - 2 * 12 - 1)
        .attr("width", 12)
        .attr("height", 2 * 12 + 1)
        .attr("fill", '#bebebe')

      group.append('rect')
        .attr("x", x)
        .attr("y", y - 12)
        .attr("width", 12)
        .attr("height", 1)
        .attr("fill", '#31393f')

      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('inlet') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition k: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y - 12)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('nozzle') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition k: " + data)
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })

    }

    function draw_boundary_rho(x, y, data, id) {
      group.append('rect')
        .attr("x", x)
        .attr("y", y - 1 * 12 - 1)
        .attr("width", 12)
        .attr("height", 1 * 12 + 1)
        .attr("fill", '#bebebe')
      group.append('text')
        .text("x")
        .attr("color", 'black')
        .attr("x", x)
        .attr("y", y)
        .attr("font-size", 'x-large')
        .attr('opacity', data.includes('nozzle') ? 1 : 0)
        .style("cursor", "default")
        .on('mouseover', function () {
          $(`.cluster_airplane_${id}`).css("fill", '#05ecec')
          $('.tendrils').css("opacity", '0.2')
          $('.circles').css("opacity", '0.2')
          $(`.path_${id}_`).css("stroke-width", '2.8')
                .css('opacity', 1)
          $(`.circle_${id}`).css("opacity", '1')
          d3.select(this)
            .append("title")
            .text("Boundary Condition rho: " + data)
            
            
        })
        .on('mouseout', function () {
          d3.selectAll('title').remove()
          $('.tendrils').css("opacity", '1')
          $('.circles').css("opacity", '0.65')
          $(`.cluster_airplane_${id}`).css("fill", 'white')
        })


    }

    for (var i = 0; i < data.length; i++) {
      group.append('rect')
        .attr("x", 40)
        .attr("y", height * i+ 42)
        .attr("class", "highlight_"+data[i]['id'])
        .attr("width", 150)
        .attr("height", 120)
        .attr("fill", 'grey')
        .attr('opacity', 0)
        .attr('rx', '15')
      draw_aircraft_engine(50, height * i + height / 2 - 10, data[i]['input-parameters']['aircraft-engine'], data[i]['id'])
      draw_geometry(71, height * i + height / 2 - 10, data[i]['input-parameters']['geometry'], data[i]['id'])
      draw_scope(92, height * i + height / 2 - 10, data[i]['input-parameters']['scope'], data[i]['id'])
      draw_grid(134, height * i + height / 2 - 10, data[i]['input-parameters']['grid'], data[i]['id'])
      draw_solution(155, height * i + height / 2 - 10, data[i]['input-parameters']['solution'], data[i]['id'])
      draw_turbulence(113, height * i + height / 2 - 10, data[i]['input-parameters']['turbulence'], data[i]['id'])

      draw_boundary_T(52, (height * i) + height / 2 + 11, data[i]['input-parameters']['boundary-conditions']['T'], data[i]['id'])
      draw_boundary_U(96, (height * i) + height / 2 + 11, data[i]['input-parameters']['boundary-conditions']['U'], data[i]['id'])
      draw_boundary_p(75, (height * i) + height / 2 - 11, data[i]['input-parameters']['boundary-conditions']['p'], data[i]['id'])
      draw_boundary_k(117, (height * i) + height / 2 - 11, data[i]['input-parameters']['boundary-conditions']['k'], data[i]['id'])
      // draw_boundary_rho(110, height * i + height / 2 - 11, data[i]['input-parameters']['boundary-conditions']['rho'], data[i]['id'])



    }


  }

  update(data) {
    let vis = this
    d3.select(vis.element).select('svg').remove()
    this.draw_airplane(vis.element, data)

  }

}

