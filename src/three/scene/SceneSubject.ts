import * as THREE from 'three'
//import { gui } from '../core/gui'

export function SceneHelpers(scene) {
	const ambientLight = new THREE.AmbientLight(0x555555, 0.2)
	scene.add(ambientLight)

	const directionalLight = new THREE.DirectionalLight(0x555555, 0.5)
	scene.add(directionalLight)

	const axesHelper = new THREE.AxesHelper( 100);
	scene.add(axesHelper)

	//gui.addInput(axesHelper, 'visible', {
	//label: 'AxesHelper',
	///})

	const gridSize = 30;

	const Grid = new THREE.GridHelper(gridSize,6);
	Grid.position.x = gridSize / 2;
	Grid.position.y = gridSize / 2;
	
	Grid.rotation.x = 0;
	Grid.rotation.y = Math.PI /2;
	Grid.rotation.z = Math.PI /2;
	Grid.visible = false;
	scene.add(Grid);

	//gui.addInput(Grid, 'visible', {
	//	label: 'Grid',
	//	})

	
	this.update = function(time) {
	}
}
