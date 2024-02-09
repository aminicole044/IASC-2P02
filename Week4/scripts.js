import * as THREE from "three" 

const sizes = { 

    width: window.innderWidth, 

    height: window.innerHeight, 

aspectRatio : window.innerWidth / window.innerHeight 

} 
//* * SCENE *** 
// 

const canvas = document.querySelector('.webgl') 

const scene = new THREE.Scene() 
scene.background = new THREE.Color('pink') 
const camera = new THREE.PerspectiveCamera( 

    75, 
    sizes.aspectRatio, 
    0.1, 
    100 
) 
scene.add(camera) 
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas 

}) 

renderer.setSize(window.innerWidht, window.innerHeight) 
const clock = new THREE.Clock() 
const animation = () => 

{
    const elapsedTime = clock.getElapsedTime() 
    renderer.render(scene, camera) 
    window.requestAnimationFrame(animation)
} 
animation() 