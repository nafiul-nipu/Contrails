import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as d3 from 'd3'
import * as dat from 'dat.gui'
import { VertexColors } from 'three';

const style = {
    height: 240 // we can control scene size by setting container dimensions
  };

class Projection extends React.Component {
    constructor(){
        super();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.gui = null;
    }    

      // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
      // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
      sceneSetup = (containerName, canvasName) => {
        // get container dimensions and use them for scene sizing
        const width = d3.select(containerName).node().clientWidth
        // console.log(width)
        const height = d3.select(containerName).node().clientHeight;
        // console.log(height)
    
        this.scene = new THREE.Scene();
        // var scene = new THREE.Scene(); // initialising the scene
        this.scene.background = new THREE.Color( 0x31393F );

        //camera
        const fieldOfView = 4;
        const aspect = width / height;
        const near = 0.5;
        const far = 1000;


        this.camera = new THREE.PerspectiveCamera(
          fieldOfView, // fov = field of view
          aspect, // aspect ratio
          near, // near plane
          far // far plane
        );
        // this.camera.position.x = 5;
        // this.camera.position.y = 100;
        this.camera.position.z = 40; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.renderer = new THREE.WebGLRenderer();
        // this.renderer.setClearColor('hsl(0, 0%, 0%)', 0);
        this.renderer.setSize(width, height);
        // this.renderer.setPixelRatio(window.devicePixelRatio)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


        canvasName.appendChild(this.renderer.domElement); // mount using React ref
      };
    

      //adding the particle system
      addCustomSceneObjects = (data, domainData) => {
        this.tempColor = ["#fff5f0","#67000d"]
        // console.log(domainData)
        let tempscaling = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([domainData.min, domainData.max])
                        .range(this.tempColor);

        // console.log(tempscaling(292))

        // console.log(this.props.data)
        let geometry = new THREE.Geometry();
        // console.log(data)
        data.forEach(function(d){ 
          geometry.vertices.push(new THREE.Vector3(d.x, d.y, d.z));
          let color = tempscaling(d.temp)
        //   console.log(color)
          geometry.colors.push(new THREE.Color(color));
        })
        if(this.cube){
          this.scene.remove(this.cube)
        }
        
        let material = new THREE.PointsMaterial({
            //   color: 0x156289,
              // emissive: 0x072534,
              size: 0.2,
              // side: THREE.DoubleSide,
              // flatShading: true
              vertexColors: true
            });

        this.cube = new THREE.Points(geometry, material);
        this.scene.add(this.cube);


    
        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
    
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);

        // this.gui = new dat.GUI();

        // let cam = this.gui.addFolder('Camere');
        // cam.add(this.camera.position, 'x', 0, 20).listen();
        // cam.add(this.camera.position, 'y', 0, 20).listen();
        // cam.add(this.camera.position, 'z', 0, 100).listen();
        // cam.open();

        setTimeout(this.startAnimationLoop(), 5000)
        // this.startAnimationLoop()

        // setTimeout(this.startAnimationLoop, (function rec(pass) {
        //   if (pass < 3) {
        //       // if (startup) {
        //       //     document.body.style.cursor = 'default';
        //       //     document.body.style.visibility = 'visible';
        //       // }
        //       this.startAnimationLoop();
        //       console.log(this.startAnimationLoop, setTimeout(rec, 500, pass + 1))
        //       setTimeout(this.startAnimationLoop, rec, 500, pass + 1);
        //   }
        // }), 500, 0);
        
      };
    
      startAnimationLoop = () => {
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
    
        this.renderer.render(this.scene, this.camera);
    
        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
      };
    
      handleWindowResize = (containerName) => {
        const width = d3.select(containerName).node().clientWidth
        // console.log(width)
        const height = d3.select(containerName).node().clientHeight;
    
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
    
        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
      };

      widnowResizeHandler = (containerName) => {
        window.addEventListener("resize", this.handleWindowResize(containerName));
      }
    }

export default Projection;
