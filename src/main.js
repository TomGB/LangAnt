const Simulation = require('./Simulation');
const setUpEventListeners = require('./setUpEventListeners');

// document.onload = () => {
    const simulation = new Simulation();
    setUpEventListeners(simulation);
// }