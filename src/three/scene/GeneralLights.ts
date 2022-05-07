import * as THREE from "three";
import { SubsurfaceScatteringShader } from "three/examples/jsm/shaders/SubsurfaceScatteringShader.js";

export class GeneralLights {
	constructor(scene: THREE.Scene) {
		const loader = new THREE.TextureLoader();
		const imgTexture = loader.load("../src/three/static/white.jpg");

		imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

		const shader = SubsurfaceScatteringShader;
		const uniforms = THREE.UniformsUtils.clone(shader.uniforms);
		uniforms["map"].value = imgTexture;
		uniforms["diffuse"].value = new THREE.Vector3(0.1, 0.1, 0.1);
		uniforms["shininess"].value = 300;
		uniforms["thicknessMap"].value = imgTexture;
		uniforms["thicknessColor"].value = new THREE.Vector3(0.1, 0.1, 0.1);
		uniforms["thicknessDistortion"].value = 0.1;
		uniforms["thicknessAmbient"].value = 0.4;
		uniforms["thicknessAttenuation"].value = 0.8;
		uniforms["thicknessPower"].value = 2.0;
		uniforms["thicknessScale"].value = 16.0;

		const material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			lights: true,
		});
		material.extensions.derivatives = true;

		// LOADER

		const geoPlane = new THREE.PlaneGeometry(100, 100);
		//const matPlane = new THREE.MeshStandardMaterial();
		//matPlane.side = THREE.DoubleSide;
		const mshPlane = new THREE.Mesh(geoPlane, material);
		mshPlane.receiveShadow = true;

		scene.add(mshPlane);
		mshPlane.position.set(50, 50, 0);
	}

	update(time) {}
}
