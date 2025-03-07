import * as THREE from 'three';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

let container, camera, scene, renderer, effect, model;

container = document.createElement('div');
document.body.appendChild(container);

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

effect = new PeppersGhostEffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
effect.cameraDistance = 10;
window.addEventListener('resize', onWindowResize);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);

scene = new THREE.Scene();

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
hemiLight.color.setHSL(10, 10, 10);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x7fffd4 });
const cube = new THREE.Mesh(geometry, material);

const gltfLoader = new GLTFLoader();
gltfLoader.load('models/floating_fox.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.scale.set(0.50, 0.50, 0.50);
    model.position.set(0, 0, 0);
}, 
(xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'), 
(error) => console.error('Error cargando GLTF:', error)
);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    cube.rotation.y += 0.05;
    if (model) model.rotation.y += 0.05;
    effect.render(scene, camera);
}