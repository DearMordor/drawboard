import Toolbox from "./toolbox.js";
import History from "./history.js";
export default class Canvas {
    constructor(canvasId, increaseBtnId, decreaseBtnId, sizeElId, colorElId, clearElId) {
      this.canvas = document.getElementById(canvasId);
      this.clearEl = document.getElementById(clearElId);
      this.ctx = this.canvas.getContext('2d');
  
      this.ctx.canvas.width = this.calculateWidth();
      this.ctx.canvas.height = this.calculateHeight();
      this.isPressed = false;
      this.x = undefined;
      this.y = undefined;
  
      this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
      this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));
      this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
      this.clearEl.addEventListener('click', this.clearCanvas.bind(this));
  
      this.toolbox = new Toolbox(increaseBtnId, decreaseBtnId, sizeElId, colorElId);
      this.history = new History('undo', 'redo', this.ctx);
      this.toolbox.updateSizeOnScreen();
    }

    mouseDown(e) {
      if (e.button === 0) {
        this.isPressed = true;
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    }
  
    mouseUp(e) {
      this.isPressed = false;
      this.x = undefined;
      this.y = undefined;
      this.history.addState(this.getCurrentImageData())
      console.log('Mouse is up')
    }
  
    mouseMove(e) {
      if (this.isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        this.drawCircle(x2, y2);
        this.drawLine(this.x, this.y, x2, y2);
        this.x = x2;
        this.y = y2;
      }
    }
  
    drawCircle(x, y) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.toolbox.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.toolbox.color;
      this.ctx.fill();
    }
  
    drawLine(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.strokeStyle = this.toolbox.color;
      this.ctx.lineWidth = this.toolbox.size * 2;
      this.ctx.stroke();  
    }
  
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.history.resetHistory(this.getCurrentImageData())
    }

    calculateWidth() {
      return window.innerWidth;
    }

    calculateHeight() {
      const toolboxHeight = document.getElementById('toolbox').offsetHeight;
      return window.innerHeight - toolboxHeight; 
    }

    getCurrentImageData() {
      return this.ctx.getImageData(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }  