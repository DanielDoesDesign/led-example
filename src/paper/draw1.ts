import Paper from "paper";
import { loadedData } from '../three/core/helperFunc'
import { PaperOffset } from "paperjs-offset"
import { PaperScope } from "paper/dist/paper-core";




export function test() {

    console.log(PaperScope.get(0).tools[0]);

}

const draw1 = () => {

    var scale = 2;

    Paper.view.matrix.d = -1;
    Paper.view.translate(new Paper.Point(0, -Paper.view.viewSize.height));
    Paper.view.scale(scale, scale, new Paper.Point(0, 0))
    Paper.view.viewSize.width = 800;
    Paper.view.viewSize.height = 800;



    //Set background
    var from = new Paper.Point(0, 0);
    var to = new Paper.Point(Paper.view.viewSize.width - 400, Paper.view.viewSize.height - 400);
    var rect = new Paper.Path.Rectangle(from, to);
    rect.strokeColor = new Paper.Color('rgb(70, 74, 82)')
    rect.fillColor = new Paper.Color('rgb(50, 54, 62)')

    var axis_x = 50;
    var axis_y = 50;
    var axisPoints = [new Paper.Point(0, 500), new Paper.Point(0, 0), new Paper.Point(500, 0)];
    var axis = new Paper.Path(axisPoints)
    axis.strokeColor = new Paper.Color('black')
    axis.translate(new Paper.Point(axis_x, axis_y))

    let polyLines = []
    let ledImport = []
    let leds = [];

    const pData = loadedData(true);
    polyLines = pData.entArray;
    ledImport = pData.leds;

    console.log(ledImport);


    //import and draw polys
    for (let i = 0; i < polyLines.length; i++) {
        var newPoly = new Paper.Path();
        newPoly.strokeColor = new Paper.Color('black')
        newPoly.strokeWidth = 1.2;
        var thisPoly = polyLines[i];
        for (let j = 0; j < thisPoly.length - 1; j++) {
            newPoly.add(new Paper.Point(thisPoly[j].x, thisPoly[j].y));
        }
        newPoly.closePath();
        newPoly.translate(new Paper.Point(axis_x, axis_y))


        var pocketOffset = PaperOffset.offset(newPoly, -0.6)

        var c1 = PaperOffset.offset(pocketOffset, 0.1);


        var pocketGroup1 = new Paper.Group([c1, pocketOffset])
        pocketGroup1.name = 'pocket';
        pocketGroup1.fillColor = new Paper.Color('hsl(0, 0%, 30%)')
        pocketGroup1.clipped = true;

        //var topgroup1 = new Paper.Group([newPoly, pocketGroup1])

    }



    //import and draw leds
    for (let i = 0; i < ledImport.length; i++) {
        var newLed = new Paper.Point(ledImport[i])
        newLed.x += axis_x;
        newLed.y += axis_y;
        addLed([newLed.x, newLed.y]);

    }


    function addLed(pos) {
        var hitResult = Paper.project.hitTest(pos, hitOptions);
        if (!hitResult) {
            return;
        }


        var item = hitResult.item;
        var group = item.parent;

        var newLed = new Paper.Path.Circle(pos, 50);
        group.addChild(newLed);

        var newPoint = new Paper.Path.Circle(pos, 1);
        newPoint.fillColor = new Paper.Color('black')

        var noAlpha = new Paper.Color(1, 1, 1, 0);

        var col = new Paper.Color(1, 0, 0, 1);
        col.hue = Math.random() * 360;
        col.sat = 1;
        col.brightness = 1;

        console.log(hitResult);


        newLed.fillColor = {
            gradient: {
                stops: [[col, 0.1], [noAlpha, 1]],
                radial: true
            },
            origin: newLed.position,
            destination: newLed.bounds.rightCenter
        };

        //newLed.blendMode = 'normal';
        //newLed.blendMode = 'add';
        newLed.blendMode = 'average';

        leds.push(newLed);



    }

    console.log(leds);


    var mouse = new Paper.Point(new Paper.Point(0, 0));

    var mouseText = new Paper.PointText(new Paper.Point(20, 5));
    mouseText.fontSize = 8;
    mouseText.content = 'Mouse position: '
    mouseText.matrix.d = -1;

    var sceneText = new Paper.PointText(new Paper.Point(20, 15));
    sceneText.fontSize = 8;
    sceneText.content = 'Project Items: ' + Paper.project.activeLayer.toString();
    sceneText.matrix.d = -1;



    var hitText = new Paper.PointText(new Paper.Point(20, 30));
    hitText.fontSize = 8;
    hitText.content = 'Mouse Hit: '
    hitText.matrix.d = -1;

    function deleteChildren(item) {

        if (item.getClassName() === 'Group') {
            var parentGroup = item.parent;
            //item.children[1].remove();
            parentGroup.children.forEach(i => {
                if (i.name === "pocket")
                    i.remove();
            });
        }
    }

    function createOffsetAgain(item) {

        if (item.getClassName() === 'Group') {

            var newOffset = PaperOffset.offset(item.children[0], -0.6)
            newOffset.strokeColor = new Paper.Color('black')
            newOffset.fillColor = new Paper.Color('lightgray')
            newOffset.strokeWidth = 1;


            var c1 = PaperOffset.offset(newOffset, 0.1);


            var newGroup = new Paper.Group([c1, newOffset])
            newGroup.name = "pocket";
            newGroup.clipped = true;
            //newGroup.locked = true;

            item.parent.addChild(newGroup);


        }



    }

    var moveAmount = 1;

    var globalSelected;
    var selectedItems;

    var selectCircle = new Paper.Path.Circle(new Paper.Point(600, 600), 5);
    selectCircle.strokeColor = new Paper.Color('black')

    var square_x = 500;
    var square_y = 100;
    var size = 150;


    var tri1 = new Paper.Path();
    tri1.strokeColor = new Paper.Color('black')
    tri1.add(new Paper.Point(square_x, square_y));
    tri1.add(new Paper.Point(square_x, square_y + size));
    tri1.add(new Paper.Point(square_x + size, square_y + size));
    tri1.closePath();

    var tri2 = new Paper.Path();
    tri2.strokeColor = new Paper.Color('black')
    tri2.add(new Paper.Point(square_x, square_y));
    tri2.add(new Paper.Point(square_x + size, square_y));
    tri2.add(new Paper.Point(square_x + size, square_y + size));
    tri2.closePath();

    //globalSelected[0] = p1.segments[0].point;

    var tri1offset = PaperOffset.offset(tri1, -5)
    var tri2offset = PaperOffset.offset(tri2, -5)

    var c1 = PaperOffset.offset(tri1offset, 1);
    var c2 = PaperOffset.offset(tri2offset, 1);


    var pocketGroup1 = new Paper.Group([c1, tri1offset])
    pocketGroup1.name = 'pocket';
    pocketGroup1.fillColor = new Paper.Color('lightgrey')
    pocketGroup1.clipped = true;

    var pocketGroup2 = new Paper.Group([c2, tri2offset])
    pocketGroup2.name = 'pocket';
    pocketGroup1.fillColor = new Paper.Color('lightgrey')
    pocketGroup2.clipped = true;

    var topgroup1 = new Paper.Group([tri1, pocketGroup1])

    var topgroup2 = new Paper.Group([tri2, pocketGroup2])







    var hitOptions = {
        segments: false,
        stroke: false,
        fill: true,
        tolerance: 5
    };


    var CornerOptions = {
        segments: true,
        stroke: false,
        fill: false,
        tolerance: 5
    };


    function getSelectedThing(item) {

        // Only check curves and segments if item is a path.
        if (item.getClassName() === 'Path') {
            // Check curves.
            for (var i = 0, l = item.curves.length; i < l; i++) {
                if (item.curves[i].selected) {
                    return item.curves[i];
                }
            }
            // Check segments.
            for (var i = 0, l = item.segments.length; i < l; i++) {
                if (item.segments[i].selected) {
                    return item.segments[i];
                }
            }
        }




        // return item by default.
        return item;
    }













    // Toolstack

    class ToolStack {

        tools: any[];

        constructor(tools) {
            this.tools = tools.map(tool => tool())
        }

        activateTool(name) {
            const tool = this.tools.find(tool => tool.name === name)
            tool.activate()
        }
        // add more methods here as you see fit ...
    }

    // Tool Path, draws paths on mouse-drag

    const toolPath = () => {
        const tool = new Paper.Tool()
        tool.name = 'toolPath'

        let path

        tool.onMouseDown = function (event) {
            path = new Paper.Path()
            path.strokeColor = '#424242'
            path.strokeWidth = 4
            path.add(event.point)
        }

        tool.onMouseDrag = function (event) {
            path.add(event.point)
        }

        return tool
    }

    // Tool Circle, draws a 30px circle on mousedown

    const toolCircle = () => {
        const tool = new Paper.Tool()
        tool.name = 'toolCircle'

        let path

        tool.onMouseDown = function (event) {
            path = new Paper.Path.Circle({
                center: event.point,
                radius: 30,
                fillColor: '#9C27B0'
            })
        }

        return tool
    }

    const toolLed = () => {
        const tool = new Paper.Tool()
        tool.name = 'toolLed'

        tool.onMouseDown = function (event) {
            var hitResult = Paper.project.hitTest(event.point, hitOptions);
            if (!hitResult)
                return;

            var item = hitResult.item;
            var group = item.parent;

            var newLed = new Paper.Path.Circle(event.point, 30);
            group.addChild(newLed);

            var noAlpha = new Paper.Color(1, 1, 1, 0);

            var col = new Paper.Color(1, 0, 0, 1);
            col.hue = Math.random() * 360;
            //      col.sat = 1;
            col.brightness = 1;


            newLed.fillColor = {
                gradient: {
                    stops: [[col, 0.2], [noAlpha, 1]],
                    radial: true
                },
                origin: newLed.position,
                destination: newLed.bounds.rightCenter
            };

            newLed.blendMode = 'multiply';
            //newLed.blendMode = 'add';
            //newLed.blendMode = 'average';
        }

        return tool
    }

    const toolSelect = () => {
        const tool = new Paper.Tool()
        tool.name = 'toolSelect'

        tool.onMouseDown = function (event) {
            // ...only select what was clicked.

            //clear selected from all other objects?
            globalSelected = [];
            Paper.project.deselectAll();
            selectCircle.visible = false;

            var hit = Paper.project.hitTestAll(event.point, CornerOptions);


            if (hit) {

                for (let i = 0; i < hit.length; i++) {
                    hit[i].segment.selected = true;
                }

                // puts segments into global array
                globalSelected = Paper.project.activeLayer.getItems({ selected: true }).map(getSelectedThing)

                // puts selected items into an array
                selectedItems = Paper.project.activeLayer.getItems({ selected: true });

                console.log("selected Items " + selectedItems)
                for (let i = 0; i < selectedItems.length; i++) {
                    deleteChildren(selectedItems[i]);
                }


                //globalSelected = hit;
                if (globalSelected[0] != null) {
                    selectCircle.visible = true;
                    selectCircle.position = globalSelected[0].point;
                }
            }

            // console.log(globalSelected)
        }

        tool.onMouseUp = function (event) {
            console.log(globalSelected)
            for (let i = 0; i < selectedItems.length; i++) {
                createOffsetAgain(selectedItems[i]);
            }
        }

        tool.onMouseDrag = function (event) {
            if (globalSelected[0] != null) {
                for (let i = 0; i < globalSelected.length; i++) {
                    globalSelected[i].point = event.point;
                }
                selectCircle.position = globalSelected[0].point;
            }
        }


        tool.onMouseMove = function (event) {
            //       mouse.point = event.point;
            //        mouseText.content = 'Mouse position: ' + mouse.point.toString();

            var hit = Paper.project.hitTestAll(event.point, CornerOptions);
            hitText.content = 'Mouse Hit: ' + hit.toString();

        }

        tool.onKeyDown = function (event) {

            if (event.key == 'a') {
                for (let i = 0; i < globalSelected.length; i++) {
                    globalSelected[i].point.x -= moveAmount;
                    selectCircle.position = globalSelected[0].point;
                }
            };
            if (event.key == 'd') {
                for (let i = 0; i < globalSelected.length; i++) {
                    globalSelected[i].point.x += moveAmount;
                    selectCircle.position = globalSelected[0].point;
                }
            };
            if (event.key == 'w') {
                for (let i = 0; i < globalSelected.length; i++) {
                    globalSelected[i].point.y += moveAmount;
                    selectCircle.position = globalSelected[0].point;
                }
            };
            if (event.key == 's') {
                for (let i = 0; i < globalSelected.length; i++) {
                    globalSelected[i].point.y -= moveAmount;
                    selectCircle.position = globalSelected[0].point;
                }
            };
            if (event.key == 'x') {
                var testHit = Paper.project.hitTestAll(mouse.point, CornerOptions);

                console.log(testHit);
            }




        }


        return tool
    }





    // Construct a Toolstack, passing your Tools

    const toolStack = new ToolStack([toolSelect, toolLed, toolPath, toolCircle])

    // Activate a certain Tool

    toolStack.activateTool('toolSelect')
    //toolStack.activateTool('toolLed')



    var toolText = new Paper.PointText(new Paper.Point(20, 40));
    toolText.fontSize = 8;
    toolText.content = 'Active Tool: ' + toolStack.tools[1].name;
    toolText.matrix.d = -1;



};





export default draw1;