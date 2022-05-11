import Paper from "paper";

const draw1 = () => {

  
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

var bg = new Paper.Path.Rectangle({
  center: Paper.view.center,
  radius: 500,
  strokeColor: 'red'
});

// Create a group of the two items and clip it:
var group = new Paper.Group(circle, star);
group.clipped = true;

var group2 = new Paper.Group(circle2)

//onFrame(event)
Paper.view.onFrame = onFrame;

// Lets animate the circle:
function onFrame(event) {
    var offset = Math.sin(event.count / 30) * 30;
    circle.position.x = Paper.view.center.x + offset;
}



};


export default draw1;