const setUpEventListeners = (instructions) => {
    const canvas = document.getElementById('canvas');
    const g = canvas.getContext('2d');

    const newButton = document.getElementsByClassName('new')[0];
    const instructionsInputButton = document.getElementsByClassName('input')[0];
    const skipInputButton = document.getElementsByClassName('skipInput')[0];

    const procesInstructionsInput = () => {
        instructions = new Array();
    
        const newInstructions = instructionsInputButton.value.split('');
    
        newInstructions.map(item => {
            const direction = (['l','L'].includes(item)) ? -1 : 1;
            instructions.push(direction);
        })
    
        console.log(instructions);

        return instructions;
    }

    newButton.addEventListener('click', procesInstructionsInput);
  
    skipInputButton.addEventListener('input change', () => {
        simulation.framesToSkip = skipInputButton.value;
    });
  
}

module.exports = setUpEventListeners;