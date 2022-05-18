//import test from "../objects/bear.js"
import test from "../../objects/uni_poly.js"

export class Point {
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

export class Line {
    a: Point;
    b: Point;
    ang: number;
    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
        this.ang = Math.atan2(a.x - b.x, a.y - b.y);
    }
}

class data {
    entData: any[]
    pointArray: any[]
    entArray: any[]
    lineData: any[]
    inLines: any[]
    outLines: any[]
    pcbLines: any[]
    leds: any[]

    constructor() {
        this.lineData = [];
        this.inLines = [];
        this.outLines = [];
        this.pcbLines = [];
        this.leds = [];
    }

    loadPolys() {
        this.entData = test["entities"];
        this.pointArray = [];
        this.entArray = [];

        for (let i = 0; i < this.entData.length; i++) {
            this.pointArray = [];
            let thisEntity = this.lineData[i];
            if (thisEntity.type !== "LWPOLYLINE") continue;


            for (let j = 0; j < thisEntity["vertices"].length; j++) {
                let pPos = thisEntity["vertices"][j];
                let px = pPos["x"];
                let py = pPos["y"];
                this.pointArray.push(new Point(px, py));
            }

            this.entArray[i] = this.pointArray;

        }
        return this.entArray;
    }





    loadinLines() {
        this.lineData = test["entities"];
        for (let i = 0; i < this.lineData.length; i++) {
            let line = this.lineData[i];
            if (line.type !== "LINE") continue;
            for (let i = 1; i < line["vertices"].length; i++) {
                let sposition = line["vertices"][i - 1];
                let eposition = line["vertices"][i];
                let sx = sposition["x"];
                let sy = sposition["y"];
                let ex = eposition["x"];
                let ey = eposition["y"];
                this.inLines.push(new Line(new Point(sx, sy), new Point(ex, ey)));
            }
        }

        this.lineData = test["entities"];
        for (let i = 0; i < this.lineData.length; i++) {
            let line = this.lineData[i];
            for (let i = 0; i < this.lineData.length; i++) {
                let line = this.lineData[i];
                if (line.type !== "LWPOLYLINE") continue;
                for (let i = 0; i < line["vertices"].length - 1; i++) {
                    let pPos = line["vertices"][i];
                    let nextPos = line["vertices"][i + 1];
                    let nextX = nextPos["x"];
                    let nextY = nextPos["y"];
                    let px = pPos["x"];
                    let py = pPos["y"];
                    this.inLines.push(new Line(new Point(px, py), new Point(nextX, nextY)));
                }
            }
        }
        return this.inLines;
    }


    loadoutLines() {
        this.lineData = test["entities"];
        for (let i = 0; i < this.lineData.length; i++) {
            let line = this.lineData[i];
            if (line.type !== "LWPOLYLINE") continue;
            for (let i = 0; i < line["vertices"].length; i++) {
                let pPos = line["vertices"][i];
                let prevPos = line["vertices"][i - 1];
                let px = pPos["x"];
                let py = pPos["y"];
                this.outLines.push(new Point(px, py));
            }
        }
        return this.outLines;
    }

    loadLeds() {
        this.lineData = test["entities"];
        for (let i = 0; i < this.lineData.length; i++) {
            let ent = this.lineData[i];
            if (ent.type !== "INSERT") continue;
            //if (ent.name !== "led") continue;
            let px = ent["position"]["x"];
            let py = ent["position"]["y"];
            this.leds.push(new Point(px, py));

        }
        return this.leds;
    }




}


export function loadedData() {

    const newData = new data();

    newData.loadinLines();
    newData.loadoutLines();
    newData.loadLeds();
    newData.loadPolys();
    return newData
} 