import Paper from "paper";
import { Group, Matrix, Point } from "paper/dist/paper-core";
import { loadedData } from '../three/core/helperFunc'


const draw1 = () => {

    Paper.view.matrix.d = -1;
    Paper.view.translate(new Paper.Point(0, -Paper.view.viewSize.height));
    Paper.view.scale(2, 2, new Paper.Point(0, 0))



    //Set background
    var from = new Paper.Point(0, 0);
    var to = new Paper.Point(Paper.view.viewSize.width, Paper.view.viewSize.height);
    var rect = new Paper.Path.Rectangle(from, to);
    rect.strokeColor = new Paper.Color('red')
    rect.fillColor = new Paper.Color('white')

    var axisPoints = [new Paper.Point(0, 500), new Paper.Point(0, 0), new Paper.Point(500, 0)];
    var axis = new Paper.Path(axisPoints)
    axis.strokeColor = new Paper.Color('black')
    axis.translate(new Paper.Point(20, 20))

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
    myOutPath.translate(new Paper.Point(20, 20))



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


    Paper.view.viewSize.width = 800;
    Paper.view.viewSize.height = 800;


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