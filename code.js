import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js'
import {GLTFLoader} from './examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

//Referenzieren des Canvas-Elements
const canvasED = document.querySelector('.webgl');

//Boiler-Plate Code
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

//Basiskomponenten erzeugen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 25);
const renderer = new THREE.WebGL1Renderer({
	canvas: canvasED
});

//Szeneneinstellungen
//scene.background = new THREE.Color(0x488ccc);

//Licht erstellen
const light = new THREE.DirectionalLight(0xffffff, 2);
const light2 = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);
scene.add(light2);

//Kameraeinstellungen
camera.position.set(0,1.4,1.4);
scene.add(camera);

//Renderereinstellungen
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput;


//GLTF-Loader
const loader = new GLTFLoader();
loader.load('Resources/human_bomber.glb', function (glb){
	console.log(glb);
	const root = glb.scene;
	root.scale.set(0.3,0.3,0.3);
	scene.add(root);
}, function(xhr){
	console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
	console.log("An error occured")
});

//Orbitcontrols
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 5;
controls.maxPolarAngle = Math.PI / 2;
controls.update()

//Szene rendern lassen
function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
};

animate();