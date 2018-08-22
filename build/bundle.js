(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DEFAULT_INSTRUCTIONS = new Array(1, -1);
const DEFAULT_FRAME_SKIP = 10000;
const DEFAULT_MAP = new Array()

const canvas = document.getElementById('canvas');
const g = canvas.getContext('2d');

const simulation = {
  hasEnded: false,
  currentStep: 0,
  instructions: DEFAULT_INSTRUCTIONS,
  framesToSkip: DEFAULT_FRAME_SKIP,
}

let ant = {
  posX: canvas.width / 2,
  posY: canvas.height / 2,
  oldPosX: canvas.width / 2,
  oldPosY: canvas.height / 2,
  direction: 0,
  mapSpaces: new Array()
}

const resetAnt = () => {
  ant = {
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    oldPosX: canvas.width / 2,
    oldPosY: canvas.height / 2,
    direction: 0,
  }
}

simulation.mapSpaces = new Array();

const newButton = document.getElementsByClassName('new')[0];
const instructionsInputButton = document.getElementsByClassName('input')[0];
const skipInputButton = document.getElementsByClassName('skipInput')[0];

const newSimulation = () => {
  simulation.hasEnded = false;
  simulation.currentStep = 0;

  g.clearRect(0,0,canvas.width,canvas.height);

  simulation.mapSpaces = new Array(canvas.width).fill().map(() => new Array(canvas.width).fill(0));

  resetAnt();
  requestAnimationFrame(mainLoop)
}

const constrainDirection = () => {
  if(ant.direction < 0){
    ant.direction+=4
  }
  if(ant.direction > 3){
    ant.direction-=4
  }
}

const moveBasedOnDirection = () => {
  if(ant.direction == 0){
    ant.posY--
  }else if (ant.direction == 1) {
    ant.posX--
  }else if (ant.direction == 2) {
    ant.posY++
  }else if (ant.direction == 3) {
    ant.posX++
  }
}

const stepOnMap = (input) => {
  let newValue = input + 1;

  if (newValue === simulation.instructions.length) {
    newValue -= simulation.instructions.length;
  }

  return newValue;
}

const update = () => {
  simulation.currentStep++;
  ant.direction += simulation.instructions[simulation.mapSpaces[ant.posX][ant.posY]];

  constrainDirection();
  moveBasedOnDirection();

  if(ant.posX < 0 || ant.posX >= canvas.width - 1 || ant.posY < 0 || ant.posY >= canvas.height - 1){
    simulation.hasEnded = true;
  }else{
    simulation.mapSpaces[ant.oldPosX][ant.oldPosY] = stepOnMap(simulation.mapSpaces[ant.oldPosX][ant.oldPosY]);

    var shade = simulation.mapSpaces[ant.oldPosX][ant.oldPosY] * 255 / (simulation.instructions.length - 1);
    shade = parseInt(shade);
    g.fillStyle = 'rgb('+shade+','+shade+','+shade+')';

    g.fillRect(parseInt(ant.posX), parseInt(ant.posY), 1, 1);

    ant.oldPosX = ant.posX;
    ant.oldPosY = ant.posY;
  }
}

const mainLoop = () => {
  do {
    update();
  } while (simulation.currentStep % simulation.framesToSkip !== 0 && !simulation.hasEnded);

  if (!simulation.hasEnded) requestAnimationFrame(mainLoop)
}

requestAnimationFrame(mainLoop);

newButton.addEventListener('click', () => {
  simulation.instructions = new Array();

  const newInstructions = instructionsInputButton.value.split('');

  newInstructions.map(item => {
    const direction = (['l','L'].includes(item)) ? -1 : 1;
    simulation.instructions.push(direction);
  })

  console.log(simulation.instructions);
  newSimulation();
});

skipInputButton.addEventListener('input change', () => {
  simulation.framesToSkip = skipInputButton.value;
});

newSimulation();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBERUZBVUxUX0lOU1RSVUNUSU9OUyA9IG5ldyBBcnJheSgxLCAtMSk7XG5jb25zdCBERUZBVUxUX0ZSQU1FX1NLSVAgPSAxMDAwMDtcbmNvbnN0IERFRkFVTFRfTUFQID0gbmV3IEFycmF5KClcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuY29uc3QgZyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5jb25zdCBzaW11bGF0aW9uID0ge1xuICBoYXNFbmRlZDogZmFsc2UsXG4gIGN1cnJlbnRTdGVwOiAwLFxuICBpbnN0cnVjdGlvbnM6IERFRkFVTFRfSU5TVFJVQ1RJT05TLFxuICBmcmFtZXNUb1NraXA6IERFRkFVTFRfRlJBTUVfU0tJUCxcbn1cblxubGV0IGFudCA9IHtcbiAgcG9zWDogY2FudmFzLndpZHRoIC8gMixcbiAgcG9zWTogY2FudmFzLmhlaWdodCAvIDIsXG4gIG9sZFBvc1g6IGNhbnZhcy53aWR0aCAvIDIsXG4gIG9sZFBvc1k6IGNhbnZhcy5oZWlnaHQgLyAyLFxuICBkaXJlY3Rpb246IDAsXG4gIG1hcFNwYWNlczogbmV3IEFycmF5KClcbn1cblxuY29uc3QgcmVzZXRBbnQgPSAoKSA9PiB7XG4gIGFudCA9IHtcbiAgICBwb3NYOiBjYW52YXMud2lkdGggLyAyLFxuICAgIHBvc1k6IGNhbnZhcy5oZWlnaHQgLyAyLFxuICAgIG9sZFBvc1g6IGNhbnZhcy53aWR0aCAvIDIsXG4gICAgb2xkUG9zWTogY2FudmFzLmhlaWdodCAvIDIsXG4gICAgZGlyZWN0aW9uOiAwLFxuICB9XG59XG5cbnNpbXVsYXRpb24ubWFwU3BhY2VzID0gbmV3IEFycmF5KCk7XG5cbmNvbnN0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25ldycpWzBdO1xuY29uc3QgaW5zdHJ1Y3Rpb25zSW5wdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dCcpWzBdO1xuY29uc3Qgc2tpcElucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2tpcElucHV0JylbMF07XG5cbmNvbnN0IG5ld1NpbXVsYXRpb24gPSAoKSA9PiB7XG4gIHNpbXVsYXRpb24uaGFzRW5kZWQgPSBmYWxzZTtcbiAgc2ltdWxhdGlvbi5jdXJyZW50U3RlcCA9IDA7XG5cbiAgZy5jbGVhclJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcblxuICBzaW11bGF0aW9uLm1hcFNwYWNlcyA9IG5ldyBBcnJheShjYW52YXMud2lkdGgpLmZpbGwoKS5tYXAoKCkgPT4gbmV3IEFycmF5KGNhbnZhcy53aWR0aCkuZmlsbCgwKSk7XG5cbiAgcmVzZXRBbnQoKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKVxufVxuXG5jb25zdCBjb25zdHJhaW5EaXJlY3Rpb24gPSAoKSA9PiB7XG4gIGlmKGFudC5kaXJlY3Rpb24gPCAwKXtcbiAgICBhbnQuZGlyZWN0aW9uKz00XG4gIH1cbiAgaWYoYW50LmRpcmVjdGlvbiA+IDMpe1xuICAgIGFudC5kaXJlY3Rpb24tPTRcbiAgfVxufVxuXG5jb25zdCBtb3ZlQmFzZWRPbkRpcmVjdGlvbiA9ICgpID0+IHtcbiAgaWYoYW50LmRpcmVjdGlvbiA9PSAwKXtcbiAgICBhbnQucG9zWS0tXG4gIH1lbHNlIGlmIChhbnQuZGlyZWN0aW9uID09IDEpIHtcbiAgICBhbnQucG9zWC0tXG4gIH1lbHNlIGlmIChhbnQuZGlyZWN0aW9uID09IDIpIHtcbiAgICBhbnQucG9zWSsrXG4gIH1lbHNlIGlmIChhbnQuZGlyZWN0aW9uID09IDMpIHtcbiAgICBhbnQucG9zWCsrXG4gIH1cbn1cblxuY29uc3Qgc3RlcE9uTWFwID0gKGlucHV0KSA9PiB7XG4gIGxldCBuZXdWYWx1ZSA9IGlucHV0ICsgMTtcblxuICBpZiAobmV3VmFsdWUgPT09IHNpbXVsYXRpb24uaW5zdHJ1Y3Rpb25zLmxlbmd0aCkge1xuICAgIG5ld1ZhbHVlIC09IHNpbXVsYXRpb24uaW5zdHJ1Y3Rpb25zLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBuZXdWYWx1ZTtcbn1cblxuY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICBzaW11bGF0aW9uLmN1cnJlbnRTdGVwKys7XG4gIGFudC5kaXJlY3Rpb24gKz0gc2ltdWxhdGlvbi5pbnN0cnVjdGlvbnNbc2ltdWxhdGlvbi5tYXBTcGFjZXNbYW50LnBvc1hdW2FudC5wb3NZXV07XG5cbiAgY29uc3RyYWluRGlyZWN0aW9uKCk7XG4gIG1vdmVCYXNlZE9uRGlyZWN0aW9uKCk7XG5cbiAgaWYoYW50LnBvc1ggPCAwIHx8IGFudC5wb3NYID49IGNhbnZhcy53aWR0aCAtIDEgfHwgYW50LnBvc1kgPCAwIHx8IGFudC5wb3NZID49IGNhbnZhcy5oZWlnaHQgLSAxKXtcbiAgICBzaW11bGF0aW9uLmhhc0VuZGVkID0gdHJ1ZTtcbiAgfWVsc2V7XG4gICAgc2ltdWxhdGlvbi5tYXBTcGFjZXNbYW50Lm9sZFBvc1hdW2FudC5vbGRQb3NZXSA9IHN0ZXBPbk1hcChzaW11bGF0aW9uLm1hcFNwYWNlc1thbnQub2xkUG9zWF1bYW50Lm9sZFBvc1ldKTtcblxuICAgIHZhciBzaGFkZSA9IHNpbXVsYXRpb24ubWFwU3BhY2VzW2FudC5vbGRQb3NYXVthbnQub2xkUG9zWV0gKiAyNTUgLyAoc2ltdWxhdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoIC0gMSk7XG4gICAgc2hhZGUgPSBwYXJzZUludChzaGFkZSk7XG4gICAgZy5maWxsU3R5bGUgPSAncmdiKCcrc2hhZGUrJywnK3NoYWRlKycsJytzaGFkZSsnKSc7XG5cbiAgICBnLmZpbGxSZWN0KHBhcnNlSW50KGFudC5wb3NYKSwgcGFyc2VJbnQoYW50LnBvc1kpLCAxLCAxKTtcblxuICAgIGFudC5vbGRQb3NYID0gYW50LnBvc1g7XG4gICAgYW50Lm9sZFBvc1kgPSBhbnQucG9zWTtcbiAgfVxufVxuXG5jb25zdCBtYWluTG9vcCA9ICgpID0+IHtcbiAgZG8ge1xuICAgIHVwZGF0ZSgpO1xuICB9IHdoaWxlIChzaW11bGF0aW9uLmN1cnJlbnRTdGVwICUgc2ltdWxhdGlvbi5mcmFtZXNUb1NraXAgIT09IDAgJiYgIXNpbXVsYXRpb24uaGFzRW5kZWQpO1xuXG4gIGlmICghc2ltdWxhdGlvbi5oYXNFbmRlZCkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKVxufVxuXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbkxvb3ApO1xuXG5uZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNpbXVsYXRpb24uaW5zdHJ1Y3Rpb25zID0gbmV3IEFycmF5KCk7XG5cbiAgY29uc3QgbmV3SW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zSW5wdXRCdXR0b24udmFsdWUuc3BsaXQoJycpO1xuXG4gIG5ld0luc3RydWN0aW9ucy5tYXAoaXRlbSA9PiB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gKFsnbCcsJ0wnXS5pbmNsdWRlcyhpdGVtKSkgPyAtMSA6IDE7XG4gICAgc2ltdWxhdGlvbi5pbnN0cnVjdGlvbnMucHVzaChkaXJlY3Rpb24pO1xuICB9KVxuXG4gIGNvbnNvbGUubG9nKHNpbXVsYXRpb24uaW5zdHJ1Y3Rpb25zKTtcbiAgbmV3U2ltdWxhdGlvbigpO1xufSk7XG5cbnNraXBJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCBjaGFuZ2UnLCAoKSA9PiB7XG4gIHNpbXVsYXRpb24uZnJhbWVzVG9Ta2lwID0gc2tpcElucHV0QnV0dG9uLnZhbHVlO1xufSk7XG5cbm5ld1NpbXVsYXRpb24oKTsiXX0=
