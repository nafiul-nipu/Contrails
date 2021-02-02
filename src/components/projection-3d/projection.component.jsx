import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dataRegistry from '../data-component/dataRegistry.json'

import * as d3 from 'd3'
import * as dat from 'dat.gui'
import { VertexColors } from 'three';
import $ from 'jquery'

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
        // this.camera.position.x = 12;
        // this.camera.position.y = 11;
        // this.camera.position.z = 500; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.renderer = new THREE.WebGLRenderer();
        // this.renderer.setClearColor('hsl(0, 0%, 0%)', 0);
        this.renderer.setSize(width, height);
        // this.renderer.setPixelRatio(window.devicePixelRatio)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.addEventListener('change', this.startAnimationLoop)

        // this.gui = new dat.GUI();

        // let cam = this.gui.addFolder('Camere');
        // cam.add(this.camera.position, 'x', -500, 500).listen();
        // cam.add(this.camera.position, 'y', -500, 500).listen();
        // cam.add(this.camera.position, 'z', -500, 500).listen();
        // cam.open();

        // this.camera.position.x = 5;
        // this.camera.position.y = 100;
        // this.camera.position.set(4,0,40);
        // this.controls.target.set(4,0,40);

        // this.controls.update()

        canvasName.appendChild(this.renderer.domElement); // mount using React ref
      };
    

      //adding the particle system
      addCustomSceneObjects = (data, domainData, member) => {
        let memberPosition = dataRegistry[(member - 1)].position;
        // console.log(memberPosition)
        this.camera.position.x = memberPosition.x;
        this.camera.position.y = memberPosition.y;
        this.camera.position.z = memberPosition.z;
        // this.camera.lookAt (new THREE.Vector3(-5,0,0));

        this.controls.update()

        this.tempColor = ["#fff5f0","#67000d"]
        let tempscaling = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([domainData.min, domainData.max])
                        .range(this.tempColor);

        // console.log(tempscaling(292))

        // console.log(this.props.data)
        let geometry = new THREE.BufferGeometry();
        let positions = [];
        let colors = []
        // console.log(data)
        data.forEach(function(d){ 
          positions.push(d.x, d.y, d.z)
        //   geometry.vertices.push(new Float32Array([d.x, d.y, d.z]));
          let rgb = tempscaling(d.temp)
          let color = new THREE.Color(rgb);
          // console.log(color)
          colors.push(color.r, color.g, color.b);
        })
        // console.log(colors)
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.computeBoundingSphere();
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
        // this.cube.position.x = memberPosition.x
        // this.cube.position.y = memberPosition.y
        // this.cube.position.z = memberPosition.z
        this.scene.add(this.cube);

        // this.controls.target.set(this.cube.position.x, this.cube.position.y, this.cube.position.z);


    
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

        // let cam = this.gui.addFolder('Object');
        // cam.add(this.cube.position, 'x', -100, 20).listen();
        // cam.add(this.cube.position, 'y', -20, 20).listen();
        // cam.add(this.cube.position, 'z', -300, 15).listen();
        // cam.open();

        // let orb = this.gui.addFolder('orbit')
        // orb.add(this.controls.target.position, 'x', -100, 20).listen();
        // orb.add(this.controls.target.position, 'y', -20, 20).listen();
        // orb.add(this.controls.target.position, 'z', -300, 15).listen();
        // orb.open();

        // setTimeout(this.startAnimationLoop(), 5000)
        this.startAnimationLoop()

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
        // this.controls.update()
    
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
