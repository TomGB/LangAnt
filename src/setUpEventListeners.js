const setUpEventListeners = (simulation) => {
    const newButton = document.getElementsByClassName('new')[0];
    const instructionsInputButton = document.getElementsByClassName('input')[0];
    const skipInputButton = document.getElementsByClassName('skipInput')[0];

    const procesInstructionsInput = () => {
        const newInstructions = instructionsInputButton
            .value
            .split('')
            .map(item =>
                ['l','L'].includes(item) ? -1 : 1
            );
    
        console.log(newInstructions);

        simulation.setInstructions(newInstructions);
    }

    newButton.addEventListener('click', procesInstructionsInput);
  
    const setFrameSkipListener = () => {
        simulation.framesToSkip = skipInputButton.value;
        console.log(simulation.getInstructions());
    };

    skipInputButton.addEventListener('input', setFrameSkipListener);
    skipInputButton.addEventListener('change', setFrameSkipListener);
}

module.exports = setUpEventListeners;