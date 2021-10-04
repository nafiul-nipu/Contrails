import React from 'react';
import * as d3 from 'd3'
import $ from 'jquery'

import {vec2, vec3, mat4} from 'gl-matrix'

import {vertShader, fragShader} from "./shader-srcs.js"

import {Shader,ArcballCamera,Controller} from "./webgl-util.js"

import {getData, loader} from './dataHandler.js'

import DropDowns from './dropdowns.component'

import dataRegistry from '../data-component/dataRegistry.json'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import './volume-rendering.css'

class VolumeRendering extends React.Component {
    constructor(){
        super();

        this.cubeStrip = [
          1, 1, 0,
          0, 1, 0,
          1, 1, 1,
          0, 1, 1,
          0, 0, 1,
          0, 1, 0,
          0, 0, 0,
          1, 1, 0,
          1, 0, 0,
          1, 1, 1,
          1, 0, 1,
          0, 0, 1,
          1, 0, 0,
          0, 0, 0
        ];

        this.canvas = null;
        this.gl = null;
        this.shader = null;
        this.volumeTexture = null;
        this.colormapTex = null;

        this.proj = null;
        this.camera = null;
        this.projView = null;
        this.tabFocused = true;
        this.newVolumeUpload = true;
        this.targetFrameTime = 32;
        this.samplingRate = 0.2;
        this.WIDTH = 640;
        this.HEIGHT = 480;

        this.defaultEye = vec3.set(vec3.create(), 0.5, 0.5, 1.7);
        this.center = vec3.set(vec3.create(), 0.5, 0.5, 0.5);
        this.up = vec3.set(vec3.create(), 0.0, 1.0, 0.0);


        this.colormaps = {
          "Cool_Warm": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/cool-warm-paraview.png",
          "Matplotlib_Plasma": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/matplotlib-plasma.png",
          "Matplotlib_Virdis": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/matplotlib-virdis.png",
          // "Rainbow": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/rainbow.png",
          // "Samsel_Linear_Green": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/samsel-linear-green.png",
          // "Samsel_Linear_YGB_1211G": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/samsel-linear-ygb-1211g.png",
          "cm_gray": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/cm_gray.png",
          "cm_virdis": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/cm_viridis.png",
        };

        this.canvas = React.createRef();

        this.data = []
    }  
    
    componentDidMount(){
      // console.log(this.props.renderArea)
      const self = this

      if(this.props.renderArea === 'top'){
        loader(17, 0.06, 'temp').then(function(){
          self.data = getData();

          self.onLoad()
          self.selectVolume(self.data)
        })
      }else if (this.props.renderArea === 'bottom'){
        loader(19, 0.06, 'temp').then(function(){
          self.data = getData();

          self.onLoad()
          self.selectVolume(self.data)
        })

      }
      
    }

