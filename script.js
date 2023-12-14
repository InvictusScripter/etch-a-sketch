// Constants for default settings
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

// Variables to store current settings
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

// Function to set the current color
function setCurrentColor(newColor) {
    currentColor = newColor;
}

// Function to set the current mode
function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

// Function to set the current size
function setCurrentSize(newSize) {
    currentSize = newSize;
}

// Add event listeners for UI elements
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

colorPicker.addEventListener('input', (e) => setCurrentColor(e.target.value));
colorBtn.addEventListener('click', () => setCurrentMode('color'));
rainbowBtn.addEventListener('click', () => setCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'));
clearBtn.addEventListener('click', () => reloadGrid());
sizeSlider.addEventListener('mousemove', (e) => updateSizeValue(e.target.value));
sizeSlider.addEventListener('change', (e) => changeSize(e.target.value));

// Mouse state variable
let mouseDown = false;
document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

// Function to change the grid size
function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

// Function to update the displayed size value
function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

// Function to reload the grid
function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

// Function to clear the grid
function clearGrid() {
    grid.innerHTML = '';
}

// Function to set up the grid
function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

// Function to change the color of grid elements
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        // Randomize RGB values for rainbow mode
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

// Function to activate the selected button
function activateButton(newMode) {
    const activeButton = document.querySelector('.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }

    const newButton = document.getElementById(`${newMode}Btn`);
    if (newButton) {
        newButton.classList.add('active');
    }
}

// Initialize the grid on page load
window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);

    // Set the current year in the footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
};

