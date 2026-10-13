import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function crearEscena(idContenedor, geometria, color, usarControles) {

    const contenedor = document.getElementById(idContenedor);
    const ancho = contenedor.clientWidth; 
    const alto = contenedor.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, ancho / alto, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(ancho, alto);
    contenedor.appendChild(renderer.domElement); 

    const luzAmbiente = new THREE.AmbientLight('#ffffff', 0.6);
    scene.add(luzAmbiente);

    const luzDireccional = new THREE.DirectionalLight('#ffffff', 1);
    luzDireccional.position.set(5, 5, 5);
    scene.add(luzDireccional);

    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.3,
        roughness: 0.4
    });
    
    const figura = new THREE.Mesh(geometria, material);
    scene.add(figura);

    let controls = null;
    if (usarControles) {
        controls = new OrbitControls(camera, renderer.domElement);
    }

    renderer.setAnimationLoop(() => {
        figura.rotation.x += 0.01;   
        figura.rotation.y += 0.01;
        if (controls) controls.update();
        renderer.render(scene, camera);
    });

    window.addEventListener('resize', () => {  
        const nuevoAncho = contenedor.clientWidth;
        const nuevoAlto = contenedor.clientHeight;
        camera.aspect = nuevoAncho / nuevoAlto;
        camera.updateProjectionMatrix();
        renderer.setSize(nuevoAncho, nuevoAlto);
    });
}

crearEscena('canvas-hero', new THREE.BoxGeometry(2.5, 2.5, 2.5), '#2e00fcff');

crearEscena('canvas-figura', new THREE.BoxGeometry(2.5, 2.5, 2.5), '#f705f7ff', true);


let contador = 0; 

const boton = document.getElementById('btn-contador'); 

boton.addEventListener('click', () => {
    contador++; 
    console.log('Clicks: ' + contador); 
});