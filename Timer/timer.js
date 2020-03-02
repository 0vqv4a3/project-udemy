class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        ///the code inside constructor function will
        ///immediately running in instance a new object created
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        // callbacks is optional, this will tell the outside 
        // for the event that occurs inside class Timer
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        // eventlistener is added here so that in instance an object created 
        // to make sure when start button clicked
        //the start method will be called this is called binding
        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }


    start = () => {
        if (this.onStart) {
            this.onStart();
        }
        this.tick();
        this.interval = setInterval(this.tick, 1000);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = --this.timeRemaining;
            if (this.onTick) {
                this.onTick();
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time) {
        this.durationInput.value = time;
    }
}