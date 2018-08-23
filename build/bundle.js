(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const Simulation = require('./Simulation');
const setUpEventListeners = require('./setUpEventListeners');

// document.onload = () => {
    const simulation = new Simulation();
    setUpEventListeners(simulation);
// }
},{"./Simulation":1,"./setUpEventListeners":3}],3:[function(require,module,exports){
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
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU2ltdWxhdGlvbi5qcyIsInNyYy9tYWluLmpzIiwic3JjL3NldFVwRXZlbnRMaXN0ZW5lcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IERFRkFVTFRfSU5TVFJVQ1RJT05TID0gWzEsIC0xXTtcbmNvbnN0IERFRkFVTFRfRlJBTUVfU0tJUCA9IDEwMDtcblxuY2xhc3MgU2ltdWxhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGFzRW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IDA7XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gREVGQVVMVF9JTlNUUlVDVElPTlM7XG4gICAgICAgIHRoaXMuZnJhbWVzVG9Ta2lwID0gREVGQVVMVF9GUkFNRV9TS0lQO1xuICAgIH1cblxuICAgIHNldEluc3RydWN0aW9ucyhuZXdJbnN0cnVjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBuZXdJbnN0cnVjdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0SW5zdHJ1Y3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0cnVjdGlvbnM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaW11bGF0aW9uOyIsImNvbnN0IFNpbXVsYXRpb24gPSByZXF1aXJlKCcuL1NpbXVsYXRpb24nKTtcbmNvbnN0IHNldFVwRXZlbnRMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL3NldFVwRXZlbnRMaXN0ZW5lcnMnKTtcblxuLy8gZG9jdW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbigpO1xuICAgIHNldFVwRXZlbnRMaXN0ZW5lcnMoc2ltdWxhdGlvbik7XG4vLyB9IiwiY29uc3Qgc2V0VXBFdmVudExpc3RlbmVycyA9IChzaW11bGF0aW9uKSA9PiB7XG4gICAgY29uc3QgbmV3QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV3JylbMF07XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zSW5wdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dCcpWzBdO1xuICAgIGNvbnN0IHNraXBJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NraXBJbnB1dCcpWzBdO1xuXG4gICAgY29uc3QgcHJvY2VzSW5zdHJ1Y3Rpb25zSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0luc3RydWN0aW9ucyA9IGluc3RydWN0aW9uc0lucHV0QnV0dG9uXG4gICAgICAgICAgICAudmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PlxuICAgICAgICAgICAgICAgIFsnbCcsJ0wnXS5pbmNsdWRlcyhpdGVtKSA/IC0xIDogMVxuICAgICAgICAgICAgKTtcbiAgICBcbiAgICAgICAgY29uc29sZS5sb2cobmV3SW5zdHJ1Y3Rpb25zKTtcblxuICAgICAgICBzaW11bGF0aW9uLnNldEluc3RydWN0aW9ucyhuZXdJbnN0cnVjdGlvbnMpO1xuICAgIH1cblxuICAgIG5ld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc0luc3RydWN0aW9uc0lucHV0KTtcbiAgXG4gICAgY29uc3Qgc2V0RnJhbWVTa2lwTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgIHNpbXVsYXRpb24uZnJhbWVzVG9Ta2lwID0gc2tpcElucHV0QnV0dG9uLnZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhzaW11bGF0aW9uLmdldEluc3RydWN0aW9ucygpKTtcbiAgICB9O1xuXG4gICAgc2tpcElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc2V0RnJhbWVTa2lwTGlzdGVuZXIpO1xuICAgIHNraXBJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRGcmFtZVNraXBMaXN0ZW5lcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VXBFdmVudExpc3RlbmVyczsiXX0=
