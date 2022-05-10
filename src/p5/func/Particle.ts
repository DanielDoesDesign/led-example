//Essentially the "LED" class

import type P5 from "p5/index"
import { Color, Vector } from "p5"

export class Particle {
  pos: Vector
  rays: any[]
  ptsX: any[]
  ptsY: any[]
  rad: number
  col: Color

  constructor(p, x, y) {
    this.pos = p.createVector(x, y)
    this.rays = []
    this.ptsX = []
    this.ptsY = []
    this.rad = 20
    this.col = p.color(p.random(255),p.random(255),p.random(255))
    let rays = 100
    for (let a = 0; a < 359.9; a += 360 / rays) {
      this.rays.push(new p.Ray(p, this.pos, p.radians(a)))
    }
  }
  
  update(x, y) {
    this.pos.set(x, y)
  }
  
  
  //add in check if ray hits wall, or if it hits circle first, stop at circle, otherwise stop at wall
  
  look(p, walls) {
    
    this.ptsX = []
    this.ptsY = []
    
    for (let ray of this.rays) {
      let closest = null
      let record = Infinity
      

    for (let wall of walls) {
      let pt = ray.cast(wall)   // check if cast hits a wall at all
      if (pt) {                  //if larger than 0 (true)
        let d = p.Vector.dist(this.pos, pt)  //distance to point intersection?
        if (d < record) {  //if distance is smaller than "recorded smallest collision"
          closest = pt
          record = d
        }
          
        }
      }
      
      if (closest) {  // if closest doesnt equall null
        let d = this.pos.dist(closest)
        if (d >= this.rad){
            closest.sub(this.pos)
            let angle = p.atan2(closest.y, closest.x)
            closest = p.Vector.fromAngle(angle)
            closest.mult(this.rad)
            closest.add(this.pos)
          }
        p.stroke(255)
        p.strokeWeight(0.5)
     //   line(this.pos.x, this.pos.y, closest.x, closest.y) //display rays
        
        this.ptsX.push(closest.x)
        this.ptsY.push(closest.y)
        
      }
    }
  }
  
  show(p) {
  p.noStroke()

        
  for (let x = 0; x <= this.rad; x += 4) {
  p.drawGradient(x, this.rad / 2);
  }
    
  p.beginShape();
  for (let i = 0; i < this.ptsX.length; i += 1) {
  p.vertex(this.ptsX[i], this.ptsY[i])
  }
  p.endShape(p.CLOSE);
    
    
    
    p.stroke(255,0,0)
    p.strokeWeight(1)
   // ellipse(this.pos.x, this.pos.y, this.rad*2)
    p.fill(255)
    p.rectMode(p.CENTER)
    p.rect(this.pos.x, this.pos.y, 5, 5)
    
    

    

    
    // for (const ray of this.rays) {
    //   ray.show()
    // }
  }
}

function drawGradient(p, x, y, dim) {
  let radius = dim / 2;
  let h = p.random(0, 360);
  let a = 0;
  for (let r = this.rad; r > 0; --r) {
    p.fill(h, 90, a);
    p.ellipse(x, y, r, r);
    h = (h + 1) % 360;
    a = (a + 5)
  }
}