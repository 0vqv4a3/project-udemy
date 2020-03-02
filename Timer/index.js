class Timer {
  constructor(durationInput, startButton, pauseButton) {
    ///the code inside constructor function will
    ///immediately running in instance a new object created
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    // eventlistener is added here so that in instance an object created to make sure when start button clicked
    //the start method will be called this is called binding
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }


  start = () => {
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    let timeRemaining = this.timeRemaining;
    this.timeRemaining = --timeRemaining;
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}


const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButton);