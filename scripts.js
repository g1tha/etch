const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const slideLabel = document.querySelector('.slide-label');
const colorPicker = document.querySelector('.color-picker');
const colorBtn = document.querySelector('.color');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.eraser');
const lightenBtn = document.querySelector('.lighten');
const darkenBtn = document.querySelector('.darken');
const resetBtn = document.querySelector('.reset');
let gridItems = Array.from(document.querySelectorAll('.grid-item'));
let mousedownState = false;
let colorBtnSelect = true;
let rainbowBtnSelect = false;
let eraserBtnSelect = false;
let lightenBtnSelect = false;
let darkenBtnSelect = false;
let hue = 0;
let sat = 0;
let lit = 0;
let gridSize = 4;

slider.addEventListener('change', updateSlider);
document.addEventListener('mousedown', mousedownFunction);
document.addEventListener('mouseup', mouseupFunction);
colorBtn.addEventListener('click', colorClick);
rainbowBtn.addEventListener('click', rainbowClick);
eraserBtn.addEventListener('click', eraserClick);
eraserBtn.addEventListener('click', eraserClick);
lightenBtn.addEventListener('click', lightenClick);
darkenBtn.addEventListener('click', darkenClick);
resetBtn.addEventListener('click', resetClick);
let pickedColor = colorPicker.value;
updateSlider();


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

function drawOver(e) {
    if (mousedownState === true) {
        draw(e);
    }
}

function draw(e) {
    if (eraserBtnSelect === true) {
        pickedColor = '';
    } else if (rainbowBtnSelect === true) {
        hexToHSL(colorPicker.value);
        hue = (hue + 150) % 360;
        pickedColor = HSLToHex(hue, sat, lit);
        colorPicker.value = pickedColor; 
    } else if (lightenBtnSelect === true) {
        RGBToHSL(e.target.style.backgroundColor);
        lit = Math.min(100, (lit + 10));
        pickedColor = HSLToHex(hue, sat, lit); 
    } else if (darkenBtnSelect === true) {
        RGBToHSL(e.target.style.backgroundColor);
        lit = Math.max(0, (lit - 10));
        pickedColor = HSLToHex(hue, sat, lit); 
    }else {
        pickedColor = colorPicker.value;
    }
    e.target.style.backgroundColor = pickedColor;
}

function mousedownFunction() {
    mousedownState = true;
}

function mouseupFunction() {
    mousedownState = false;
}

function resetClick() {
    colorClick();
    colorPicker.value = '#FFA719';
    gridItems.forEach(e => e.style.backgroundColor='');
}

function colorClick() {
    clearCLick();
    colorBtnSelect = true;
    colorBtn.className = 'color select';    
}

function rainbowClick() {
    clearCLick();
    rainbowBtnSelect = true;
    rainbowBtn.className = 'rainbow select';    
}

function eraserClick() {
    clearCLick();
    eraserBtnSelect = true;
    eraserBtn.className = 'eraser select';    
}

function lightenClick() {
    clearCLick();
    lightenBtnSelect = true;
    lightenBtn.className = 'lighten select';        
}

function darkenClick() {
    clearCLick();
    darkenBtnSelect = true;
    darkenBtn.className = 'darken select';  
}

function clearCLick() {
    colorBtnSelect = false;
    colorBtn.className = 'color btn';
    rainbowBtnSelect = false;
    rainbowBtn.className = 'rainbow btn';
    eraserBtnSelect = false;
    eraserBtn.className = 'eraser btn';
    lightenBtnSelect = false;
    lightenBtn.className = 'lighten btn';
    darkenBtnSelect = false;
    darkenBtn.className = 'darken btn';
}

// Hex <-> HSL conversion functions. Source: https://css-tricks.com/converting-color-spaces-in-javascript/ with minor modifications.
function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    hue = h;
    sat = s;
    lit = l;
  }

function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

function RGBToHSL(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }
  
    // Make r, g, and b fractions of 1
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  hue = h;
  sat = s;
  lit = l;;
}

