import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import particleData from '../data-component/particleData';
import * as d3 from 'd3'

const style = {
    height: 240 // we can control scene size by setting container dimensions
  };

class Projection3D extends React.Component {
    componentDidMount() {
        this.sceneSetup();
        const url = 'https://raw.githubusercontent.com/nafiul-nipu/High-Performance-Contrails-Visualization/master/particles/timestep_21.csv'
        this.addCustomSceneObjects(url);        
        window.addEventListener("resize", this.handleWindowResize);
      }
    
      componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
      }
    
      // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
      // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
      sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;
    
        this.scene = new THREE.Scene();

        //camera
        const fieldOfView = 4;
        const aspect = width / height;
        const near = 0.5;
        const far = 1000;


        this.camera = new THREE.PerspectiveCamera(
          fieldOfView, // fov = field of view
          width / height, // aspect ratio
          near, // near plane
          far // far plane
        );
        // this.camera.position.x = 30;
        // this.camera.position.y = 10
        this.camera.position.z = 40; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.el);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.el.appendChild(this.renderer.domElement); // mount using React ref
      };
    
      // Here should come custom code.
      // Code below is taken from Three.js BoxGeometry example
      // https://threejs.org/docs/#api/en/geometries/BoxGeometry
      addCustomSceneObjects = (url) => {
        this.data = []
        // const url = 'https://raw.githubusercontent.com/nafiul-nipu/High-Performance-Contrails-Visualization/master/particles/timestep_21.csv'
        d3.csv(url, d => {
            this.data.push({
                x: parseFloat(d['Points:0']),
                y: parseFloat(d['Points:1']),
                z: parseFloat(d['Points:2'])
            });
        }).then(() =>{
            console.log(this.data)
            // console.log(this.props.data)
            const geometry = new THREE.Geometry();
            const material = new THREE.PointsMaterial({
              color: 0x156289,
              // emissive: 0x072534,
              size: 0.2
              // side: THREE.DoubleSide,
              // flatShading: true
            });

            this.data.forEach(function(d){ 
              let particle = new THREE.Vector3(d.x, d.y, d.z);
              geometry.vertices.push(particle)

            })
            
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

            this.startAnimationLoop();
            })
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
    
      handleWindowResize = () => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;
    
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
    
        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
      };

      test = () => {
        return 5
      }
    
      render() {
        // console.log(this.props.data)
        return <div style={style} ref={ref => (this.el = ref)} />;
      }
    }

export default Projection3D;
