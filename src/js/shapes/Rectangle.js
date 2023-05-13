class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}