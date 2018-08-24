const Simulation = require('./Simulation');
const ui = require('./ui');
const setUpEventListeners = require('./setUpEventListeners');

const { height, width } = ui.getCanvas();
const scale = 2;
let simulation;

const newSimulation = (instructions) => {
    ui.clearCanvas();
    const simSize = { height: height / scale, width: width / scale };
    simulation = new Simulation(simSize, instructions);
    setUpEventListeners(simulation, newSimulation);
    requestAnimationFrame(mainLoop);
}

const mainLoop = () => {
    do {
        simulation.takeStep();
        ui.drawMap(simulation, scale);
    } while (simulation.currentStep % simulation.framesToSkip !== 0 && !simulation.hasEnded);
  
    if (!simulation.hasEnded) requestAnimationFrame(mainLoop)
}

newSimulation();
mainLoop();