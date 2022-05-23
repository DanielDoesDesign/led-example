import Paper from 'paper';

class Led {

    active: boolean
    angle: number
    //color: color
    selected: boolean
    pos: [number, number]

    constructor() {

        var newLed = new Paper.Path.Circle(event.point, 30);

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

    }


    init() {
    }

    update() {
        // update the led with new values, brightness, color, position etc
    }

    move() {
        // updates the position of the led. redraws. and updates the LedPosArray (that can be exported)
    }



}
