import * as THREE from "three" 
import * as dat from "lil-gui" 
import { OrbitControls } from "OrbitControls" 
/**********
** SETUP **
***********/ 

// Sizes 
const sizes = { 
    width: window.innerWidth / 2.5, 
    height: window.innerHeight / 1.5, 
    aspectRatio: 1 
} 

/*********** 
** SCENE ** 
***********/ 
// Canvas 
const canvas = document.querySelector('.webgl') 

// Scene 

const scene = new THREE.Scene() 
scene.background = new THREE.Color('lightgreen') 

// Camera 
const camera = new THREE.PerspectiveCamera( 
    75, 
    sizes.aspectRatio, 
    0.1, 
    100 
) 

camera.position.set(0, 0, 20) 
scene.add(camera) 

// Renderer 
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    antialias: true 
}) 

renderer.setSize(sizes.width, sizes.height) 

// Orbit Controls 
const controls = new OrbitControls(camera, canvas) 
controls.enableDamping = true 

/*********** 
** LIGHTS ** 
************/ 

// Directional Light 

const directionalLight = new THREE.DirectionalLight(0x404040, 100) 
scene.add(directionalLight) 

/*********** 
** MESHES ** 
************/ 

// Cube Geometry 
const cubeGeometry = new THREE.DodecahedronGeometry() 

// Cube Materials 
const redMaterial = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color('red') 
}) 

const greenMaterial = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color('green') 
}) 

const blueMaterial = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color('pink') 
}) 

 
const drawCube = (i, material) => 
{ 
    const cube = new THREE.Mesh(cubeGeometry, material) 
    cube.position.x = (Math.random() - 0.5) * 10 
    cube.position.z = (Math.random() - 0.5) * 10 
    cube.position.y = i - 10 

    cube.rotation.x = Math.random() * 2 * Math.PI 
    cube.rotation.y = Math.random() * 2 * Math.PI 
    cube.rotation.z = Math.random() * 2 * Math.PI 

    cube.randomizer = Math.random() 
    scene.add(cube) 
} 
/********************** 
** TEXT PARSERS & UI ** 
***********************/ 
let preset = {} 

const uiobj = { 
    text: '', 
    textArray: [], 
    term1: 'rose', 
    term2: 'thorns', 
    term3: 'love',
    rotateCamera: false, 
    animateBubbles: false  
} 

// Parse Text and Terms 
const parseTextandTerms = () => 
{    
    // Strip periods and downcase text 
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase() 
    //console.log(parsedText) 

    // Tokenize text 
    uiobj.textArray = parsedText.split(/[^\w']+/) 
    //console.log(uiobj.textArray) 

    // Find term 1 
    findTermInParsedText(uiobj.term1, redMaterial) 

    // Find term 2 
    findTermInParsedText(uiobj.term2, greenMaterial) 

    // Find term 3 
    findTermInParsedText(uiobj.term3, blueMaterial) 
} 

 
const findTermInParsedText = (term, material) => 
{ 

    for (let i=0; i < uiobj.textArray.length; i++) 
    { 
        //console.log(i, uiobj.textArray[i]) 
        if(uiobj.textArray[i] === term) 
        { 

         //console.log(i, term) 
         // convert i into n, which is a value between 0 and 20 

         const n = (100 / uiobj.textArray.length) * i * 0.2 
         // call drawCube function 5 times using converted n value 

         for(let a=0; a < 5; a++) 

         { 
            drawCube(n, material) 
         } 
        } 
    } 
} 

// Text Parsers 
// Load source text 
fetch("https://raw.githubusercontent.com/monicedy/monicedy.github.io/main/_posts/Prince.txt") 
    .then(response => response.text()) 
    .then((data) => 
    { 
        uiobj.text = data 
        parseTextandTerms() 
    } 
    ) 

// UI/ 
const ui = new dat.GUI({ 
    container: document.querySelector('#parent1') 
})                                                                                                                      

// Interaction Folders 

    // Cubes Folder 
    const cubesFolder = ui.addFolder('Filter Terms') 
    cubesFolder 
        .add(redMaterial, 'visible') 
        .name(`${uiobj.term1}`) 

    cubesFolder 
        .add(greenMaterial, 'visible') 
        .name(`${uiobj.term2}`) 

    cubesFolder 
        .add(blueMaterial, 'visible') 
        .name(`${uiobj.term3}`) 

        cubesFolder 
        .add(uiobj, 'animateBubbles') 
        .name('Animate Bubbles') 

    // Camera Folder 
    const cameraFolder = ui.addFolder('Camera') 

    cameraFolder 
        .add(uiobj, 'rotateCamera') 
        .name('Rotate Camera')

/******************* 
** ANIMATION LOOP ** 
********************/ 

const clock = new THREE.Clock() 
// Animate 

const animation = () => 
{ 
    // Return elapsedTime 
    const elapsedTime = clock.getElapsedTime() 

    // Orbit Controls 
    controls.update() 

    // Camera Rotation 
    if(uiobj.rotateCamera) 
    { 
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16 
        camera.position.z = Math.cos(elapsedTime * 0.2) * 16 
    } 
    //animate bubbles 
if(uiobj.animateBubbles){ 
    for(let i=0; i <scene.children.length; i++) 
    { 
     if(scene.children[i].type === "Mesh") 
     { 
         scene.children[i].scale.x = Math.sin(elapsedTime) 
         scene.children[i].scale.y = Math.sin(elapsedTime) 
         scene.children[i].scale.z = Math.sin(elapsedTime) 
     } 
    } 
 }


    // Renderer 
    renderer.render(scene, camera) 
    // Request next frame 
    window.requestAnimationFrame(animation) 

} 
animation() 