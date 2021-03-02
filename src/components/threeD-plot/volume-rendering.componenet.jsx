import React from 'react';
import * as d3 from 'd3'

import {vec3, mat4} from 'gl-matrix'

import {vertShader, fragShader} from "./shader-srcs.js"

import {Shader,ArcballCamera,clamp,Buffer,Controller} from "./webgl-util.js"

import coolWarm from './colormaps/cool-warm-paraview.png'

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
        this.samplingRate = 1.0;
        this.WIDTH = 640;
        this.HEIGHT = 480;

        this.defaultEye = vec3.set(vec3.create(), 0.5, 0.5, 1.5);
        this.center = vec3.set(vec3.create(), 0.5, 0.5, 0.5);
        this.up = vec3.set(vec3.create(), 0.0, 1.0, 0.0);

        this.canvas = React.createRef();
    }  
    
    componentDidMount(){
      this.onLoad()
      
    }

    onLoad = () =>{
      // get container dimensions and use them for scene sizing
      const width = d3.select(this.props.parentId).node().clientWidth;
      const height = d3.select(this.props.parentId).node().clientHeight;

      d3.select(`.${this.props.area}`).append('canvas')
                            .attr('width', width)
                            .attr('height', height)
                            .attr('id', `glcanvas${this.props.area}`)

      this.canvas = document.getElementById(`glcanvas${this.props.area}`)
      this.gl = this.canvas.getContext("webgl2")

      if(!this.gl){
        console.log("Unable to initialize WebGL2. Your browser may not support it");
		    return;
      }

      this.WIDTH = this.canvas.getAttribute("width");
      this.HEIGHT = this.canvas.getAttribute("height");

      console.log(this.WIDTH, this.HEIGHT)

      this.proj = mat4.perspective(mat4.create(), 60 * Math.PI / 180.0,
        this.WIDTH / this.HEIGHT, 0.1, 100);

      this.camera = new ArcballCamera(this.defaultEye, this.center, this.up, 2, [this.WIDTH, this.HEIGHT]);
      this.projView = mat4.create();

      // Register mouse and touch listeners
      let controller = new Controller();
      controller.mousemove = function(prev, cur, evt) {
        if (evt.buttons == 1) {
          this.camera.rotate(prev, cur);

        } else if (evt.buttons == 2) {
          this.camera.pan([cur[0] - prev[0], prev[1] - cur[1]]);
        }
      };
      controller.wheel = function(amt) { this.camera.zoom(amt); };
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
      this.gl.uniform1f(this.shader.uniforms["dt_scale"], 1.0);

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
        let colormap = this.gl.createTexture();
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, colormap);
        this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, this.gl.SRGB8_ALPHA8, 180, 1);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_R, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, 180, 1,
          this.gl.RGBA, this.gl.UNSIGNED_BYTE, colormapImage);

        // selectVolume();
      };
      colormapImage.src = 'https://github.com/CarlaFloricel/Contrails/blob/nafiul-testing/src/components/threeD-plot/colormaps/cool-warm-paraview.png';


    }

      render(){
        return(
            <div className={this.props.area}></div>
        )
      }

    }

    

export default VolumeRendering;