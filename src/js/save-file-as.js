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
        console.log(this.saveButton);
        this.defaultFileName = defaultFileName;

        this.saveButton.addEventListener('click', this.downloadImage.bind(this));
        this.backButton.addEventListener('click', this.goBack.bind(this));
    }

    downloadImage(fileName) {
        fileName = fileName || this.defaultFileName;

        let dataURL = localStorage.getItem('canvasImage');

        let link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    goBack() {
        window.history.back();
    }
}

// Usage
let downloader = new ImageDownloader("saveButton", "back", 'myDrawing.png');

// Usage
let animator = new LabelAnimator('.form-control label');
animator.animate();
