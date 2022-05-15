import Paper from "paper";
import { Group, Matrix, Point } from "paper/dist/paper-core";
import { loadedData } from '../three/core/helperFunc'


const draw1 = () => {


    //Set background
    var from = new Paper.Point(0, 0);
    var to = new Paper.Point(Paper.view.viewSize.width, Paper.view.viewSize.height);
    var rect = new Paper.Path.Rectangle(from, to);
    rect.strokeColor = new Paper.Color('red')
    rect.fillColor = new Paper.Color('white')

    let outLines = []
    let inLines = []


    const pData = loadedData();
    outLines = pData.outLines;
    inLines = pData.inLines;


    //outer path is a series of points that make the shape
    var myOutPath = new Paper.Path();
    myOutPath.strokeColor = new Paper.Color('black')
    for (let i = 0; i < outLines.length; i++) {
        myOutPath.add(new Paper.Point(outLines[i].x, outLines[i].y));
        //var newLine = new Paper.Path.Line([lines[i].x, lines[i].y]);
        //newLine.strokeColor = new Paper.Color('black')
    }
    myOutPath.closePath();



    // var testGroup = new Group({});

    //inner lines have start/end line references
    var myInPath = new Paper.Path();
    myInPath.strokeColor = new Paper.Color('red')
    for (let i = 0; i < inLines.length; i++) {
        var from = new Point(inLines[i][0], inLines[i][1]);
        var to = new Point(inLines[i][2], inLines[i][3])
        var newLine = new Paper.Path.Line(from, to)
        //   testGroup.addChild(newLine);
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


    // Create a group of the two items and clip it:
    var group = new Paper.Group([circle, star]);
    group.clipped = true;

    Paper.view.viewSize.width = 600;
    Paper.view.viewSize.height = 600;

    Paper.view.matrix.invert()

    /*
    Paper.view.onFrame = onFrame;
    
    Lets animate the circle:
    function onFrame(event) {
       var offset = Math.sin(event.count / 30) * 30;
       circle.position.x = Paper.view.center.x + offset;
    }
    */


};



export default draw1;