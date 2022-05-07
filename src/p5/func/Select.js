let selectedObj = null;

export class pointer{
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
   constructor(x, y, n){
    this.pos = createVector(x, y)
    this.d = 20;
    this.overlap = false;
    this.selected = false;
    this.color = color(100);
    this.name = n
   }

  update(x, y) {
    this.pos.set(x, y)
  }

  clicked() {
    this.color = color(255); //set this node to be white if clicked
    this.selected = true;
  }

  show() {
    
    
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
    p.stroke(this.overlap ? color("red") : 1);
    this.overlap = false
    p.circle(this.pos.x, this.pos.y, this.d/2);
    
  if(selectedObj == this){
      p.fill(255);
      p.textSize(15);
      p.textAlign(CENTER);
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

