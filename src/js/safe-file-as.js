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
    constructor(saveButtonId, defaultFileName) {
        this.saveButton = document.getElementById(saveButtonId);
        console.log(this.saveButton);
        this.defaultFileName = defaultFileName;

        this.saveButton.addEventListener('click', this.downloadImage.bind(this));
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
}

// Usage
let downloader = new ImageDownloader("saveButton", 'myDrawing.png');

// Usage
let animator = new LabelAnimator('.form-control label');
animator.animate();
