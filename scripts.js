const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const slideLabel = document.querySelector('.slide-label');
const colorPicker = document.querySelector('.color');
let gridItems = Array.from(document.querySelectorAll('.grid-item'));
let mousedownState = false;

let gridSize = 2;
slider.addEventListener('change', updateSlider);
colorPicker.addEventListener('change', updateColor);
document.addEventListener('mousedown', mousedownFunction);
document.addEventListener('mouseup', mouseupFunction);
let pickedColor = '#23A4B0';
makeGrid(gridSize);


function makeGrid(n) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    for (let i = 0; i < (n * n); i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add(`grid-item`);
        gridContainer.appendChild(gridItem);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${n}, auto)`;
    gridItems = Array.from(document.querySelectorAll('.grid-item'));
    gridItems.forEach(e => e.addEventListener('mouseover', drawOver));
    gridItems.forEach(e => e.addEventListener('click', draw));
}

function updateSlider() {
    gridSize = parseInt(slider.value);
    slideLabel.textContent = `${gridSize} × ${gridSize}`;
    makeGrid(gridSize);
}

function updateColor() {
    pickedColor = colorPicker.value;
}

function drawOver(e) {
    if (mousedownState === true) {
         e.target.style.backgroundColor = pickedColor;
    }
}

function draw(e) {
    e.target.style.backgroundColor = pickedColor;
}

function mousedownFunction() {
    mousedownState = true;
}

function mouseupFunction() {
    mousedownState = false;
}

