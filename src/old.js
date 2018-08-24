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
newSimulation();