import * as THREE from 'three'
import { loadedData } from '../core/helperFunc'
import SceneManager from '../main'

export function casing(scene) {

	let walls = [];
	let data = loadedData();
	let inlines = data.inLines;
	let outLines = data.outLines;

	function createWall(l, t, d) {

		let perpAngle = l.ang + (Math.PI / 2);

		let a1_x = l.a.x + Math.sin(perpAngle) * t;
		let a1_y = l.a.y + Math.cos(perpAngle) * t;
		let a2_x = l.a.x - Math.sin(perpAngle) * t;
		let a2_y = l.a.y - Math.cos(perpAngle) * t;
		let b1_x = l.b.x + Math.sin(perpAngle) * t;
		let b1_y = l.b.y + Math.cos(perpAngle) * t;
		let b2_x = l.b.x - Math.sin(perpAngle) * t;
		let b2_y = l.b.y - Math.cos(perpAngle) * t;

		const newWall = new THREE.Shape();
		newWall.moveTo(a1_x, a1_y);
		newWall.lineTo(a1_x, a1_y);
		newWall.lineTo(a2_x, a2_y);
		newWall.lineTo(b2_x, b2_y);
		newWall.lineTo(b1_x, b1_y);
		newWall.lineTo(a1_x, a1_y);

		const wallSettings = {
			steps: 5,
			depth: d,
			bevelEnabled: false
		};

		const geoWall = new THREE.ExtrudeGeometry(newWall, wallSettings);

		return geoWall;
	}



	let flip = true;

	const pcbWorldPos = 50;
	const pcbToShine = 2;
	const pcbToDiffuser = 20;
	const shroudHeight = 30;

	let diffuserWorldPos, shroudWorldPos, shineWorldPos;

	//if (flip == false) {
	//	diffuserWorldPos = pcbWorldPos + pcbToDiffuser;
	//	shroudWorldPos = diffuserWorldPos - shroudHeight;
	//	shineWorldPos = pcbWorldPos + pcbToShine;
	//} else {
	diffuserWorldPos = pcbWorldPos - pcbToDiffuser;
	shroudWorldPos = diffuserWorldPos;
	shineWorldPos = pcbWorldPos - pcbToShine;
	//}

	for (let i = 0; i < inlines.length; i++) {
		const geoNewWall = createWall(inlines[i], 1.2, shroudHeight);
		//const matNewWall = new THREE.MeshBasicMaterial({ color: 0x333333 });
		const matNewWall = new THREE.MeshStandardMaterial({ color: 0x111111 });
		const meshNewWall = new THREE.Mesh(geoNewWall, matNewWall);
		//	meshNewWall.scale.set (worldScale, worldScale, worldScale);
		//meshNewWall.castShadow = true;
		walls.push(meshNewWall)
	}

	for (let i = 0; i < walls.length; i++) {
		walls[i].position.set(0, 0, -shroudWorldPos)
		scene.add(walls[i]);
	}

	let centroidx, centroidy;

	function findCentre(array) {
		let sumx = 0;
		let sumy = 0;
		//find centroid of line array, change this to points when working
		for (let i = 0; i < array.length; i++) {
			sumx += array[i].x;
			sumy += array[i].y;
		}
		centroidx = sumx / array.length;
		centroidy = sumy / array.length;
	}

	findCentre(outLines);

	console.log(centroidx, centroidy)

	const geoCentre = new THREE.SphereGeometry(10,8,8);
	const matCentre = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const mshCentre = new THREE.Mesh(geoCentre, matCentre);

	//scene.add(mshCentre);
	mshCentre.position.set(centroidx, centroidy,0);

	this.update = function (time) {

		//SceneManager.controls.target = mshCentre;
	}
}
