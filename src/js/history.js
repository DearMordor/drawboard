/**
 * History manager for undo and redo functionality.
 */
export default class History {
  /**
   * Create a History instance.
   * @param {string} undoBtnId - The ID of the undo button element.
   * @param {string} redoBtnId - The ID of the redo button element.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
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

  /**
   * Initialize event handlers for the undo and redo buttons.
   * @private
 */
  initEventHandlers() {
    this.undoBtn.addEventListener('click', this.undo.bind(this));
    this.redoBtn.addEventListener('click', this.redo.bind(this));
  }

  /**
 * Add a new state to the undo stack.
 * @param {ImageData} state - The state to be added.
 * @returns {ImageData} The added state.
 */
  addState(state) {
    this.undoStack.push(state);
    this.redoStack = [];
    this.currentState = state;
    this.updateButtons();
    this.undoIndex += 1;
  }

  /**
 * Perform an undo operation.
 */
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

  /**
 * Perform a redo operation.
 */
  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.currentState);
      this.undoIndex += 1;

      this.currentState = this.redoStack.pop();
      this.ctx.putImageData(this.currentState, 0, 0);
      this.updateButtons();
    }
  }

  /**
  * Reset the history with a new state.
  * @param {ImageData} state - The new state to be set.
  */
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