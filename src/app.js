const Simulation = require('./Simulation');

document.onload = () => {
    const simulation = new Simulation();
    setUpEventListeners(simulation);
}