import { Component } from 'react'
import Sketch from 'react-p5'
import P5 from "p5";
import { Ratio } from 'react-bootstrap';
import { Boundary } from '../func/Boundary'
import { pointer } from '../func/Select'


class P5JS_App extends Component {

    constructor() {
        super();
        p5 = P5;
        x = 100;
        y = 100;
        cw = 800;
        ch = 600;
        walls = []
        particle = []
        curser = 0;
        nodes = []
        createMode = false;
        sw = this.cw;  //sketch width
        sh = this.ch;  //sketch height
        curser = null; 
    };


    setup = (p5, parent) => {

        this.parent = parent;
        p5.createCanvas(this.cw, this.ch).parent(parent);

        p5.colorMode(p5.HSB, 360, 100, 100);
        p5.ellipseMode(p5.RADIUS);

        //this.walls.push(new Boundary(p5, 0 , 0 , this.sw, 0))
        //this.walls.push(new Boundary(p5, this.sw, 0 , this.sw, this.sh))
        //this.walls.push(new Boundary(p5, this.sw, this.sh, 0 , this.sh))
        //this.walls.push(new Boundary(p5, 0 , this.sh, 0 , 0))

        this.curser = new pointer()


    }

    drawGrid = (p5, sizX, sizY, spcX, spcY) => {
      //  console.log(p5);
        p5.stroke(55);
        p5.strokeWeight(1);
        for (var x = 0; x < sizX; x += spcX) {
            for (var y = 0; y < sizY; y += spcY) {
                p5.line(x, 0, x, sizY);
                p5.line(0, y, sizX, y);
            }
        }
    }


    draw = (p5) => {
        p5.clear();
        p5.background(0);
        p5.fill(255);
        //p5.rect(this.x, this.y, 50, 50);
        p5.translate(50,-50);

        this.drawGrid(p5, 600,600,100,100);



    }

    render() {

        return (
            <div>
                <Ratio aspectRatio="4x3" className="border border-5 rounded rounded-3">
                <Sketch setup={this.setup} draw={this.draw} className="w-100 h-100" />
                </Ratio>;
            </div>
            )
    }
}
export default P5JS_App
