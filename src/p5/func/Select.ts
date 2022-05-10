let selectedObj = null;
import { Color, Vector } from "p5/index"
import {collideCircleCircle, collidePointCircle} from "p5.collide2d"

export class pointer{

  pos: Vector
  d: number
  pressed: boolean
  overlap: boolean
  hit: boolean

   constructor(p) {
    this.pos = p.createVector(0, 0)
    this.d = 5;
    this.pressed = false;
   }

  update = (x, y) => {
    this.pos.set(x, y)
  }

  collide(other) {
    
      //use bounding box 
      this.overlap = collideCircleCircle(
        this.pos.x,
        this.pos.y,
        this.d,
        other.pos.x,
        other.pos.y,
        other.d
      );
    
      //use direct hit
      this.hit = collidePointCircle(
        this.pos.x,
        this.pos.y,
        other.pos.x,
        other.pos.y,
        other.d
      );

      if (this.overlap == true) {

        other.overlap = true
        
        
        if(this.pressed == true){
        other.clicked();
        selectedObj = other
        console.log("HIT!")
          }
        }
      }

  clicked() {
    this.pressed = true
  }

  show(p) {
    this.pressed = false
    p.stroke(255);

    p.noFill()
    p.strokeWeight(0.5)
    p.ellipse(this.pos.x, this.pos.y, this.d)
  }
}

export class node{

  pos: Vector
  d: number
  overlap: boolean
  selected: boolean
  color: Color
  name: string
  
   constructor(p, x, y, n){
    this.pos = p.createVector(x, y)
    this.d = 20;
    this.overlap = false;
    this.selected = false;
    this.color = p.color(100);
    this.name = n
   }

  update(x, y) {
    this.pos.set(x, y)
  }

  clicked(p) {
    this.color = p.color(255); //set this node to be white if clicked
    this.selected = true;
  }

  show(p) {
    
    
    /*
    hit = collidePointCircle(
      mouseX,
      mouseY,
      this.pos.x,
      this.pos.y,
      this.d
      )
    */

    /*
      this.collide = function (other) {
      this.overlap = collideCircleCircle(
        this.pos.x,
        this.pos.y,
        this.d,
        other.pos.x,
        other.pos.y,
        other.d
      )

      this.hit = collidePointCircle(
        this.x,
        this.y,
        other.x,
        other.y,
        other.d
      );

      if (this.overlap == true) {
        if(other.hitBox){
         console.log("HITBOX EXISTS!")
         console.log(this.overlap)
        }
        if(this.pressed == true){
        console.log("HIT!")
          }
        }
        
    */
    


    p.strokeWeight(3);
    p.fill(this.color);
    p.stroke(this.overlap ? p.color("red") : 1);
    this.overlap = false
    p.circle(this.pos.x, this.pos.y, this.d/2);
    
  if(selectedObj == this){
      p.fill(255);
      p.textSize(15);
      p.textAlign(p.CENTER);
      p.text(this.name, this.pos.x,this.pos.y -50)
     
    
    let eP = 30 //end point
    let wP = 15 //wide point
    let cP = 15 //close point 
    
      //right
      p.triangle(this.pos.x + eP, this.pos.y, 
              this.pos.x + cP, this.pos.y + wP,
              this.pos.x + cP, this.pos.y - wP)
      //left
      p.triangle(this.pos.x - eP, this.pos.y, 
              this.pos.x - cP, this.pos.y + wP,
              this.pos.x - cP, this.pos.y - wP)
      //down
      p.triangle(this.pos.x, this.pos.y + eP, 
              this.pos.x + wP, this.pos.y + cP,
              this.pos.x - wP, this.pos.y + cP)
      //up
      p.triangle(this.pos.x, this.pos.y - eP, 
              this.pos.x + wP, this.pos.y - cP,
              this.pos.x - wP, this.pos.y - cP)

    }
  }
}

