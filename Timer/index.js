class Timer {
    constructor(durationInput, startButton, pauseButton) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        this.startButton.addEventListener('click', this.start)
    }

    //method for timer to start
    start() {

    }
    //
    pause() {

    }
    onDurationChange() {

    }
    tick() {

    }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');