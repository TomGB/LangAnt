const Simulation = require('./Simulation');
const ui = require('./ui');
const setUpEventListeners = require('./setUpEventListeners');

const canvas = ui.getCanvas();
const simulation = new Simulation(canvas);
setUpEventListeners(simulation);

const mainLoop = () => {
    do {
        simulation.takeStep();
        ui.drawMap(simulation);
    } while (simulation.currentStep % simulation.framesToSkip !== 0 && !simulation.hasEnded);
  
    if (!simulation.hasEnded) requestAnimationFrame(mainLoop)
}

mainLoop();

console.log(simulation);