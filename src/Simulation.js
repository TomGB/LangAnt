const DEFAULT_INSTRUCTIONS = [1, -1];
const DEFAULT_FRAME_SKIP = 100;

class Simulation {
    constructor() {
        this.hasEnded = false;
        this.currentStep = 0;
        this.instructions = DEFAULT_INSTRUCTIONS;
        this.framesToSkip = DEFAULT_FRAME_SKIP;
    }

    setInstructions(newInstructions) {
        this.instructions = newInstructions;
    }

    getInstructions() {
        return this.instructions;
    }
};

module.exports = Simulation;