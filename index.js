import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertex from "./shader/vertex.glsl"
import fragment from "./shader/fragment.glsl"

// init

export default class Sketch {
  constructor(options) {
    this.container = options.domElement;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10
    );
    
    this.camera.position.z = 1.3;

    this.scene = new THREE.Scene();
    // this.renderer.physicallyCorrectLights = true
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = false

    this.time = 0
    this.resize()
    this.addObject()
    this.setupResize()
    this.render()
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  addObject() {
    this.material = new THREE.MeshNormalMaterial();
    this.geometry = new THREE.SphereBufferGeometry(1.3, 40, 19)
    this.material = new THREE.ShaderMaterial({
      uniforms: {

        time: { value: 1.9 },
        resolution: { value: new THREE.Vector2() }
    
      },
    //   wireframe: true,
        side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);



  }

  

  render() {
    this.time += 0.01;
    // this.mesh.rotation.x = this.time / 2000;
    // this.mesh.rotation.y = this.time / 1000;
    this.material.uniforms.time.value = this.time;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  domElement: document.querySelector("#container"),
});

// animation
