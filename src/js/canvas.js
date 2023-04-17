export default class Canvas {
    constructor(canvasId, increaseBtnId, decreaseBtnId, sizeElId, colorElId, clearElId) {
      this.canvas = document.getElementById(canvasId);
      this.increaseBtn = document.getElementById(increaseBtnId);
      this.decreaseBtn = document.getElementById(decreaseBtnId);
      this.sizeEl = document.getElementById(sizeElId);
      this.colorEl = document.getElementById(colorElId);
      this.clearEl = document.getElementById(clearElId);
      this.ctx = this.canvas.getContext('2d');
  
      this.ctx.canvas.width = this.calculateWidth();
      this.ctx.canvas.height = this.calculateHeight();
      this.size = 10;
      this.isPressed = false;
      this.color = 'black';
      this.x = undefined;
      this.y = undefined;
  
      this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
      document.addEventListener('mouseup', this.mouseUp.bind(this));
      this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
      this.increaseBtn.addEventListener('click', this.increaseSize.bind(this));
      this.decreaseBtn.addEventListener('click', this.decreaseSize.bind(this));
      this.colorEl.addEventListener('change', this.changeColor.bind(this));
      this.clearEl.addEventListener('click', this.clearCanvas.bind(this));
  
      this.updateSizeOnScreen();
    }
  
    mouseDown(e) {
      this.isPressed = true;
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  
    mouseUp(e) {
      this.isPressed = false;
      this.x = undefined;
      this.y = undefined;
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
      this.ctx.arc(x, y, this.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  
    drawLine(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.size * 2;
      this.ctx.stroke();
    }
  
    updateSizeOnScreen() {
      this.sizeEl.innerText = this.size;
    }
  
    increaseSize() {
      this.size += 5;
      if (this.size > 50) {
        this.size = 50;
      }
      this.updateSizeOnScreen();
    }
  
    decreaseSize() {
      this.size -= 5;
      if (this.size < 5) {
        this.size = 5;
      }
      this.updateSizeOnScreen();
    }
  
    changeColor(e) {
      this.color = e.target.value;
    }
  
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    calculateWidth() {
        return window.innerWidth;
    }

    calculateHeight() {
        const toolboxHeight = document.getElementById('toolbox').offsetHeight;
        return window.innerHeight - toolboxHeight; 
    }
  }  