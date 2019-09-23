$(document).ready(()=>{

    const canvas = new Canvas(510, 510);
    const c = canvas.context;
    const pointsSlider = $('#pointsRange');
    const multiplicatorSlider = $('#multiplicatorRange');
    const lineWidthSlider = $('#lineWidthRange');
    const pointsColorPicker = $('#pointsColor');
    const linesColorPicker = $('#linesColor');

    let radius = 210;
    let points = [];
    let direction = new Vector();

    $('#pointsRange').on('input', function () {
        calculatePoints();
    });
    $('#multiplicatorRange').on('input', function () {
        calculatePoints();
    });
    $('#lineWidthRange').on('input', function () {
        calculatePoints();
    });
    $('#pointsColor').on('input', function () {
        calculatePoints();
    });
    $('#linesColor').on('input', function () {
        calculatePoints();
    });

    // calculates the points along the circle, positioning and making all the connections with each other
    let calculatePoints = function(){
        let numPoints = Number(pointsSlider[0].value);
        let multiplicator = Number(multiplicatorSlider[0].value);
        let lineWidth = Number(lineWidthSlider[0].value);
        let pointsColor = pointsColorPicker[0].value;
        let linesColor = linesColorPicker[0].value;
        points = [];

        // creating the points
        for (let i = 0; i < numPoints; i++) {
            let step = i * Math.PI * 2 / numPoints;
            step = new Vector(Math.cos(step), Math.sin(step));
            let localDir = new Vector(direction.x, direction.y);
            localDir.add(step);
            localDir.divideVector(2);
            localDir.multiplyVector(radius * 2);
            points.push(new Point(c, new Vector(canvas.size.x / 2 + localDir.x, canvas.size.y / 2 + localDir.y), pointsColor, linesColor, lineWidth));
        }
    
        // making connections
        for (let i = 0; i < points.length; i++) {
            let double = i * multiplicator;
            if(double >= numPoints) double = double % numPoints;
            points[i].connectTo(points[double]);
        }

        requestAnimationFrame(animate);
    }

    // MAIN FUNCTION
    let animate = function(){
        canvas.update();

        for (let i = 0; i < points.length; i++) {
            points[i].render();
        }
    };

    calculatePoints();
});