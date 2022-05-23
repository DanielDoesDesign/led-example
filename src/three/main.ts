import * as THREE from "three";
import { sRGBEncoding, ACESFilmicToneMapping } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import { fpsGraph } from "./core/gui";
import "./style.css";

import './core/helperFunc';
import { SceneHelpers } from "./scene/SceneSubject";
import { diffuser } from "./scene/diffuser";
import { leds } from "./scene/Leds";
import { casing } from "./scene/casing";

export default class SceneManager {
	screenDimensions: { width: number; height: number };
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	camera: THREE.PerspectiveCamera;
	controls: OrbitControls;
	sceneSubjects: any[]
	clock: THREE.Clock

	constructor(private canvas: HTMLCanvasElement) {
		this.clock = new THREE.Clock();

		//this.screenDimensions = {
		//	width: window.innerWidth,
		//		height: window.innerHeight,
		//	};

		this.screenDimensions = {
			width: 800,
			height: 600,
		};

		this.scene = this.buildScene();
		this.renderer = this.buildRender(this.screenDimensions);
		this.camera = this.buildCamera(this.screenDimensions);
		this.controls = this.buildControls();
		this.sceneSubjects = this.createSceneSubjects();
		this.camera.position.set(-20, 20, 20);

		this.render()
	}

	createSceneSubjects() {
		const sceneSubjects = [
			new diffuser(this.scene),
			new SceneHelpers(this.scene),
			new leds(this.scene),
			new casing(this.scene)
		];

		return sceneSubjects;
	}

	buildControls() {
		const controls = new OrbitControls(this.camera, this.canvas);
		return controls;
	}

	buildCamera({ width, height }) {
		const aspectRatio = width / height;
		const fieldOfView = 60;
		const nearPlane = 1;
		const farPlane = 2000;
		const camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);

		return camera;
	}

	buildScene() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color("#888");

		return scene;
	}

	buildRender({ width, height }) {
		const renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(width, height);
		renderer.shadowMap.autoUpdate = false;
		renderer.shadowMap.enabled = false;
		renderer.shadowMap.type = THREE.VSMShadowMap;
		renderer.physicallyCorrectLights = true;
		renderer.outputEncoding = sRGBEncoding;
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.autoClear = false;

		return renderer;
	}

	onWindowResize() {
		const { width, height } = this.canvas;
		this.screenDimensions.width = width;
		this.screenDimensions.height = height;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	update() {
		const elapsedTime = this.clock.getElapsedTime();

		for (let i = 0; i < this.sceneSubjects.length; i++)
			this.sceneSubjects[i].update(elapsedTime);

		//fpsGraph.begin();
		this.renderer.render(this.scene, this.camera);
		//fpsGraph.end();

		this.controls.update();
	}

	render() {
		requestAnimationFrame(() => this.render());
		this.update();
	}

	// TODO: Remember to add this function to the window on resize event listenr
	resizeCanvas() {
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";

		this.canvas.width = 800;
		this.canvas.height = 600;

		//this.canvas.width = window.innerWidth;
		//this.canvas.height = window.innerHeight;

		this.onWindowResize();
	}
}
