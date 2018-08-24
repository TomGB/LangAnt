const DEFAULT_INSTRUCTIONS = [1, -1];
const DEFAULT_FRAME_SKIP = 1000;

class Simulation {
    constructor({ 
        width, height }) {
        this.map = {
            width,
            height,
            state: new Array(width).fill().map(() => new Array(height).fill(0)),
        };
        this.hasEnded = false;
        this.currentStep = 0;
        this.instructions = DEFAULT_INSTRUCTIONS;
        this.framesToSkip = DEFAULT_FRAME_SKIP;
        this.ant = {
            posX: width / 2,
            posY: height / 2,
            oldPosX: width / 2,
            oldPosY: height / 2,
            direction: 0,
            movements: [
                [0, -1],
                [-1, 0],
                [0, 1],
                [1, 0],
            ]
        };
    }

    setInstructions(newInstructions) {
        this.instructions = newInstructions;
    }

    getInstructions() {
        return this.instructions;
    }

    _updateOldAntPosition() {
        this.ant.oldPosX = this.ant.posX;
        this.ant.oldPosY = this.ant.posY;
    }

    _rotateAnt() {
        console.log(this.ant);
        
        const currentLocationInstructions = this.map.state[this.ant.posX][this.ant.posY];
        this.ant.direction += this.instructions[currentLocationInstructions];
    }

    _constrainDirection() {
        const { ant } = this; 
        if (ant.direction < 0) {
          ant.direction += 4
        } else if (ant.direction > 3) {
          ant.direction -= 4
        }
    }

    _moveBasedOnDirection() {
        const [dx, dy] = this.ant.movements[this.ant.direction];
        this.ant.posX += dx;
        this.ant.posY += dy;
    }

    _antOutsideMap() {
        return this.ant.posX < 0 || this.ant.posX >= this.map.width - 1 || this.ant.posY < 0 || this.ant.posY >= this.map.height - 1;
    }

    _updateMapState() {
        const { oldPosX, oldPosY } = this.ant;
        let newState = this.map.state[oldPosX][oldPosY] + 1;
      
        if (newState === this.instructions.length) {
            newState -= this.instructions.length;
        }

        console.log(newState);
        
      
        this.map.state[this.ant.oldPosX][this.ant.oldPosY] = newState;
    }

    takeStep() {
        this.currentStep ++;
        this._updateOldAntPosition();
        this._rotateAnt();
        this._constrainDirection();
        this._moveBasedOnDirection();

        if (this._antOutsideMap()) {
            this.hasEnded = true;
            return;
        }
        
        this._updateMapState();
    }
};

module.exports = Simulation;