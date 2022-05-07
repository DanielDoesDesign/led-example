import * as THREE from 'three'
import bear from "../objects/bear.js"



export function paths(scene) {

	let lines = [];
	let walls = [];
	
	class Point {
		x: number;
		y: number;
		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		add(x, y) {
			this.x += x;
			this.y += y;
		}
		sub(x, y) {
			this.x -= x;
			this.y -= y;
		}
		mul(x, y) {
			this.x *= x;
			this.y *= y;
		}
		div(x, y) {
			this.x /= x;
			this.y /= y;
		}
	}

	class Line {
		a: Point;
		b: Point;
		ang: number;
		constructor(a: Point, b: Point) {
			this.a = a;
			this.b = b;
			this.ang = Math.atan2(a.x - b.x, a.y - b.y);
		}
	}

	function loadData() {
		let lineData = bear["entities"];
		for (let i = 0; i < lineData.length; i++) {
			let line = lineData[i];
			if (line.type !== "LINE") continue;
			for (let i=1; i<line["vertices"].length; i++) {
				let sposition = line["vertices"][i-1];
				let eposition = line["vertices"][i];
				let sx = sposition["x"];
				let sy = sposition["y"];
				let ex = eposition["x"];
				let ey = eposition["y"];
				lines.push(new Line(new Point(sx, sy), new Point(ex, ey)));
			}
		}

	}


	const flip = true;

	const pcbWorldPos = 50;
	const pcbToShine = 2;
	const pcbToDiffuser = 20;
	const shroudHeight = 30;

	let diffuserWorldPos, shroudWorldPos, shineWorldPos;

	if (flip == false) {
		diffuserWorldPos = pcbWorldPos + pcbToDiffuser;
		shroudWorldPos = diffuserWorldPos - shroudHeight;
		shineWorldPos = pcbWorldPos + pcbToShine;
	} else if (flip == true) {
		diffuserWorldPos = pcbWorldPos - pcbToDiffuser;
		shroudWorldPos = diffuserWorldPos;
		shineWorldPos = pcbWorldPos - pcbToShine;
	}

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

	loadData();

	for (let i = 0; i < lines.length; i++) {
		const geoNewWall = createWall(lines[i], 1.2, shroudHeight);
		const matNewWall = new THREE.MeshStandardMaterial({ color: 0x00ff000 });
		const meshNewWall = new THREE.Mesh(geoNewWall, matNewWall);
		//	meshNewWall.scale.set (worldScale, worldScale, worldScale);
		meshNewWall.castShadow = true;
		walls.push(meshNewWall)
	}

	for (let i = 0; i < walls.length; i++) {
		walls[i].position.set(0, 0, -shroudWorldPos)
		scene.add(walls[i]);
	}


	this.update = function (time) {
	}
}
