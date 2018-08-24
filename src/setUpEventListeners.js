const setUpEventListeners = (simulation, newSimulation) => {
    const readInstructionsButton = document.getElementsByClassName('new')[0];
    const instructionsInputArea = document.getElementsByClassName('input')[0];
    const skipInputButton = document.getElementsByClassName('skipInput')[0];

    const procesInstructionsInput = () => {
        const instructions = instructionsInputArea
            .value
            .split('')
            .map(item =>
                ['l','L'].includes(item) ? -1 : 1
            );
    
        console.log(instructions);

        newSimulation(instructions);
    }

    readInstructionsButton.addEventListener('click', procesInstructionsInput);
  
    const setFrameSkipListener = () => {
        simulation.framesToSkip = skipInputButton.value;
    };

    skipInputButton.addEventListener('input', setFrameSkipListener);
    skipInputButton.addEventListener('change', setFrameSkipListener);
}

module.exports = setUpEventListeners;