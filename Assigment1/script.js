import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

////***Setup */


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/****Scene */ 

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.9, 3.5, 10.5)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

//const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
//const torusKnotMaterial = new THREE.MeshNormalMaterial()
//const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

const geometry = new THREE.PlaneGeometry( 2, 2 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.position.set(4, 1.5, 0)
plane.castShadow = true
scene.add(plane)


const geometry1 = new THREE.ConeGeometry(3, -8, 3); 
const material1 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh(geometry1, material1 ); scene.add( cone );
cone.position.set(6, 5, 0)
cone.castShadow = true
cone.add(cone)

const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('blue'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 2.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

///****UI ***/
/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')
/*


**DOM INTERACTIONS***

//CONTINUE-READING/*/

//domobject

const domobject ={
    part: 1,
    firstChange:false,
    secondChange:false,
    thirdChange:false,
    fourthChange:false
}

document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domobject.part =2
}


//RESTART///

document.querySelector('#restart-reading').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domobject.part = 1

    domobject.firstChange = false
    domobject.secondChange=false
    domobject.thirdChange=false
    domobject.fourthChange=false

    directionalLight.position.set(10, 2.5, 0)
}
//FIRST
document.querySelector('#first-change').onclick = function(){
    domobject.firstChange = true
}
//SECOND
document.querySelector('#second-change').onclick = function(){
    domobject.secondChange = true
}

//THIRD
document.querySelector('#third-change').onclick = function(){
    domobject.thirdChange = true
}

//FOURTH
document.querySelector('#fourth-change').onclick = function(){
    domobject.fourthChange = true
}
/***Animation loop***////
const clock = new THREE.Clock()

const animation = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 2
    sun.position.copy(directionalLight.position)

    controls.update()


   
//part 1
if(domobject.part ===1){
    camera.position.set(1.1,0.3,1.3)
    camera.lookAt(-5,0,1)
}
///part2
if(domobject.part ===2){
    camera.position.set(9.9,3.5,10.5)
    camera.lookAt(0,0,0)
}

    //dom interaction
    //first
    if(domobject.firstChange){
        plane.rotation.y = elapsedTime
        plane.rotation.x = elapsedTime
    }
    //second
    if(domobject.secondChange){
       plane.position.y =Math.sin(elapsedTime * 0.5) * 6
    }
    //third
    if(domobject.thirdChange){
        cone.position.z =Math.sin(elapsedTime * 0.5) * 6
    }
    //fourth
    if(domobject.fourthChange){
        directionalLight.position.y -= 0.05
    }
    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()