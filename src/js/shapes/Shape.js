class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        throw new Error('draw method must be implemented in sub-classes');
    }
}