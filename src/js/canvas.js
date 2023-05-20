import Toolbox from "./toolbox.js";
import History from "./history.js";

// This class represents a Canvas for drawing on a web page.
// It provides functionality for drawing lines and circles, erasing, saving and restoring the canvas state, 
// and handling user interactions.
// The canvas is initialized with a given canvas ID and various button and element IDs for controlling the canvas.
export default class Canvas {
  constructor(canvasId, increaseBtnId, decreaseBtnId, sizeElId, colorElId, clearElId) {
    this.canvas = document.getElementById(canvasId);
    this.clearEl = document.getElementById(clearElId);
    this.saveButton = document.getElementById("saveButton");
    this.eraseButton = document.getElementById("eraser");
    this.penButton = document.getElementById("pen");
    this.ctx = this.canvas.getContext('2d');

    this.penButton.addEventListener('click', () => {
      this.setTool('pen');
    });

    this.ctx.canvas.width = this.calculateWidth();
    this.ctx.canvas.height = this.calculateHeight();
    this.isPressed = false;
    this.x = undefined;
    this.y = undefined;

    this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    this.clearEl.addEventListener('click', this.clearCanvas.bind(this));
    this.saveButton.addEventListener('click', () => this.saveToLocalStorage());
    document.getElementById('eraser').addEventListener('click', () => {
      this.setTool('eraser');
    });

    // Create instances of Toolbox and History to manage tool settings and drawing history
    this.toolbox = new Toolbox(increaseBtnId, decreaseBtnId, sizeElId, colorElId);
    this.history = new History('undo', 'redo', this.ctx);
    this.currentTool = 'pen';

    this.toolbox.updateSizeOnScreen();
  }

  // Handle mouse down event on the canvas
  mouseDown(e) {
    if (e.button === 0) {
      this.isPressed = true;
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }

  // Handle mouse up event on the canvas
  mouseUp(e) {
    this.isPressed = false;
    this.x = undefined;
    this.y = undefined;
    this.history.addState(this.getCurrentImageData())
  }

  // Handle mouse move event on the canvas
  mouseMove(e) {
    if (this.isPressed) {
      const x2 = e.offsetX;
      const y2 = e.offsetY;
      if (this.currentTool === 'eraser') {
        this.erase(x2, y2);
      } else {
        this.drawCircle(x2, y2);
        this.drawLine(this.x, this.y, x2, y2);
      }
      this.x = x2;
      this.y = y2;
    }
  }

  // Draw a filled circle at the specified coordinates
  drawCircle(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.toolbox.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.toolbox.color;
    this.ctx.fill();
  }

  // Draw a line between two sets of coordinates
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
    return this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  saveToLocalStorage() {
    let dataURL = this.canvas.toDataURL("image/png");
    localStorage.setItem('canvasImage', dataURL);

    history.pushState(null, null, 'save_file_as.html');
    location.reload();
  }

  setTool(tool) {
    this.currentTool = tool;
  }

  // Erase a portion of the canvas at the specified coordinates using the size of the toolbox's 
  erase(x, y) {
    this.ctx.clearRect(x - this.toolbox.size / 2, y - this.toolbox.size / 2, this.toolbox.size, this.toolbox.size);
  }

  // Restore the canvas by drawing a saved image from the local storage.
  restoreFromLocalStorage() {
    let savedImage = localStorage.getItem('canvasImage');
    if (savedImage) {
      let img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);
      }
      img.src = savedImage;
    }
  }

}