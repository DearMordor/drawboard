/**
 * Represents a floating action button (FAB) for controlling audio playback.
 */
export default class FabButton {
    /**
         * Creates a new instance of the FabButton class.
         * @param {AudioPlayer} audioPlayer - The audio player object.
         * @param {string} pauseBtn - The content for the pause button.
     */
    constructor(audioPlayer, pauseBtn) {
        this.audioPlayer = audioPlayer;
        this.pauseBtn = pauseBtn
        this.isPlaying = false;
        this.fabElement = document.getElementById('fab');
        this.fabElement.addEventListener('click', this.togglePlayback.bind(this));
        this.fabElement.innerHTML = this.pauseBtn;
        this.animation = document.getElementById('animation');
        this.flip = true;
        this.pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28";
        this.play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
        this.transformButton()

    }
    /**
         * Toggles the audio playback.
     */
    togglePlayback() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.fabElement.innerHTML = this.pauseBtn;
            this.transformButton()
        } else {
            this.audioPlayer.play();
            this.audioPlayer.loop = true;
            this.transformButton()
        }
        this.isPlaying = !this.isPlaying;
    }

    /**
     * Transforms the button icon and animates the transition.
    */
    transformButton() {
        this.flip = !this.flip;
        this.animation.setAttribute('from', this.flip ? this.pause : this.play);
        this.animation.setAttribute('to', this.flip ? this.play : this.pause);
        this.animation.beginElement();
    }

}