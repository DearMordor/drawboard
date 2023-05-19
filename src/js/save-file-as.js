class LabelAnimator {
    constructor(selector) {
        this.labels = document.querySelectorAll(selector);
    }

    animate() {
        this.labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                .join('')
        });
    }
}

class ImageDownloader {
    constructor(saveButtonId, backButtonId, defaultFileName) {
        this.saveButton = document.getElementById(saveButtonId);
        this.backButton = document.getElementById(backButtonId);
        this.defaultFileName = defaultFileName;
        this.saveButton.addEventListener('click', this.downloadImage.bind(this));
        this.inputField = document.getElementById("filename");
        this.errorMessage = document.getElementById("errorMessage")
    }

    downloadImage() {
        let fileName = this.inputField.value || this.defaultFileName;

        if (!this.validateInput()) {
            return;
        }

        let dataURL = localStorage.getItem('canvasImage');

        let link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    validateInput() {
        const inputValue = this.inputField.value.trim();

        if (inputValue === '') {
            this.displayErrorMessage('Input cannot be empty.');
            return false;
        }
        this.clearErrorMessage();
        return true;
    }

    displayErrorMessage(message) {
        this.errorMessage.textContent = message;
    }

    clearErrorMessage() {
        this.errorMessage.textContent = '';
    }
}

class FillManager {
    constructor() {
        this.fills = document.querySelectorAll('.fill');
        this.empties = document.querySelectorAll('.empty');
        this.activeFill = null;
        this.startX = 0;
        this.currentX = 0;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.fills.forEach((fill) => {
            fill.addEventListener('dragstart', this.dragStart.bind(this));
            fill.addEventListener('dragend', this.dragEnd.bind(this));
            fill.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
            fill.addEventListener('touchmove', this.touchMove.bind(this), { passive: true });
        });

        this.empties.forEach((empty) => {
            empty.addEventListener('dragover', this.dragOver.bind(this));
            empty.addEventListener('dragenter', this.dragEnter.bind(this));
            empty.addEventListener('dragleave', this.dragLeave.bind(this));
            empty.addEventListener('drop', this.dragDrop.bind(this));
        });

        window.addEventListener('touchend', this.touchEnd.bind(this), { passive: true });
    }

    dragStart() {
        this.activeFill = this;
        this.className += ' hold';
        setTimeout(() => (this.className = 'invisible'), 0);
        this.startX = 0;
        this.currentX = 0;
    }

    dragEnd() {
        this.className = 'fill';
        this.activeFill = null;
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
    }

    dragLeave() {
        this.className = 'empty';
    }

    dragDrop() {
        this.className = 'empty';
        this.parentNode.appendChild(this.activeFill);
    }

    touchStart(e) {
        this.activeFill = this;
        this.startX = e.touches[0].clientX;
        this.currentX = this.startX;
    }

    touchMove(e) {
        if (!this.activeFill) return;
        e.preventDefault();
        this.currentX = e.touches[0].clientX;
        const deltaX = this.currentX - this.startX;
        this.activeFill.style.transform = `translateX(${deltaX}px)`;
    }

    touchEnd() {
        if (!this.activeFill) return;
        this.activeFill.style.transform = 'translateX(0)';
        this.activeFill = null;
    }
}

class DragManager {
    constructor(ascendingOrderChecker) {
        this.draggables = [];
        this.dropzones = [];
        this.ascendingOrderChecker = ascendingOrderChecker
    }

    initialize() {
        const draggableElements = [...document.querySelectorAll(".draggable")];
        const dropzoneElements = [...document.querySelectorAll(".dropzone")];

        draggableElements.forEach((element) => {
            const draggable = new Draggable(element);
            this.draggables.push(draggable);
        });

        dropzoneElements.forEach((element) => {
            const dropzone = new Dropzone(element, this.ascendingOrderChecker);
            this.dropzones.push(dropzone);
        });
    }
}

class Draggable {
    constructor(element) {
        this.element = element;
        this.element.addEventListener("dragstart", this.dragStart.bind(this));
        this.element.addEventListener("dragend", this.dragEnd.bind(this));
    }

    dragStart() {
        this.element.classList.add("is-dragging");
    }

    dragEnd() {
        this.element.classList.remove("is-dragging");
    }
}

class Dropzone {
    constructor(element, ascendingOrderChecker) {
        this.element = element;
        this.ascendingOrderChecker = ascendingOrderChecker
        this.element.addEventListener("dragover", this.dragOver.bind(this));
        this.element.addEventListener("drop", this.dragDrop.bind(this));
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragDrop(e) {
        const draggable = document.querySelector(".is-dragging");
        if (!draggable) return;
        const afterElement = this.getDragAfterElement(e.clientY);
        if (afterElement) {
            this.element.insertBefore(draggable, afterElement);
        } else {
            this.element.appendChild(draggable);
        }

        this.ascendingOrderChecker.checkOrder();

    }

    getDragAfterElement(y) {
        const draggableElements = [
            ...this.element.querySelectorAll(".draggable:not(.is-dragging)")
        ];

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return {
                        offset,
                        element: child
                    };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY }
        ).element;
    }
}

class AscendingOrderChecker {
    constructor(dropzoneContainer, formHTML) {
        this.dropzoneContainer = dropzoneContainer;
        this.formHTML = formHTML;
        this.dropzone = this.dropzoneContainer.querySelector('.dropzone');
        this.draggables = [...this.dropzone.querySelectorAll('.draggable')];
    }

    checkOrder() {
        this.draggables = [...this.dropzone.querySelectorAll('.draggable')];
        const values = this.draggables.map((draggable) => parseInt(draggable.innerText));
        console.log(values)
        const isAscending = values.every((value, index, array) => index === 0 || value > array[index - 1]);
        console.log(isAscending)

        if (isAscending) {
            this.removeDropzoneContainer();
            this.addFormToDocument();

            let downloader = new ImageDownloader("saveButton", "back", 'myDrawing.png');
            console.log(downloader)
            let animator = new LabelAnimator('.form-control label');
            animator.animate();


            return true;
        }

        return false;
    }

    removeDropzoneContainer() {
        this.dropzoneContainer.remove();
        console.log("Hello")
    }

    addFormToDocument() {
        const container = document.getElementById('container');
        container.innerHTML = this.formHTML;
        console.log("Hi")
    }
}

const dropzoneContainer = document.querySelector('.dropzone-container');
const formHTML = `
    <h1>Save canvas as PNG</h1>
    <form>
        <div class="form-control">
            <input type="text" id="filename" name="filename" required minlength="3" maxlength="15" placeholder="" autofocus>
            <label for="filename">FileName</label>
            <span id="errorMessage"></span>
        </div>
        <button type="button" id="saveButton" class="saveButton">Save</button>
    </form>`;

const ascendingOrderChecker = new AscendingOrderChecker(dropzoneContainer, formHTML);

const dragManager = new DragManager(ascendingOrderChecker);
dragManager.initialize();

const fillManager = new FillManager();
