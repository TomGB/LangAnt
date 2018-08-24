(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./Simulation":1,"./setUpEventListeners":3,"./ui":4}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const canvas = document.getElementById('canvas');
const g = canvas.getContext('2d');

const getCanvas = () => {
    return canvas;
}

const clearCanvas = () => {
    g.clearRect(0, 0, canvas.width, canvas.height);
}

const drawMap = (simulation) => {
    const shade = parseInt(simulation.map.state[simulation.ant.oldPosX][simulation.ant.oldPosY] * 255 / (simulation.instructions.length - 1));
    const rgb = Array(3).fill(shade).join(',');
    g.fillStyle = `rgb(${rgb})`;
    console.log(rgb);
    
    g.fillRect(parseInt(simulation.ant.posX), parseInt(simulation.ant.posY), 1, 1);
}

module.exports = {
    getCanvas,
    clearCanvas,
    drawMap,
}
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU2ltdWxhdGlvbi5qcyIsInNyYy9tYWluLmpzIiwic3JjL3NldFVwRXZlbnRMaXN0ZW5lcnMuanMiLCJzcmMvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IERFRkFVTFRfSU5TVFJVQ1RJT05TID0gWzEsIC0xXTtcbmNvbnN0IERFRkFVTFRfRlJBTUVfU0tJUCA9IDEwMDA7XG5cbmNsYXNzIFNpbXVsYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHsgXG4gICAgICAgIHdpZHRoLCBoZWlnaHQgfSkge1xuICAgICAgICB0aGlzLm1hcCA9IHtcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgc3RhdGU6IG5ldyBBcnJheSh3aWR0aCkuZmlsbCgpLm1hcCgoKSA9PiBuZXcgQXJyYXkoaGVpZ2h0KS5maWxsKDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYXNFbmRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBERUZBVUxUX0lOU1RSVUNUSU9OUztcbiAgICAgICAgdGhpcy5mcmFtZXNUb1NraXAgPSBERUZBVUxUX0ZSQU1FX1NLSVA7XG4gICAgICAgIHRoaXMuYW50ID0ge1xuICAgICAgICAgICAgcG9zWDogd2lkdGggLyAyLFxuICAgICAgICAgICAgcG9zWTogaGVpZ2h0IC8gMixcbiAgICAgICAgICAgIG9sZFBvc1g6IHdpZHRoIC8gMixcbiAgICAgICAgICAgIG9sZFBvc1k6IGhlaWdodCAvIDIsXG4gICAgICAgICAgICBkaXJlY3Rpb246IDAsXG4gICAgICAgICAgICBtb3ZlbWVudHM6IFtcbiAgICAgICAgICAgICAgICBbMCwgLTFdLFxuICAgICAgICAgICAgICAgIFstMSwgMF0sXG4gICAgICAgICAgICAgICAgWzAsIDFdLFxuICAgICAgICAgICAgICAgIFsxLCAwXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRJbnN0cnVjdGlvbnMobmV3SW5zdHJ1Y3Rpb25zKSB7XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gbmV3SW5zdHJ1Y3Rpb25zO1xuICAgIH1cblxuICAgIGdldEluc3RydWN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1Y3Rpb25zO1xuICAgIH1cblxuICAgIF91cGRhdGVPbGRBbnRQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5hbnQub2xkUG9zWCA9IHRoaXMuYW50LnBvc1g7XG4gICAgICAgIHRoaXMuYW50Lm9sZFBvc1kgPSB0aGlzLmFudC5wb3NZO1xuICAgIH1cblxuICAgIF9yb3RhdGVBbnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYW50KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbkluc3RydWN0aW9ucyA9IHRoaXMubWFwLnN0YXRlW3RoaXMuYW50LnBvc1hdW3RoaXMuYW50LnBvc1ldO1xuICAgICAgICB0aGlzLmFudC5kaXJlY3Rpb24gKz0gdGhpcy5pbnN0cnVjdGlvbnNbY3VycmVudExvY2F0aW9uSW5zdHJ1Y3Rpb25zXTtcbiAgICB9XG5cbiAgICBfY29uc3RyYWluRGlyZWN0aW9uKCkge1xuICAgICAgICBjb25zdCB7IGFudCB9ID0gdGhpczsgXG4gICAgICAgIGlmIChhbnQuZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgIGFudC5kaXJlY3Rpb24gKz0gNFxuICAgICAgICB9IGVsc2UgaWYgKGFudC5kaXJlY3Rpb24gPiAzKSB7XG4gICAgICAgICAgYW50LmRpcmVjdGlvbiAtPSA0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfbW92ZUJhc2VkT25EaXJlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IFtkeCwgZHldID0gdGhpcy5hbnQubW92ZW1lbnRzW3RoaXMuYW50LmRpcmVjdGlvbl07XG4gICAgICAgIHRoaXMuYW50LnBvc1ggKz0gZHg7XG4gICAgICAgIHRoaXMuYW50LnBvc1kgKz0gZHk7XG4gICAgfVxuXG4gICAgX2FudE91dHNpZGVNYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFudC5wb3NYIDwgMCB8fCB0aGlzLmFudC5wb3NYID49IHRoaXMubWFwLndpZHRoIC0gMSB8fCB0aGlzLmFudC5wb3NZIDwgMCB8fCB0aGlzLmFudC5wb3NZID49IHRoaXMubWFwLmhlaWdodCAtIDE7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1hcFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9sZFBvc1gsIG9sZFBvc1kgfSA9IHRoaXMuYW50O1xuICAgICAgICBsZXQgbmV3U3RhdGUgPSB0aGlzLm1hcC5zdGF0ZVtvbGRQb3NYXVtvbGRQb3NZXSArIDE7XG4gICAgICBcbiAgICAgICAgaWYgKG5ld1N0YXRlID09PSB0aGlzLmluc3RydWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlIC09IHRoaXMuaW5zdHJ1Y3Rpb25zLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1N0YXRlKTtcbiAgICAgICAgXG4gICAgICBcbiAgICAgICAgdGhpcy5tYXAuc3RhdGVbdGhpcy5hbnQub2xkUG9zWF1bdGhpcy5hbnQub2xkUG9zWV0gPSBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICB0YWtlU3RlcCgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCArKztcbiAgICAgICAgdGhpcy5fdXBkYXRlT2xkQW50UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcm90YXRlQW50KCk7XG4gICAgICAgIHRoaXMuX2NvbnN0cmFpbkRpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9tb3ZlQmFzZWRPbkRpcmVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbnRPdXRzaWRlTWFwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl91cGRhdGVNYXBTdGF0ZSgpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltdWxhdGlvbjsiLCJjb25zdCBTaW11bGF0aW9uID0gcmVxdWlyZSgnLi9TaW11bGF0aW9uJyk7XG5jb25zdCB1aSA9IHJlcXVpcmUoJy4vdWknKTtcbmNvbnN0IHNldFVwRXZlbnRMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL3NldFVwRXZlbnRMaXN0ZW5lcnMnKTtcblxuY29uc3QgY2FudmFzID0gdWkuZ2V0Q2FudmFzKCk7XG5jb25zdCBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24oY2FudmFzKTtcbnNldFVwRXZlbnRMaXN0ZW5lcnMoc2ltdWxhdGlvbik7XG5cbmNvbnN0IG1haW5Mb29wID0gKCkgPT4ge1xuICAgIGRvIHtcbiAgICAgICAgc2ltdWxhdGlvbi50YWtlU3RlcCgpO1xuICAgICAgICB1aS5kcmF3TWFwKHNpbXVsYXRpb24pO1xuICAgIH0gd2hpbGUgKHNpbXVsYXRpb24uY3VycmVudFN0ZXAgJSBzaW11bGF0aW9uLmZyYW1lc1RvU2tpcCAhPT0gMCAmJiAhc2ltdWxhdGlvbi5oYXNFbmRlZCk7XG4gIFxuICAgIGlmICghc2ltdWxhdGlvbi5oYXNFbmRlZCkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKVxufVxuXG5tYWluTG9vcCgpO1xuXG5jb25zb2xlLmxvZyhzaW11bGF0aW9uKTsiLCJjb25zdCBzZXRVcEV2ZW50TGlzdGVuZXJzID0gKHNpbXVsYXRpb24pID0+IHtcbiAgICBjb25zdCBuZXdCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZXcnKVswXTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2lucHV0JylbMF07XG4gICAgY29uc3Qgc2tpcElucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2tpcElucHV0JylbMF07XG5cbiAgICBjb25zdCBwcm9jZXNJbnN0cnVjdGlvbnNJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3SW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zSW5wdXRCdXR0b25cbiAgICAgICAgICAgIC52YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLm1hcChpdGVtID0+XG4gICAgICAgICAgICAgICAgWydsJywnTCddLmluY2x1ZGVzKGl0ZW0pID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhuZXdJbnN0cnVjdGlvbnMpO1xuXG4gICAgICAgIHNpbXVsYXRpb24uc2V0SW5zdHJ1Y3Rpb25zKG5ld0luc3RydWN0aW9ucyk7XG4gICAgfVxuXG4gICAgbmV3QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2VzSW5zdHJ1Y3Rpb25zSW5wdXQpO1xuICBcbiAgICBjb25zdCBzZXRGcmFtZVNraXBMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgc2ltdWxhdGlvbi5mcmFtZXNUb1NraXAgPSBza2lwSW5wdXRCdXR0b24udmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHNpbXVsYXRpb24uZ2V0SW5zdHJ1Y3Rpb25zKCkpO1xuICAgIH07XG5cbiAgICBza2lwSW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBzZXRGcmFtZVNraXBMaXN0ZW5lcik7XG4gICAgc2tpcElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldEZyYW1lU2tpcExpc3RlbmVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRVcEV2ZW50TGlzdGVuZXJzOyIsImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNvbnN0IGcgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuY29uc3QgZ2V0Q2FudmFzID0gKCkgPT4ge1xuICAgIHJldHVybiBjYW52YXM7XG59XG5cbmNvbnN0IGNsZWFyQ2FudmFzID0gKCkgPT4ge1xuICAgIGcuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG5cbmNvbnN0IGRyYXdNYXAgPSAoc2ltdWxhdGlvbikgPT4ge1xuICAgIGNvbnN0IHNoYWRlID0gcGFyc2VJbnQoc2ltdWxhdGlvbi5tYXAuc3RhdGVbc2ltdWxhdGlvbi5hbnQub2xkUG9zWF1bc2ltdWxhdGlvbi5hbnQub2xkUG9zWV0gKiAyNTUgLyAoc2ltdWxhdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoIC0gMSkpO1xuICAgIGNvbnN0IHJnYiA9IEFycmF5KDMpLmZpbGwoc2hhZGUpLmpvaW4oJywnKTtcbiAgICBnLmZpbGxTdHlsZSA9IGByZ2IoJHtyZ2J9KWA7XG4gICAgY29uc29sZS5sb2cocmdiKTtcbiAgICBcbiAgICBnLmZpbGxSZWN0KHBhcnNlSW50KHNpbXVsYXRpb24uYW50LnBvc1gpLCBwYXJzZUludChzaW11bGF0aW9uLmFudC5wb3NZKSwgMSwgMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldENhbnZhcyxcbiAgICBjbGVhckNhbnZhcyxcbiAgICBkcmF3TWFwLFxufSJdfQ==
