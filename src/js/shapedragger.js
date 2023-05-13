export default class ShapeDragger {
    constructor(canvas) {
        this.canvas = canvas;
        this.selectedShape = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const shapeSelect = document.getElementById("shape-select");
        shapeSelect.addEventListener("change", this.handleShapeSelect.bind(this));
        this.canvas.addEventListener("dragover", this.handleDragOver.bind(this));
        this.canvas.addEventListener("drop", this.handleDrop.bind(this));
    }

    handleShapeSelect(event) {
        this.selectedShape = event.target.value;
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;
        const shape = this.getShape(x, y);
        if (shape) {
            shape.draw(this.canvas.ctx);
        }
    }

    getShape(x, y) {
        switch (this.selectedShape) {
            case "circle":
                return new Circle(x, y, 50);
            case "rectangle":
                return new Rectangle(x - 50, y - 50, 100, 100);
            case "triangle":
                return new Triangle(x, y, 100);
            default:
                return null;
        }
    }
}