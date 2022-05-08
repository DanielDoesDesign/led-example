  import * as THREE from "three";
import { SubsurfaceScatteringShader } from "three/examples/jsm/shaders/SubsurfaceScatteringShader.js";
import imgUrl from '/src/three/static/white.jpg'
import { loadedData } from '../core/helperFunc'

export class GeneralLights {
	constructor(scene: THREE.Scene) {
		const loader = new THREE.TextureLoader();
		const imgTexture = loader.load(imgUrl);

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

		const geoPlane = createOut(3);
		//const matPlane = new THREE.MeshStandardMaterial();
		//matPlane.side = THREE.DoubleSide;
		const mshPlane = new THREE.Mesh(geoPlane, material);
		mshPlane.receiveShadow = true;

		scene.add(mshPlane);

		function createOut(d) {

			let data = loadedData();
			let points = data.outLines;

			const newDiffuse = new THREE.Shape();
		
			newDiffuse.moveTo(points[0].x, points[0].y);

			for (let i = 0; i < points.length; i++) {
				newDiffuse.lineTo(points[i].x,points[i].y);
			}
	
			const wallSettings = {
				steps: 1,
				depth: d,
				bevelEnabled: false
			};
	
			const geoPlane = new THREE.ExtrudeGeometry(newDiffuse, wallSettings);
	
			return geoPlane;
		}




	}




	update(time) { }
}