    onLoad = () =>{
      const self = this;
      // get container dimensions and use them for scene sizing
      const width = d3.select(`.threeContainer${this.props.renderArea}`).node().clientWidth;
      const height = d3.select(`.threeContainer${this.props.renderArea}`).node().clientHeight;

      const svg = d3.select(`.threeContainer${this.props.renderArea}`).append('svg')
                                  .attr('id', "axesSVG")
                                  .attr('width', 200)
                                  .attr("height", 200)
      svg.append('line')
          .style("stroke", "green")
          .style("stroke-width", 3)
          .attr("x1", 100)
          .attr("y1", 50)
          .attr("x2", 60)
          .attr("y2", 75)
      svg.append('text')
          .attr('x', 70)
          .attr("y", 85)
          .text('Z')
          .attr("fill", '#05ecec')

      svg.append('line')
          .style("stroke", "red")
          .style("stroke-width", 2)
          .attr("x1", 100)
          .attr("y1", 50)
          .attr("x2", 100)
          .attr("y2", 0)

          svg.append('text')
          .attr('x', 155)
          .attr("y", 50)
          .text('X')
          .attr("fill", '#05ecec')


      svg.append('line')
          .style("stroke", "yellow")
          .style("stroke-width", 2)
          .attr("x1", 100)
          .attr("y1", 50)
          .attr("x2", 150)
          .attr("y2", 50)

          svg.append('text')
          .attr('x', 110)
          .attr("y", 10)
          .text('Y')
          .attr("fill", '#05ecec')


      d3.select(`.threeContainer${this.props.renderArea}`).append('canvas')
                            .attr('width', width)
                            .attr('height', height)
                            .attr('id', `glcanvas${this.props.renderArea}`)

      // d3.select(`.threeContainer${this.props.renderArea}`).append('canvas')
      //                       .attr('width', 250)
      //                       .attr('height', 250)
      //                       .attr('id', `svgcanvas${this.props.renderArea}`)

      this.canvas = document.getElementById(`glcanvas${this.props.renderArea}`)
      this.gl = this.canvas.getContext("webgl2")

      // let svgC = document.getElementById(`svgcanvas${this.props.renderArea}`)
      // let ctx = svgC.getContext('2d')
      // var img = new Image();
      // img.onload = function() {
      //   ctx.drawImage(img, 0, 0);
      // }
      // img.crossOrigin = "anonymous"
      // img.src = "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/axes.png";

      if(!this.gl){
        console.log("Unable to initialize WebGL2. Your browser may not support it");
		    return;
      }

      this.WIDTH = this.canvas.getAttribute("width");
      this.HEIGHT = this.canvas.getAttribute("height");

      // console.log(this.WIDTH, this.HEIGHT)

      this.proj = mat4.perspective(mat4.create(), 60 * Math.PI / 180.0,
        this.WIDTH / this.HEIGHT, 0.1, 100);
      // console.log(this.proj)

      this.camera = new ArcballCamera(this.defaultEye, this.center, this.up, 2, [this.WIDTH, this.HEIGHT]);
      this.projView = mat4.create();

      // Register mouse and touch listeners
      let controller = new Controller();
      controller.mousemove = function(prev, cur, evt) {
        if (evt.buttons == 1) {
          self.camera.rotate(prev, cur);

        } else if (evt.buttons == 2) {
          self.camera.pan([cur[0] - prev[0], prev[1] - cur[1]]);
        }
      };
      controller.wheel = function(amt) { self.camera.zoom(amt); };
      controller.pinch = controller.wheel;
      controller.twoFingerDrag = function(drag) { this.camera.pan(drag); };

      controller.registerForCanvas(this.canvas);


      // Setup VAO and VBO to render the cube to run the raymarching shader
      let vao = this.gl.createVertexArray();
      this.gl.bindVertexArray(vao);

      let vbo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.cubeStrip), this.gl.STATIC_DRAW);

      this.gl.enableVertexAttribArray(0);
      this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);

      this.shader = new Shader(this.gl, vertShader, fragShader);
      this.shader.use(this.gl);

      this.gl.uniform1i(this.shader.uniforms["volume"], 0);
      this.gl.uniform1i(this.shader.uniforms["colormap"], 1);
      this.gl.uniform1f(this.shader.uniforms["dt_scale"], this.samplingRate);

      // Setup required OpenGL state for drawing the back faces and
      // composting with the background color
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.cullFace(this.gl.FRONT);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

      // See if we were linked to a datset
      // if (window.location.hash) {
      // 	console.log(window.location.hash)
      // 	var linkedDataset = decodeURI(window.location.hash.substr(1));
      // 	if (linkedDataset in volumes) {
      // 		document.getElementById("volumeList").value = linkedDataset;
      // 	}
      // }

      // Load the default colormap and upload it, after which we
      // load the default volume.
      let colormapImage = new Image();
      colormapImage.onload = function() {
        // console.log("colormapImage")
        let colormap = self.gl.createTexture();
        self.gl.activeTexture(self.gl.TEXTURE1);
        self.gl.bindTexture(self.gl.TEXTURE_2D, colormap);
        self.gl.texStorage2D(self.gl.TEXTURE_2D, 1, self.gl.SRGB8_ALPHA8, 180, 1);
        self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_MIN_FILTER, self.gl.LINEAR);
        self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_WRAP_R, self.gl.CLAMP_TO_EDGE);
        self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_WRAP_S, self.gl.CLAMP_TO_EDGE);
        self.gl.texSubImage2D(self.gl.TEXTURE_2D, 0, 0, 0, 180, 1,
          self.gl.RGBA, self.gl.UNSIGNED_BYTE, colormapImage);

        // self.selectVolume();
      };

      colormapImage.crossOrigin = "anonymous";
      colormapImage.src = 'https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/cool-warm-paraview.png';

      // console.log(colormapImage)

    }

    selectVolume = (data) =>{
      const self = this;
      let dataBuffer = data;
      const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
      // console.log(data)
      // console.log(countOccurrences(dataBuffer, 0));
      //our data dimension is 100 can change later
      // console.log(($(`#member${self.props.renderArea}`).val()))
      let member = +($(`#member${self.props.renderArea}`).val());
      // console.log(member)
      
      if(isNaN(member) && self.props.renderArea === 'top'){
        member = 1
        // volDims = [100,100,100]
      }else if (isNaN(member) && self.props.renderArea === 'bottom'){
        member = 6
        // volDims = [100,100,100]
      }
      let volDims = dataRegistry[member - 1].volume_dimensions;
      // console.log(member)
      // console.log(volDims)
      

      let tex = this.gl.createTexture();
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_3D, tex);
      this.gl.texStorage3D(this.gl.TEXTURE_3D, 1, this.gl.R8, volDims[0], volDims[1], volDims[2]);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_R, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texSubImage3D(this.gl.TEXTURE_3D, 0, 0, 0, 0,
        volDims[0], volDims[1], volDims[2],
        this.gl.RED, this.gl.UNSIGNED_BYTE, dataBuffer);

      let longestAxis = Math.max(volDims[0], Math.max(volDims[1], volDims[2]));
      let volScale = [volDims[0] / longestAxis, volDims[1] / longestAxis,
        volDims[2] / longestAxis];

      this.gl.uniform3iv(this.shader.uniforms["volume_dims"], volDims);
      this.gl.uniform3fv(this.shader.uniforms["volume_scale"], volScale);

      this.newVolumeUpload = true;
      if (!this.volumeTexture) {
        this.volumeTexture = tex;
        setInterval(function() {
          // Save them some battery if they're not viewing the tab
          if (document.hidden) {
            return;
          }
          // var startTime = performance.now();
          self.gl.clearColor(0.192, 0.223, 0.247, 1.0);
          self.gl.clear(self.gl.COLOR_BUFFER_BIT);

          // Reset the sampling rate and camera for new volumes
          if (self.newVolumeUpload) {
            self.camera = new ArcballCamera(self.defaultEye, self.center, self.up, 2, [self.WIDTH, self.HEIGHT]);
            // self.samplingRate = 0.2;
            self.gl.uniform1f(self.shader.uniforms["dt_scale"], self.samplingRate);
          }
          self.projView = mat4.mul(self.projView, self.proj, self.camera.camera);
          self.gl.uniformMatrix4fv(self.shader.uniforms["proj_view"], false, self.projView);

          let eye = [self.camera.invCamera[12], self.camera.invCamera[13], self.camera.invCamera[14]];
          self.gl.uniform3fv(self.shader.uniforms["eye_pos"], eye);

          self.gl.drawArrays(self.gl.TRIANGLE_STRIP, 0, self.cubeStrip.length / 3);

          // self.gl.drawArrays(self.gl.LINES, 0, 6);

          // Wait for rendering to actually finish
          self.gl.finish();
          // let endTime = performance.now();
          // let renderTime = endTime - startTime;
          // let targetSamplingRate = renderTime / self.targetFrameTime;


          // If we're dropping frames, decrease the sampling rate
          // if (!self.newVolumeUpload && targetSamplingRate > self.samplingRate) {
          //   self.samplingRate = 0.8 * self.samplingRate + 0.2 * targetSamplingRate;
          //   self.gl.uniform1f(self.shader.uniforms["dt_scale"], self.samplingRate);
          // }

          self.newVolumeUpload = false;
          // startTime = endTime;
        }, self.targetFrameTime);
      
      } else {
        this.gl.deleteTexture(this.volumeTexture);
        this.volumeTexture = tex;
      }



    }

    selectColormap = (selection) => {
      // console.log("color map")
      const self = this;
      let colormapImage = new Image();
      colormapImage.onload = function() {
        self.gl.activeTexture(self.gl.TEXTURE1);
        self.gl.texSubImage2D(self.gl.TEXTURE_2D, 0, 0, 0, 180, 1,
        self.gl.RGBA, self.gl.UNSIGNED_BYTE, colormapImage);
      };
      colormapImage.crossOrigin = "anonymous";
      colormapImage.src = self.colormaps[selection];
    }

      render(){
        if(!this.data){
          return(
            <div>data loading</div>
          )
        }else{
          return(
            <Row>
              <Col xs={12} style={{paddingTop:'10px'}}>
                <Row>
                  <DropDowns
                    area={this.props.renderArea}
                    colormaps={this.colormaps}
                    data={this.data}
                    selectColormap={this.selectColormap}
                    volumeRender={this.selectVolume}
                  /> 
                </Row>
                <Row>
                    <Col xs={12} style={{height:'55vh', backgroundColor:'#31393F'}} className={`threeContainer${this.props.renderArea}`}>
                    {/* <img src={axes} /> */}
                    </Col>                                    
                </Row>
            </Col>
          </Row>
          )

        }
        
      }

    }

    

export default VolumeRendering;