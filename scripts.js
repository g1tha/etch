const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const slideLabel = document.querySelector('.slide-label');


let gridSize = 2;
slider.addEventListener('change', updateSlider);
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
}

function updateSlider() {
    gridSize = parseInt(slider.value);
    slideLabel.textContent = `${gridSize} × ${gridSize}`;
    makeGrid(gridSize);
}


