import * as THREE from 'three'
import {
    sRGBEncoding,
    PCFShadowMap,
    ACESFilmicToneMapping,
  } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
const canvas: HTMLCanvasElement = document.querySelector('#webgl') as HTMLCanvasElement
import { fpsGraph } from './core/gui'
import { SceneHelpers } from "./scene/SceneSubject"
import { GeneralLights } from "./scene/GeneralLights"
import { Ledstest } from "./scene/Leds"
import '../style.css'


function SceneManager(canvas) {

    const clock = new THREE.Clock();
    
    const screenDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls();
    const sceneSubjects = createSceneSubjects(scene);
    camera.position.set(-20,20,20);


    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#333");

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        renderer.setSize(width, height);
        renderer.shadowMap.autoUpdate = false;
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.VSMShadowMap
        renderer.physicallyCorrectLights = true;
        renderer.outputEncoding = sRGBEncoding
        renderer.toneMapping = ACESFilmicToneMapping
        renderer.toneMappingExposure = 1
        renderer.autoClear = false;

        //renderer.gammaInput = true;
        //renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 1000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new GeneralLights(scene),
            new SceneHelpers(scene),
            new Ledstest(scene)
        ];

        return sceneSubjects;
    }

    function buildControls(){
       const controls = new OrbitControls( camera, canvas);
       //controls.enableDamping = true
       return controls;
    }

    

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
        	sceneSubjects[i].update(elapsedTime);

        fpsGraph.begin()
        renderer.render(scene, camera);
        fpsGraph.end()

        controls.update();

    }

    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
    }
}

const sceneManager = new SceneManager(canvas);

bindEventListeners();


function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = window.innerWidth
	canvas.height = window.innerHeight
   
    sceneManager.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}

render();


