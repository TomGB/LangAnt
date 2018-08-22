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