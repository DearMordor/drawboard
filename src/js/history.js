export default class History {
  constructor(undoBtnId, redoBtnId, ctx) {
    this.undoBtn = document.getElementById(undoBtnId);
    this.redoBtn = document.getElementById(redoBtnId);
    this.ctx = ctx;
    this.undoStack = [];
    this.redoStack = [];
    this.undoIndex = -1;
    this.redoIndex = -1;
    this.currentState = this.addState(ctx.getImageData(0, 0, 
                                                        this.ctx.canvas.width, 
                                                        this.ctx.canvas.height));
    this.initEventHandlers()
  }

  initEventHandlers() {
    this.undoBtn.addEventListener('click', this.undo.bind(this));
    this.redoBtn.addEventListener('click', this.redo.bind(this));
  }

  addState(state) {
    this.undoStack.push(state);
    this.redoStack = [];
    this.currentState = state;
    this.updateButtons();
    this.undoIndex += 1;
  }

  undo() {
    console.log(this.undoStack.length);
    console.log(this.undoStack);
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.currentState);
      this.redoIndex += 1;
      this.undoIndex -= 1;
      this.undoStack.pop();

      this.currentState = this.undoStack[this.undoIndex];
      console.log(this.currentState);
      this.ctx.putImageData(this.currentState, 0, 0);
      this.updateButtons();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.currentState);
      this.undoIndex += 1;

      this.currentState = this.redoStack.pop();
      this.ctx.putImageData(this.currentState, 0, 0);
      this.updateButtons();
    }
  }

  resetHistory(state) {
    this.undoStack = [];
    this.undoIndex = -1;
    this.redoIndex = -1;
    this.addState(state);
  }

  updateButtons() {
    // Enable/Disable Undo button
    if (this.undoStack.length === 0) {
      this.undoBtn.disabled = true;
    } else {
      this.undoBtn.disabled = false;
    }

    // Enable/Disable Redo button
    if (this.redoStack.length === 0) {
      this.redoBtn.disabled = true;
    } else {
      this.redoBtn.disabled = false;
    }  
  }
}