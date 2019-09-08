$(document).ready(()=>{

    const canvas = new Canvas(600, 600);
    const c = canvas.context;
    const pointsSlider = $('#pointsRange');
    const multiplicatorSlider = $('#multiplicatorRange');
    const pointsColorPicker = $('#pointsColor');
    const linesColorPicker = $('#linesColor');

    let radius = 250;
    let points = [];
    let direction = new Vector();

    // MAIN FUNCTION
    (function animate(){
        requestAnimationFrame(animate);
        canvas.update();

        for (let i = 0; i < points.length; i++) {
            points[i].render();
        }
    })();

    $('#pointsRange').on('input', function () {
        calculatePoints();
    });
    $('#multiplicatorRange').on('input', function () {
        calculatePoints();
    });
    $('#pointsColor').on('input', function () {
        calculatePoints();
    });
    $('#linesColor').on('input', function () {
        calculatePoints();
    });


    var calculatePoints = function(){
        let numPoints = Number(pointsSlider[0].value);
        let multiplicator = Number(multiplicatorSlider[0].value);
        let pointsColor = pointsColorPicker[0].value;
        let linesColor = linesColorPicker[0].value;
        points = [];

        for (let i = 0; i < numPoints; i++) {
            let step = i * Math.PI * 2 / numPoints;
            step = new Vector(Math.cos(step), Math.sin(step));
            let localDir = new Vector(direction.x, direction.y);
            localDir.add(step);
            localDir.divideVector(2);
            localDir.multiplyVector(radius * 2);
            points.push(new Point(c, new Vector(canvas.size.x / 2 + localDir.x, canvas.size.y / 2 + localDir.y), pointsColor, linesColor));
        }
    
        for (let i = 0; i < points.length; i++) {
            let double = i * multiplicator;
            if(double >= numPoints) double = double % numPoints;
            points[i].connectTo(points[double]);
        }
    }

    calculatePoints();
});