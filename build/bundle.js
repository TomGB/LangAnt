(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DEFAULT_INSTRUCTIONS = [1, -1];
const DEFAULT_FRAME_SKIP = 10;

class Simulation {
    constructor({ width, height }, instructions = DEFAULT_INSTRUCTIONS) {
        this.map = {
            width,
            height,
            state: new Array(width).fill().map(() => new Array(height).fill(0)),
        };
        this.hasEnded = false;
        this.currentStep = 0;
        this.instructions = instructions;
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
},{}],2:[function(require,module,exports){
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
},{"./Simulation":1,"./setUpEventListeners":3,"./ui":4}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const canvas = document.getElementById('canvas');
const g = canvas.getContext('2d');

const getCanvas = () => {
    return canvas;
}

const clearCanvas = () => {
    g.clearRect(0, 0, canvas.width, canvas.height);
}

const drawMap = (simulation, scale) => {
    const shade = parseInt(simulation.map.state[simulation.ant.oldPosX][simulation.ant.oldPosY] * 255 / (simulation.instructions.length - 1));
    const rgb = Array(3).fill(shade).join(',');
    g.fillStyle = `rgb(${rgb})`;
    g.fillRect(parseInt(simulation.ant.posX) * scale, parseInt(simulation.ant.posY) * scale, 1 * scale, 1 * scale);
}

module.exports = {
    getCanvas,
    clearCanvas,
    drawMap,
}
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU2ltdWxhdGlvbi5qcyIsInNyYy9tYWluLmpzIiwic3JjL3NldFVwRXZlbnRMaXN0ZW5lcnMuanMiLCJzcmMvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgREVGQVVMVF9JTlNUUlVDVElPTlMgPSBbMSwgLTFdO1xuY29uc3QgREVGQVVMVF9GUkFNRV9TS0lQID0gMTA7XG5cbmNsYXNzIFNpbXVsYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHsgd2lkdGgsIGhlaWdodCB9LCBpbnN0cnVjdGlvbnMgPSBERUZBVUxUX0lOU1RSVUNUSU9OUykge1xuICAgICAgICB0aGlzLm1hcCA9IHtcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgc3RhdGU6IG5ldyBBcnJheSh3aWR0aCkuZmlsbCgpLm1hcCgoKSA9PiBuZXcgQXJyYXkoaGVpZ2h0KS5maWxsKDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYXNFbmRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICAgIHRoaXMuZnJhbWVzVG9Ta2lwID0gREVGQVVMVF9GUkFNRV9TS0lQO1xuICAgICAgICB0aGlzLmFudCA9IHtcbiAgICAgICAgICAgIHBvc1g6IHdpZHRoIC8gMixcbiAgICAgICAgICAgIHBvc1k6IGhlaWdodCAvIDIsXG4gICAgICAgICAgICBvbGRQb3NYOiB3aWR0aCAvIDIsXG4gICAgICAgICAgICBvbGRQb3NZOiBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgbW92ZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAgWzAsIC0xXSxcbiAgICAgICAgICAgICAgICBbLTEsIDBdLFxuICAgICAgICAgICAgICAgIFswLCAxXSxcbiAgICAgICAgICAgICAgICBbMSwgMF0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0SW5zdHJ1Y3Rpb25zKG5ld0luc3RydWN0aW9ucykge1xuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9IG5ld0luc3RydWN0aW9ucztcbiAgICB9XG5cbiAgICBnZXRJbnN0cnVjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RydWN0aW9ucztcbiAgICB9XG5cbiAgICBfdXBkYXRlT2xkQW50UG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW50Lm9sZFBvc1ggPSB0aGlzLmFudC5wb3NYO1xuICAgICAgICB0aGlzLmFudC5vbGRQb3NZID0gdGhpcy5hbnQucG9zWTtcbiAgICB9XG5cbiAgICBfcm90YXRlQW50KCkge1xuICAgICAgICBjb25zdCBjdXJyZW50TG9jYXRpb25JbnN0cnVjdGlvbnMgPSB0aGlzLm1hcC5zdGF0ZVt0aGlzLmFudC5wb3NYXVt0aGlzLmFudC5wb3NZXTtcbiAgICAgICAgdGhpcy5hbnQuZGlyZWN0aW9uICs9IHRoaXMuaW5zdHJ1Y3Rpb25zW2N1cnJlbnRMb2NhdGlvbkluc3RydWN0aW9uc107XG4gICAgfVxuXG4gICAgX2NvbnN0cmFpbkRpcmVjdGlvbigpIHtcbiAgICAgICAgY29uc3QgeyBhbnQgfSA9IHRoaXM7IFxuICAgICAgICBpZiAoYW50LmRpcmVjdGlvbiA8IDApIHtcbiAgICAgICAgICBhbnQuZGlyZWN0aW9uICs9IDRcbiAgICAgICAgfSBlbHNlIGlmIChhbnQuZGlyZWN0aW9uID4gMykge1xuICAgICAgICAgIGFudC5kaXJlY3Rpb24gLT0gNFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX21vdmVCYXNlZE9uRGlyZWN0aW9uKCkgeyAgICAgICAgXG4gICAgICAgIGNvbnN0IFtkeCwgZHldID0gdGhpcy5hbnQubW92ZW1lbnRzW3RoaXMuYW50LmRpcmVjdGlvbl07XG4gICAgICAgIHRoaXMuYW50LnBvc1ggKz0gZHg7XG4gICAgICAgIHRoaXMuYW50LnBvc1kgKz0gZHk7XG4gICAgfVxuXG4gICAgX2FudE91dHNpZGVNYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFudC5wb3NYIDwgMCB8fCB0aGlzLmFudC5wb3NYID49IHRoaXMubWFwLndpZHRoIC0gMSB8fCB0aGlzLmFudC5wb3NZIDwgMCB8fCB0aGlzLmFudC5wb3NZID49IHRoaXMubWFwLmhlaWdodCAtIDE7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1hcFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9sZFBvc1gsIG9sZFBvc1kgfSA9IHRoaXMuYW50O1xuICAgICAgICBsZXQgbmV3U3RhdGUgPSB0aGlzLm1hcC5zdGF0ZVtvbGRQb3NYXVtvbGRQb3NZXSArIDE7XG4gICAgICBcbiAgICAgICAgaWYgKG5ld1N0YXRlID09PSB0aGlzLmluc3RydWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlIC09IHRoaXMuaW5zdHJ1Y3Rpb25zLmxlbmd0aDtcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgdGhpcy5tYXAuc3RhdGVbdGhpcy5hbnQub2xkUG9zWF1bdGhpcy5hbnQub2xkUG9zWV0gPSBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICB0YWtlU3RlcCgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCArKztcbiAgICAgICAgdGhpcy5fdXBkYXRlT2xkQW50UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcm90YXRlQW50KCk7XG4gICAgICAgIHRoaXMuX2NvbnN0cmFpbkRpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9tb3ZlQmFzZWRPbkRpcmVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbnRPdXRzaWRlTWFwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl91cGRhdGVNYXBTdGF0ZSgpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltdWxhdGlvbjsiLCJjb25zdCBTaW11bGF0aW9uID0gcmVxdWlyZSgnLi9TaW11bGF0aW9uJyk7XG5jb25zdCB1aSA9IHJlcXVpcmUoJy4vdWknKTtcbmNvbnN0IHNldFVwRXZlbnRMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL3NldFVwRXZlbnRMaXN0ZW5lcnMnKTtcblxuY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSB1aS5nZXRDYW52YXMoKTtcbmNvbnN0IHNjYWxlID0gMjtcbmxldCBzaW11bGF0aW9uO1xuXG5jb25zdCBuZXdTaW11bGF0aW9uID0gKGluc3RydWN0aW9ucykgPT4ge1xuICAgIHVpLmNsZWFyQ2FudmFzKCk7XG4gICAgY29uc3Qgc2ltU2l6ZSA9IHsgaGVpZ2h0OiBoZWlnaHQgLyBzY2FsZSwgd2lkdGg6IHdpZHRoIC8gc2NhbGUgfTtcbiAgICBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24oc2ltU2l6ZSwgaW5zdHJ1Y3Rpb25zKTtcbiAgICBzZXRVcEV2ZW50TGlzdGVuZXJzKHNpbXVsYXRpb24sIG5ld1NpbXVsYXRpb24pO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluTG9vcCk7XG59XG5cbmNvbnN0IG1haW5Mb29wID0gKCkgPT4ge1xuICAgIGRvIHtcbiAgICAgICAgc2ltdWxhdGlvbi50YWtlU3RlcCgpO1xuICAgICAgICB1aS5kcmF3TWFwKHNpbXVsYXRpb24sIHNjYWxlKTtcbiAgICB9IHdoaWxlIChzaW11bGF0aW9uLmN1cnJlbnRTdGVwICUgc2ltdWxhdGlvbi5mcmFtZXNUb1NraXAgIT09IDAgJiYgIXNpbXVsYXRpb24uaGFzRW5kZWQpO1xuICBcbiAgICBpZiAoIXNpbXVsYXRpb24uaGFzRW5kZWQpIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluTG9vcClcbn1cblxubmV3U2ltdWxhdGlvbigpO1xubWFpbkxvb3AoKTsiLCJjb25zdCBzZXRVcEV2ZW50TGlzdGVuZXJzID0gKHNpbXVsYXRpb24sIG5ld1NpbXVsYXRpb24pID0+IHtcbiAgICBjb25zdCByZWFkSW5zdHJ1Y3Rpb25zQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV3JylbMF07XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zSW5wdXRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQnKVswXTtcbiAgICBjb25zdCBza2lwSW5wdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdza2lwSW5wdXQnKVswXTtcblxuICAgIGNvbnN0IHByb2Nlc0luc3RydWN0aW9uc0lucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnNJbnB1dEFyZWFcbiAgICAgICAgICAgIC52YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLm1hcChpdGVtID0+XG4gICAgICAgICAgICAgICAgWydsJywnTCddLmluY2x1ZGVzKGl0ZW0pID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhpbnN0cnVjdGlvbnMpO1xuXG4gICAgICAgIG5ld1NpbXVsYXRpb24oaW5zdHJ1Y3Rpb25zKTtcbiAgICB9XG5cbiAgICByZWFkSW5zdHJ1Y3Rpb25zQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2VzSW5zdHJ1Y3Rpb25zSW5wdXQpO1xuICBcbiAgICBjb25zdCBzZXRGcmFtZVNraXBMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgc2ltdWxhdGlvbi5mcmFtZXNUb1NraXAgPSBza2lwSW5wdXRCdXR0b24udmFsdWU7XG4gICAgfTtcblxuICAgIHNraXBJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHNldEZyYW1lU2tpcExpc3RlbmVyKTtcbiAgICBza2lwSW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0RnJhbWVTa2lwTGlzdGVuZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFVwRXZlbnRMaXN0ZW5lcnM7IiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuY29uc3QgZyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5jb25zdCBnZXRDYW52YXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGNhbnZhcztcbn1cblxuY29uc3QgY2xlYXJDYW52YXMgPSAoKSA9PiB7XG4gICAgZy5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cblxuY29uc3QgZHJhd01hcCA9IChzaW11bGF0aW9uLCBzY2FsZSkgPT4ge1xuICAgIGNvbnN0IHNoYWRlID0gcGFyc2VJbnQoc2ltdWxhdGlvbi5tYXAuc3RhdGVbc2ltdWxhdGlvbi5hbnQub2xkUG9zWF1bc2ltdWxhdGlvbi5hbnQub2xkUG9zWV0gKiAyNTUgLyAoc2ltdWxhdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoIC0gMSkpO1xuICAgIGNvbnN0IHJnYiA9IEFycmF5KDMpLmZpbGwoc2hhZGUpLmpvaW4oJywnKTtcbiAgICBnLmZpbGxTdHlsZSA9IGByZ2IoJHtyZ2J9KWA7XG4gICAgZy5maWxsUmVjdChwYXJzZUludChzaW11bGF0aW9uLmFudC5wb3NYKSAqIHNjYWxlLCBwYXJzZUludChzaW11bGF0aW9uLmFudC5wb3NZKSAqIHNjYWxlLCAxICogc2NhbGUsIDEgKiBzY2FsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldENhbnZhcyxcbiAgICBjbGVhckNhbnZhcyxcbiAgICBkcmF3TWFwLFxufSJdfQ==
