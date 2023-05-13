class Triangle extends Shape {
    constructor(x, y, size) {
        super(x, y);
        this.size = size;
    }

    draw(ctx) {
        const height = this.size * Math.sqrt(3) / 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size / 2, this.y + height);
        ctx.lineTo(this.x - this.size / 2, this.y + height);
        ctx.closePath();
        ctx.stroke();
    }
}