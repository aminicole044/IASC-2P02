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
const canvas = document.querySelector('.webgl2') 
// Scene 
const scene = new THREE.Scene() 
scene.background = new THREE.Color('lightblue') 


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

const sphereGeometry = new THREE.SphereGeometry(0.5) 
// Cube Materials 

const redMaterial = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color('yellow') 
}) 

const greenMaterial = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color('green') 
}) 

const blueMaterial = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color('darkblue') 
}) 

const pinkMaterial = new THREE.MeshStandardMaterial({  
    color: new THREE.Color('orange')  
}) 

const yellowMaterial = new THREE.MeshStandardMaterial({  
    color: new THREE.Color('crimson')  
})  

const purpleMaterial = new THREE.MeshStandardMaterial({  
    color: new THREE.Color('blue')  
})  

const drawSphere = (i, material) => 
{
    const sphere = new THREE.Mesh(sphereGeometry, material) 
    sphere.position.x = (Math.random() - 0.5) * 80 
    sphere.position.z = (Math.random() - 0.5) * 80 
    sphere.position.y = i - 10 

    sphere.rotation.x = Math.random() * 2 * Math.PI 
    sphere.rotation.y = Math.random() * 2 * Math.PI 
    sphere.rotation.z = Math.random() * 2 * Math.PI

    scene.add(sphere) 

}
/********************** 
** TEXT PARSERS & UI ** 
***********************/ 
let preset = {} 
const uiobj = { 
    text: '', 
    textArray: [], 
    term1: 'prince', 
    term2: 'narrator', 
    term3: 'king', 
    term4: 'fox',  
    term5: 'lamplighter',  
    term6: 'geographer',  
    rotateCamera: false
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

    findTermInParsedText(uiobj.term4, pinkMaterial)  
    // Find term 2  
    findTermInParsedText(uiobj.term5, yellowMaterial)  

    findTermInParsedText(uiobj.term6, purpleMaterial)  
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
         for(let a=0; a < 8; a++) 
         {
            drawSphere(n, material)
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
    container: document.querySelector('#parent2') 
})                                                                                                                      
// Interaction Folders 
    // Cubes Folder 
    const spheresFolder = ui.addFolder('Filter Terms') 
    spheresFolder 
        .add(redMaterial, 'visible') 
        .name(`${uiobj.term1}`) 

        spheresFolder 
        .add(greenMaterial, 'visible') 
        .name(`${uiobj.term2}`) 

        spheresFolder 
        .add(blueMaterial, 'visible') 
        .name(`${uiobj.term3}`) 

        spheresFolder 
        .add(pinkMaterial, 'visible')  
        .name(`${uiobj.term4}`)  

        spheresFolder  
        .add(yellowMaterial, 'visible')  
        .name(`${uiobj.term5}`)  

        spheresFolder  
        .add(purpleMaterial, 'visible')  
        .name(`${uiobj.term6}`)  

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
    // Renderer
    renderer.render(scene, camera) 
    // Request next frame 

    window.requestAnimationFrame(animation) 
} 
animation() 