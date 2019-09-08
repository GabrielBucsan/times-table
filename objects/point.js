class Point{
    constructor(c, pos, pointColor, lineColor){
        this.pos = pos;
        this.c = c;
        this.pointColor = pointColor || '#ffffff';
        this.lineColor = lineColor || '#949494'

        this.radius = 2;
        this.connected = [];
    }

    connectTo(point){
        if(this !== point && !this.connected.includes(point) && !point.connected.includes(this)){
            this.connected.push(point);
        }
    }

    render(){
        this.c.beginPath();
        this.c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        this.c.fillStyle = this.pointColor;
        this.c.closePath();
        this.c.fill();
        
        for (let i = 0; i < this.connected.length; i++) {
            this.c.beginPath();
            this.c.moveTo(this.pos.x, this.pos.y);
            this.c.lineTo(this.connected[i].pos.x, this.connected[i].pos.y);
            this.c.closePath();
        }
        this.c.strokeStyle = this.lineColor;
        this.c.stroke();

    }
}