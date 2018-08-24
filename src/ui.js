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