import type P5 from "p5/index"
import { Vector } from "p5/index"

export class Boundary {

  a: Vector
  b: Vector
  x: number
  y: number

  constructor(p, x1, y1, x2, y2) {
    this.a = p.createVector(x1, p.sw-y1)
    this.b = p.createVector(x2, p.sh-y2)
  }
  
  show = (p) => {
    p.stroke(150)
    p.strokeWeight(1.2)
    p.line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}