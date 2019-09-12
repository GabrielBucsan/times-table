class Point{
    constructor(c, pos, pointColor, lineColor, lineWidth){
        this.pos = pos;
        this.c = c;
        this.pointColor = pointColor || '#ffffff';
        this.lineColor = lineColor || '#949494';
        this.lineWidth = lineWidth;

        this.radius = 1;
        this.connected = [];
    }

    // connects this point to another point if they are not already connected (and if the points aren't the same)
    connectTo(point){
        if(this !== point && !this.connected.includes(point) && !point.connected.includes(this)){
            this.connected.push(point);
        }
    }

    // renders the point and the connections on the canvas
    render(){

        // render point
        this.c.beginPath();
        this.c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        this.c.fillStyle = this.pointColor;
        this.c.closePath();
        this.c.fill();
        
        // render connection lines
        for (let i = 0; i < this.connected.length; i++) {
            this.c.beginPath();
            this.c.moveTo(this.pos.x, this.pos.y);
            this.c.lineTo(this.connected[i].pos.x, this.connected[i].pos.y);
            this.c.closePath();
        }
        this.c.strokeStyle = this.lineColor;
        this.c.lineWidth = this.lineWidth;
        this.c.stroke();

    }
}