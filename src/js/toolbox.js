export default class Toolbox {

  /**
 * Create a Toolbox instance.
 * @param {string} increaseBtnId - The ID of the increase button element.
 * @param {string} decreaseBtnId - The ID of the decrease button element.
 * @param {string} sizeElId - The ID of the size element.
 * @param {string} colorElId - The ID of the color element.
 */
  constructor(increaseBtnId, decreaseBtnId, sizeElId, colorElId) {
    this.increaseBtn = document.getElementById(increaseBtnId);
    this.decreaseBtn = document.getElementById(decreaseBtnId);
    this.sizeEl = document.getElementById(sizeElId);
    this.colorEl = document.getElementById(colorElId);
    this.size = 10;
    this.color = 'black';

    this.addEventListeners();
  }

  /**
 * Add event listeners to the buttons and color element.
 * @private
 */
  addEventListeners() {
    this.increaseBtn.addEventListener('click', this.increaseSize.bind(this));
    this.decreaseBtn.addEventListener('click', this.decreaseSize.bind(this));
    this.colorEl.addEventListener('change', this.changeColor.bind(this));

    document.getElementById("saveButton").addEventListener("click", this.redirect.bind(this));

  }
  /**
   * Increase the size by 5, up to a maximum of 50.
   */
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
    console.log(e.target.value);
  }

  updateSizeOnScreen() {
    this.sizeEl.innerText = this.size;
  }

  redirect() {
    window.location.href = "./src/pages/save_file_as.html";
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = size;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }
}