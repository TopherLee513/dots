"use strict";
// Dots Project
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** HTML Elements */
const docBody = document.getElementById("body");
const themeButton = document.getElementById("themeButton");
const themeButtonIcon = document.getElementById("themeButtonIcon");
const collectionNameUI = document.getElementById('collectionNameUI');
const backgroundColorUI = document.getElementById("backgroundColorUI");
const palletSelectUI = document.getElementById('palletSelectUI');
const palletSaturationUI = document.getElementById("palletSaturationUI");
const palletLightnessUI = document.getElementById("palletLightnessUI");
const particleCountUI = document.getElementById("particleCountUI");
const imageSizeXUI = document.getElementById('imageSizeXUI');
const imageSizeYUI = document.getElementById('imageSizeYUI');
const layoutSelectUI = document.getElementById('layoutSelectUI');
const particleSelectUI = document.getElementById('particleSelectUI');
const messageBox = document.getElementById('messageBox');
const downloadButton = document.getElementById('downloadButton');
const canvasContainer = document.getElementById('canvasContainer');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const yearElement = document.getElementById("year");
const d = new Date();
let year = d.getFullYear();
yearElement.textContent = year.toString();
/* ImageGen Variables */
let collectionName = "Dots";
let colorPalletSelection = "RGB";
let saturation = 50;
let lightness = 50;
let getRandomColor = getRandomRGB;
let backgroundColor = 'black';
let imageSizeX = 512;
let imageSizeY = 512;
canvas.width = imageSizeX;
canvas.height = imageSizeY;
let particleCount = 100;
let layout = "Random";
let particles = "Both";
let DotArray = [];
let BlockArray = [];
let currentImage = undefined;
class Particle {
    constructor(id, x, y, size, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw() {
    }
}
class Block extends Particle {
    constructor(id, x, y, size, color) {
        super(id, x, y, size, color);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
class Dot extends Particle {
    constructor(id, x, y, size, color) {
        super(id, x, y, size, color);
        this.radius = this.size / 2;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
class CanvasImage {
    constructor(width, height, background, dots, blocks) {
        this.width = width;
        this.height = height;
        this.background = background;
        this.dots = dots;
        this.blocks = blocks;
    }
    draw() {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.fillStyle = this.background;
            ctx.fillRect(0, 0, this.width, this.height);
            let count = this.dots.length + this.blocks.length;
            console.log('Attempting Draw');
            for (let i = 0; i < count; i++) {
                if (this.dots[i] != null) {
                    this.dots[i].draw();
                }
                if (this.blocks[i] != null) {
                    this.blocks[i].draw();
                }
            }
        });
    }
}
function setCollectionName() {
    collectionName = collectionNameUI.value;
    console.log('Name Set To: ' + collectionName);
    messageBox.textContent = "";
}
function setColorWheel() {
    colorPalletSelection = palletSelectUI.value;
    if (colorPalletSelection === "RGB") {
        getRandomColor = getRandomRGB;
        palletSaturationUI.disabled = true;
        palletLightnessUI.disabled = true;
    }
    else if (colorPalletSelection === "HSL") {
        getRandomColor = getRandomHSL;
        palletSaturationUI.disabled = true;
        palletLightnessUI.disabled = true;
    }
    else if (colorPalletSelection === "Hue") {
        getRandomColor = getRandomHue;
        palletSaturationUI.disabled = false;
        palletLightnessUI.disabled = false;
    }
    console.log('Color Pallet Selection: ' + colorPalletSelection);
    messageBox.textContent = "";
}
function setBGColor() {
    backgroundColor = backgroundColorUI.value;
    console.log('Color Set To: ' + backgroundColor);
}
function setSaturation() {
    saturation = parseInt(palletSaturationUI.value);
    console.log('Saturation Set To: ' + saturation + '%');
}
function setLightness() {
    lightness = parseInt(palletLightnessUI.value);
    console.log('Lightness Set To: ' + lightness + '%');
}
function setImageWidth() {
    imageSizeX = parseInt(imageSizeXUI.value);
    canvas.width = imageSizeX;
    console.log('Width Set To: ' + imageSizeX);
}
function setImageHeight() {
    imageSizeY = parseInt(imageSizeYUI.value);
    canvas.height = imageSizeY;
    console.log('Height Set To: ' + imageSizeY);
    messageBox.textContent = "";
}
function setParticleCount() {
    particleCount = parseInt(particleCountUI.value);
    console.log('Particle Count: ' + particleCount);
    messageBox.textContent = "";
}
function setLayout() {
    layout = layoutSelectUI.value.toString();
    console.log('Layout Set To: ' + layout);
    messageBox.textContent = "";
}
function setParticles() {
    particles = particleSelectUI.value.toString();
    console.log('Particles Set To: ' + particles);
    messageBox.textContent = "";
}
function setValues() {
    console.log("Initializing Data");
    messageBox.textContent = "";
    setCollectionName();
    setBGColor();
    setLayout();
    setParticles();
    setColorWheel();
    setSaturation();
    setLightness();
    setImageWidth();
    setImageHeight();
    setParticleCount();
    console.log("Data Initialized");
}
function onGenerateButtonPressed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Generate Image Button Pressed");
        setValues();
        DotArray = [];
        BlockArray = [];
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (layout === "Rows") {
            // Calculate Image Area in Pixels
            let area = canvas.width * canvas.height;
            console.log('Area:' + area);
            let areaSqRt = Math.sqrt(area);
            console.log('Area Square Root: ' + areaSqRt);
            console.log('Particle Count: ' + particleCount);
            let countSqRt = Math.sqrt(particleCount);
            console.log('Count Square Root: ' + countSqRt);
            let size = areaSqRt / countSqRt;
            size = Math.floor(size);
            console.log('Calculated Particle Size: ' + size);
            // Particle Count Can't Exceed Image Area
            if (particleCount > area) {
                messageBox.textContent = "Too Many Particles";
                console.log("Too Many Particles");
            }
            else {
                messageBox.textContent = "Generating Image";
                console.log("Generating Image");
                yield generateRows(size);
            }
        }
        else if (layout === "Random") {
            // Random Layout doesn't care about Image Area
            messageBox.textContent = "Generating Image";
            yield generateRandom();
        }
        let data = JSON.stringify(currentImage);
        console.log(data);
        console.log('Image Data Generated');
        yield currentImage.draw();
        EnableDownloadButton();
    });
}
function generateRows(size) {
    return __awaiter(this, void 0, void 0, function* () {
        let x = 0;
        let y = 0;
        let countX = canvas.width / size;
        let countY = canvas.height / size;
        let total = countX + countY;
        let count = 0;
        if (particles === "Dots") {
            x = size / 2;
            y = size / 2;
            for (let row = 0; row <= countY; row++) {
                for (let column = 0; column <= countX; column++) {
                    let dot = new Dot(count, x, y, size, getRandomColor());
                    DotArray.push(dot);
                    x += size;
                    count++;
                }
                x = size / 2;
                y += size;
            }
            currentImage = new CanvasImage(canvas.width, canvas.height, backgroundColor, DotArray, BlockArray);
        }
        else if (particles === "Blocks") {
            for (let row = 0; row <= countY; row++) {
                for (let column = 0; column <= countX; column++) {
                    let block = new Block(count, x, y, size, getRandomColor());
                    BlockArray.push(block);
                    x += size;
                    count++;
                }
                x = 0;
                y += size;
            }
            currentImage = new CanvasImage(canvas.width, canvas.height, backgroundColor, DotArray, BlockArray);
        }
        else if (particles === "Mixed") {
            let i = 0;
            for (let row = 0; row <= countY; row++) {
                for (let column = 0; column <= countX; column++) {
                    if (getCurrentParticle(i) == "Block") {
                        let block = new Block(i, x, y, size, getRandomColor());
                        BlockArray.push(block);
                    }
                    else if (getCurrentParticle(i) == "Dot") {
                        let dot = new Dot(i, x + size / 2, y + size / 2, size, getRandomColor());
                        DotArray.push(dot);
                    }
                    x += size;
                    i++;
                }
                x = 0;
                y += size;
            }
            currentImage = new CanvasImage(canvas.width, canvas.height, backgroundColor, DotArray, BlockArray);
        }
    });
}
function generateRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        if (particles === "Dots") {
            for (let i = 0; i < particleCount; i++) {
                // console.log('Particle Index: ' + i)
                let x = GetRandomInt(canvas.width); // Random X
                let y = GetRandomInt(canvas.height); // Random Y
                let size = GetRandomInt(20); // Random Size
                size = Math.floor(size);
                let dot = new Dot(i, x, y, size, getRandomColor());
                // dot.draw();
                DotArray.push(dot);
            }
            currentImage = new CanvasImage(canvas.width, canvas.height, backgroundColor, DotArray, BlockArray);
        }
        else if (particles === "Blocks") {
            for (let i = 0; i < particleCount; i++) {
                // console.log('Particle Index: ' + i)
                let x = GetRandomInt(canvas.width); // Random X
                let y = GetRandomInt(canvas.height); // Random Y
                let size = GetRandomInt(20); // Random Size
                size = Math.floor(size);
                let block = new Block(i, x, y, size, getRandomColor());
                BlockArray.push(block);
            }
            currentImage = new CanvasImage(canvas.width, canvas.height, backgroundColor, DotArray, BlockArray);
        }
        else if (particles === "Mixed") {
            for (let i = 0; i < particleCount; i++) {
                let x = GetRandomInt(canvas.width); // Random X
                let y = GetRandomInt(canvas.height); // Random Y
                let size = GetRandomInt(20); // Random Size
                size = Math.floor(size);
                if (getCurrentParticle(i) == "Block") {
                    let block = new Block(i, x, y, size, getRandomColor());
                    BlockArray.push(block);
                }
                else if (getCurrentParticle(i) == "Dot") {
                    let dot = new Dot(i, x, y, size, getRandomColor());
                    DotArray.push(dot);
                }
            }
            currentImage = new CanvasImage(canvas.width, canvas.height, backgroundColor, DotArray, BlockArray);
        }
    });
}
function getCurrentParticle(count) {
    var r = (count % 2);
    if (r === 0) {
        return "Block";
    }
    if (r === 1) {
        return "Dot";
    }
}
function drawDotArray(dotArray) {
    dotArray.forEach(element => {
        element.draw();
    });
}
function drawBlockArray(blockArray) {
    blockArray.forEach(element => {
        element.draw();
    });
}
/** From:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function GetRandomInt(max) {
    var int = Math.floor(Math.random() * max);
    return int;
}
// Colors
function getRandomRGB() {
    let color = "";
    var r = r || GetRandomInt(256);
    var g = g || GetRandomInt(256);
    var b = b || GetRandomInt(256);
    color = 'rgb(' + r + ',' + g + ',' + b + ')'.trim();
    return color;
}
function getRandomHSL() {
    let color = "";
    var h = h || GetRandomInt(360);
    var s = s || GetRandomInt(100);
    var l = l || GetRandomInt(100);
    color = 'hsl(' + h + ',' + s + '%,' + l + '%)'.trim();
    return color;
}
function getRandomHue() {
    let color = "";
    var h = h || GetRandomInt(360);
    color = 'hsl(' + h + ',' + saturation + '%,' + lightness + '%)'.trim();
    return color;
}
function Initialize() {
    collectionName = collectionNameUI.value;
    backgroundColor = backgroundColorUI.value;
    particleCount = parseInt(particleCountUI.value);
    imageSizeX = parseInt(imageSizeXUI.value);
    imageSizeY = parseInt(imageSizeYUI.value);
    canvas.width = imageSizeX;
    canvas.height = imageSizeY;
    messageBox.textContent = "";
    console.log('Image Size: ' + imageSizeX.toString() + "px x " + imageSizeY.toString() + "px");
    layout = layoutSelectUI.value.toString();
    particles = particleSelectUI.value.toString();
    console.log("Data Initialized");
}
function EnableDownloadButton() {
    let dataURI = canvas.toDataURL();
    downloadButton.href = dataURI.replace("image/png", "image/octet-stream");
    downloadButton.target = '_blank';
    downloadButton.download = collectionName + ".png";
}
function toggleTheme() {
    if (docBody.classList.contains("dark")) {
        docBody.classList.replace("dark", "light");
        if (themeButtonIcon.classList.contains("bi-sun-fill")) {
            themeButtonIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
        }
        else if (!themeButtonIcon.classList.contains("bi-sun-fill") || !themeButtonIcon.classList.contains("bi-moon-fill")) {
            themeButtonIcon.classList.add("bi-moon-fill");
        }
    }
    else if (docBody.classList.contains("light")) {
        docBody.classList.replace("light", "dark");
        if (themeButtonIcon.classList.contains("bi-moon-fill")) {
            themeButtonIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
        }
        else if (!themeButtonIcon.classList.contains("bi-sun-fill") || !themeButtonIcon.classList.contains("bi-moon-fill")) {
            themeButtonIcon.classList.add("bi-sun-fill");
        }
    }
}
setValues();
