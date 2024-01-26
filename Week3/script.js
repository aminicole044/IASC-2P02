import * as THREE from "three"

/********
 * **SCENE**
 * 
 * //Canvas

 * //Renderer
 * 
 * 
 * **ANIMATION LOOP***
****** */

//Animate
const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()
scene.background = new THREE.Color('blue')

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

testSphere.position.set(0, 0, -5)
scene.add(testSphere)


 const clock = new THREE.Clock()

 const animation = () =>
 {
    const elapsedTime = clock.getElapsedTime()

 testSphere.position.z = Math.sin(elapsedTime)   

    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
 }

 animation()