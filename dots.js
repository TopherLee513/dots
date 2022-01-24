/** app.js
* Quick App.js
*/

/** Setup */


/* Imports
const Particle = 'Particle.js';
const Random = 'Random.js';
*/
/*
module.exports.dots = () => {
    return 'New Dots Instance.';
};
*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('container');
const imageList = document.getElementById('imageList');
//const buttons = document.getElementById('buttons');
//const btnSaveImage = document.getElementById('btn-SaveImage');
const select = document.getElementById('select');
const types = ['Dots', 'Squares', 'Rows']
//let imageLink = document.getElementById('imageLink');
//let imagePreview = document.getElementById('imagePreview');
let imageDataURI = '';
//canvas.height = window.innerHeight;
//canvas.width = window.innerWidth;
canvas.height = 1024;
canvas.width = 1024;

const mouse = {
    x: undefined,
    y: undefined,
}

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.radius = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5
    }
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
}

class ImageElement {
    constructor(src, id) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        var btn = document.createElement("button");
        btn.class = 'btn';
        btn.id = 'btn-' + id;
        btn.onclick = 'saveImage(' + src + ')';
        img.src = src;
        li.appendChild(img);
        li.appendChild(btn);
        imageList.appendChild(li);
    }
}

function FormSelectOptions() {
    for (i = 0; i < types.length; i++) {
        var option = document.createElement('option');
        option.innerText = types[i];
        select.appendChild(option);
    }
}
function FormSubmit(name, count, type) {
    //Dots
    if (type === types[0]) {
        createRandomCircles(count);
    }
    //Squares
    if (type === types[1]) {
        createRandomSquares(count);
    }
    //Rows
    if (type === types[2]) {
        createCircleLines();
    }
}
const particles = [];
const images = [];
const navLinks = [];

function createListItem(src) {
    var li = document.createElement("li");
    var link = document.createElement('a');
    var img = document.createElement("img");
    var span = document.createElement("span");

    link.href = CanvasImageSrc().replace("image/png", "image/octet-stream");
    link.id = 'imageLink';
    link.target = '_blank';
    span.innerText = 'Download';
    link.download = "image.png";
    img.src = CanvasImageSrc();
    img.id = 'imagePreview';

    li.appendChild(link);
    link.appendChild(img);
    link.appendChild(span);
    imageList.appendChild(li);
}

function createCircle(x, y, radius, color) {
    var x = x || GetRandomInt(canvas.width); // Random X
    var y = y || GetRandomInt(canvas.height); // Random Y
    var radius = radius || GetRandomInt(20);
    var color = color || getRandomRGB();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function createSquare(x, y, size, color) {
    var x = x || GetRandomInt(canvas.width); // Random X
    var y = y || GetRandomInt(canvas.height); // Random Y
    var size = size * 2 || GetRandomInt(20) * 2;
    var color = color || getRandomRGB();

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size, color);
}

function createRandomCircles(count) {
    for (i = 0; i < count; i++) {
        console.log('Number: ' + i);
        setTimeout(function() {
            createCircle()
        }, 10);
    }
    createListItem()
}

function createRandomSquares(count) {
    for (i = 0; i < count; i++) {
        console.log('Number: ' + i);
        setTimeout(function() {
            createSquare()
        }, 10);
    }
    createListItem()
}

function createRandomSpread(count) {
    for (i = 0; i < count; i++) {
        var r = (i % 2)
        console.log('Number: ' + r)
        setTimeout(function() {
            createWhat(r)
        },
            10);
    }
    createListItem()
}
function createWhat(i) {
    if (i === 0) {
        console.log('Even: ' + r);
        createCircle();
    }
    else if (i === 1) {
        console.log('Odd: ' + r);
        createSquare();
    }
}
function createCircleLines(size) {
    var x = size;
    var y = size;
    var countX = canvas.width / size * 2;
    var countY = canvas.height / size * 2;
    ctx.fillRect(0,
        0,
        canvas.width,
        canvas.height,
        getRandomRGB());
    console.log('Count X: ' + countX);
    console.log('Count Y: ' + countY);
    for (row = 1; row <= countY; row++) {
        for (column = 1; column <= countX; column++) {
            createCircle(x, y, size);
            x = x + size * 2;
        }
        x = size;
        countX = canvas.width / size * 2;
        y = y + size * 2;
    }
}

function CanvasImageSrc() {
    var dataURI = canvas.toDataURL();
    imageDataURI = dataURI;
    console.log(dataURI);
    return dataURI;
}

function getRandomHSL() {
    var h = h || GetRandomInt(360);
    var s = s || GetRandomInt(100);
    var l = l || GetRandomInt(100);
    return 'hsl(' + h + ',' + s + ',' + l + ')';
}
function getRandomHue() {
    var h = h || GetRandomInt(360);
    return 'hsl(' + h + ', 50%, 50%)';
}
function getRandomRGB() {
    var r = r || GetRandomInt(256);
    var g = g || GetRandomInt(256);
    var b = b || GetRandomInt(256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/** Start-it-up */
function Start() {
    FormSelectOptions();
    //createRandomSpread(100);
    //createNewCollection(5);
    //readCollection();
}

function createNewCollection(count) {
    for (i = 0; i < count; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createRandomSpread(10000);
        var png = canvas.toDataURL("image/png");
        createImgLiElement(png);
        images.push(png);
    }
}
function readCollection() {
    for (i = 0; i < images.length; i++) {

        console.log(images[i]);
    }
}
/** Utilities
* From:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function GetRandomInt(max) {
    var int = Math.floor(Math.random() * max);
    return int;
}

/** EVENTS */
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
/*
canvas.addEventListener('resize', function() {
    canvas.height = canvas.height;
    canvas.width = canvas.width;
});
*/
canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    createCircle(mouse.x, mouse.y);
});
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function animate() {
    requestAnimationFrame(animate);
}
animate();