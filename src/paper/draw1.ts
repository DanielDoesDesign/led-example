import Paper from "paper";
import { loadedData } from '../three/core/helperFunc'

const draw1 = () => {

//Set background
var from = new Paper.Point(0, 0);
var to = new Paper.Point(Paper.view.viewSize.width, Paper.view.viewSize.height);
var rect = new Paper.Path.Rectangle(from, to);
rect.strokeColor = new Paper.Color('red')
rect.fillColor = new Paper.Color('white')

let lines = []


var data = loadedData();
lines = data.outLines;

for (let i = 0; i < lines.length; i++) {
   var newLine = new Paper.Path.Line([lines[i].x, lines[i].y]);
   newLine.strokeColor = new Paper.Color('black')
   lineTo(point)
}




var star = new Paper.Path.Star({
    center: Paper.view.center,
    points: 6,
    radius1: 20,
    radius2: 40,
    fillColor: 'red'
});

var circle = new Paper.Path.Circle({
    center: Paper.view.center,
    radius: 25,
    strokeColor: 'black'
});




var bg = new Paper.Path.Rectangle(rect);


// Create a group of the two items and clip it:
var group = new Paper.Group(circle, star);
group.clipped = true;

//onFrame(event)
Paper.view.onFrame = onFrame;
Paper.view.viewSize.width = 600;
Paper.view.viewSize.height = 400;

// Lets animate the circle:
function onFrame(event) {
    var offset = Math.sin(event.count / 30) * 30;
    circle.position.x = Paper.view.center.x + offset;
}



};



export default draw1;