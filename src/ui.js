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