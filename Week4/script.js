import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color('lightblue')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)

camera.position.set(2, 2, 4)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const planeGeometry = new THREE.PlaneGeometry(10, 10, 20, 20)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5
scene.add(plane)

// testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(geometry, material)

scene.add(testSphere)

const ui = new dat.GUI()
const uiObject = {}
uiObject.play = false

const planeFolder = ui.addFolder('Plane')
planeFolder.add(planeMaterial, 'wireframe')
const sphereFolder = ui.addFolder('Sphere')


sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Height')
    .listen()

sphereFolder
    .add(uiObject, 'play')
    .name('Animate Sphere')
  

const clock = new THREE.Clock()
const animation = () =>
{
    const elapsedTime = clock.getElapsedTime()
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * 0.5) * 2
    }

    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()