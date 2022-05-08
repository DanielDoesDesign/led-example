import * as THREE from 'three'
import { gui } from '../core/gui'
import { loadedData } from '../core/helperFunc'

export function leds(scene) {

	let data = loadedData();
	let leds = data.leds;

	const radius = 0.5;
	const geoSphere = new THREE.SphereGeometry(radius, 12, 12);
	const matSphere = new THREE.MeshStandardMaterial();
	const meshSphere = new THREE.Mesh(geoSphere, matSphere)

	meshSphere.position.set(0, 0, 0);
	scene.add(meshSphere);


	//const led1 = new THREE.SpotLight();
	//led1.distance = 20;
	//scene.add(led1);

	const ledPos = [];  // array of groups
	const spots = [];   // array of spotlights
	const helpers = [];   //array of helpers

	const ledGroup = new THREE.Group();

	const ledGroupAxes = new THREE.AxesHelper(5);
	ledGroup.add(ledGroupAxes);

	function createLED(x, y, depth) {

		const localLed = new THREE.Group();
		const ledThickness = 2;
		const geoLed5050 = new THREE.BoxGeometry(5, 5, ledThickness);
		const matLed = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const mshLed = new THREE.Mesh(geoLed5050, matLed);

		localLed.add(mshLed);
		mshLed.position.set(0, 0, -depth - (ledThickness / 2));

		const lightOffset = 0;

		const newSpot = new THREE.SpotLight();
		newSpot.position.set(0, 0, (mshLed.position.z + ledThickness / 2) + lightOffset);
		newSpot.distance = 50;
		newSpot.angle = 1;
		newSpot.intensity = 10;
		newSpot.penumbra = 0.8;
		//newSpot.matrixAutoUpdate = false;
		newSpot.castShadow = true;

		var r = () => Math.random() * 256 >> 0;
		var color = `rgb(${r()}, ${r()}, ${r()})`;

		newSpot.color = new THREE.Color(color);
		localLed.add(newSpot.target);
		localLed.add(newSpot);

		const localAxes = new THREE.AxesHelper(5);
		localLed.add(localAxes);

		const ledHelper = new THREE.SpotLightHelper(newSpot);
		ledHelper.visible = false;
		scene.add(ledHelper);

		localLed.position.set(x, y, 0);
		ledPos.push(localLed);
		spots.push(newSpot);
		helpers.push(ledHelper);

		ledGroup.add(localLed);
	}

	for (let i = 0; i < leds.length; i++) {
		createLED(leds[i].x, leds[i].y, 30)
	}



	var randX = () => Math.random() * 100 >> 0;

	//for (let i = 0; i < 30; i++) {
	//	createLED(randX(), randX(), 30);
	//}


	ledGroup.position.z = 0;
	ledGroup.position.x = 0;
	ledGroup.position.y = 0;

	scene.add(ledGroup);

	function updateLedAngle(angle) {

		for (let i = 0; i < spots.length; i++) {
			spots[i].angle = angle;
		}
	}

	function updateLedsPn(pn) {

		for (let i = 0; i < spots.length; i++) {
			spots[i].penumbra = pn;
		}
	}

	function toggleHelpers(state) {
		for (let i = 0; i < helpers.length; i++) {
			helpers[i].visible = state;
		}
	}



	gui.addInput(ledGroup.position, 'z', {
		label: 'LED Z', min: -30, max: 30, step: 1
	})

	gui.addInput(spots[0], 'angle',
		{ label: 'LED ANGLE', min: 0, max: 1, step: 0.01 })
		.on('change', (ev) => {
			updateLedAngle(ev.value);
		});

	gui.addInput(spots[0], 'penumbra',
		{ label: 'LED PEN', min: 0, max: 1, step: 0.01 })
		.on('change', (ev) => {
			updateLedsPn(ev.value);
		});


	gui.addInput(helpers[0], 'visible', { label: 'LED HELPER' })
		.on('change', (ev) => {
			console.log(ev.value);
			toggleHelpers(ev.value);
		});




	this.update = function (time) {

		for (let i = 0; i < helpers.length; i++) {
			helpers[i].update();
		}
	}
}