/** Dots.js */

/** Setup */
const canvasContainer = document.getElementById('canvasContainer');
const canvasPlaceholder = document.getElementById('canvasPlaceholder');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageList = document.getElementById('imageList');

const collectionForm = document.getElementById('collectionForm');
const imageSizeXUI = document.getElementById('imageSizeXUI');
const imageSizeYUI = document.getElementById('imageSizeYUI');

const collectionNameUI = document.getElementById('collectionNameUI');
const imageCountUI = document.getElementById('imageCountUI');
const backgroundColorUI = document.getElementById('backgroundColorUI');

const particleCountUI = document.getElementById('particleCountUI');
const layoutSelectUI = document.getElementById('layoutSelectUI');
const particleSelectUI = document.getElementById('particleSelectUI');

const shapes = ['Dots', 'Squares', 'Both']
const styles = ['Random', 'Rows']

let particles = [];
let particleIndex = 0;
let particleCount = undefined;

let images = [];
let imageIndex = 0;
let imageCount = 1;

let imageId = 0;
let imageDataURI = undefined;
let imageName = undefined;

let collection = [];
let collectionName = undefined;
let collectionCount = 1;

//canvas.height = window.innerHeight;
//canvas.width = window.innerWidth;

let imageSizeX = 2048;
let imageSizeY = 2048;

canvas.width = imageSizeX;
canvas.height = imageSizeY;


const mouse = {
    x: undefined,
    y: undefined,
}

class Particle {
    constructor(id, x, y, size, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

class Dot extends Particle {
    constructor() {
        super()
    }
    draw() {
        this.radius = this.size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Block extends Particle {
    constructor() {
        super()
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size, this.color);
    }
}

class CanvasImage {
    constructor(id, name, background, particles) {
        this.id = id;
        this.name = name;
        this.background = background;
        this.particles = particles;
    }
}

function FormSubmit() {

    imageSizeX = imageSizeXUI.value || 2048;
    imageSizeY = imageSizeYUI.value || 2048;
    /*
  imageSizeXUI.value.onchange() {
    imageSizeX =
    checkImageSizeInput(imageSizeXUI.value)
  }
  imageSizeYUI.value.onchange() {
    imageSizeY = checkImageSizeInput(imageSizeYUI.value)
  }
*/
    imageCount = imageCountUI.value || 1;
    collectionName = collectionNameUI.value || 'Dots';
    backgroundColor = backgroundColorUI.value || 'black';
    particleCount = particleCountUI.value || 9999;

    let layoutSelect = layoutSelectUI.value || 'Rows';
    let particleSelect = particleSelectUI.value || 'Dots';

    console.log('Form: ' + collectionForm);
    console.log('Name: ' + collectionName);
    console.log('Image Count: ' + imageCount);
    console.log('Particle Count: ' + particleCount);
    console.log('Layout: ' + layoutSelect);
    console.log('Particles: ' + particleSelect);

    canvas.width = imageSizeX;
    canvas.height = imageSizeY;
    canvas.style.border = "none";

    createCollection(layoutSelect, particleSelect, imageCount, particleCount, backgroundColor)
    placeholder(false);
}
/** Validation Checks */
function checkImageSizeInput(input) {
    let msgBox = document.getElementById('imageSizeWarning')
    var msg = '';
    if (input <= 0) {
        msg = "What're you doing? (256px - 4096px)"
    }
    if (input < 256) {
        msg = "What're you doing? (256px - 4096px)"
    }
    if (input > 4096) {
        msg = "What're you doing? (256px - 4096px)"
    }
    if (input > min && input < max) {
        msgBox.style.color = 'green';
        msg = getMsgSuccess()
    }
    msgBox.innerText = msg;
}

function getMsgSuccess() {
    var msgs = ['Cool-beans',
        'Looks-Good',
        'Okay!',
        'Yeah, Buddy']
    return msgs[GetRandomInt(msgs.length)]
}
function getMsgFailure() {
    var msgs = ['That is Wrong',
        'No Good',
        'Not Okay!',
        'No, Dude']
    return msgs[GetRandomInt(msgs.length)]
}
function buildImage(sizeX, sizeY, background, particles) {
    var sizeX = sizeX;
    var sizeY = sizeY;
    var background = background;
    var particles = particles;

    var image = CanvasImageSrc();
}
function buildListItem() {
    var imageCount = imageCount || 1;
    var li = document.createElement("li");
    var link = document.createElement('a');
    var img = document.createElement("img");
    var div = document.createElement("div");

    link.href = CanvasImageSrc().replace("image/png", "image/octet-stream");
    link.id = 'imageLink';
    link.target = '_blank';
    div.innerText = 'Download ' + boolCollection();
    link.download = boolCollection() + ".png";
    img.src = CanvasImageSrc();
    img.id = 'imagePreview';
    link.style.backgroundImage = "url(" + CanvasImageSrc() + ")";
    li.appendChild(link);
    link.appendChild(img);
    link.appendChild(div);
    imageList.appendChild(li);
}

function boolCollection() {
    var s = collectionName
    if (imageCount) {
        if (imageCount > 0) {
            s = collectionName + " " + collection.length + " of " + imageCount;
        }
    }
    return s
}

function drawDot(x, y, size, color) {
    this.x = x || GetRandomInt(canvas.width); // Random X
    this.y = y || GetRandomInt(canvas.height); // Random Y
    this.size = size || GetRandomInt(20);
    this.color = color || getRandomRGB();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    /*
    var i = indexer(Particle);
    var dot = new Dot(i, x, y, size, color);
    console.log('Particle: Dot');
    console.log('Index: ' + i);
    console.log('Coords: ' + x + " x " + y);
    console.log('Size: ' + size);
    console.log('Color: ' + color);
    dot.draw();
    particles.push(dot);
    */


}

function drawBlock(x, y, size, color) {
    this.x = x || GetRandomInt(canvas.width); // Random X
    this.y = y || GetRandomInt(canvas.height); // Random Y
    this.size = size || GetRandomInt(20);
    this.color = color || getRandomRGB();

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size, this.color);
    /*
    var i = indexer(Particle)
    var block = new Block(i, x, y, size, color);
    block.draw();
    particles.push(block);
    */
}
/** Layout
*  Random
*/
function createRandomDots(particleCount) {
    particleCount = particleCount || GetRandomInt(1000)
    console.log('Particles: ' + particleCount)
    particles = []
    for (i = 0; i < particleCount; i++) {
        //console.log('Number: ' + i)
        drawDot()
    }
    if (i >= particleCount) {
        console.log('Particles Created:' + i)
        buildListItem()
    }
}

function createRandomBlocks(particleCount) {
    particleCount = particleCount || GetRandomInt(1000)
    particles = []
    for (i = 0; i < particleCount; i++) {
        //console.log('Number: ' + i)
        drawBlock()
    }
    if (i >= particleCount) {
console.log('Particles Created:' + i)
       
        buildListItem()
    }
}

function createRandomBoth(particleCount) {
    particleCount = particleCount || GetRandomInt(1000)
    particles = []
    for (i = 0; i < particleCount; i++) {
        createWhat(i)
    }
    if (i >= particleCount) {
console.log('Particles Created:' + i)
       
        buildListItem()
    }
}

/** Layout
*   Rows
*/
function createRowsDots(size) {
    var x = size;
    var y = size;
    var countX = canvas.width / size * 2;
    var countY = canvas.height / size * 2;
    var total = countX + countY;
    var count = 0;
    particles = []
    createBackground()
    console.log('Count X: ' + countX);
    console.log('Count Y: ' + countY);
    console.log('Total: ' + total);
    for (row = 0; row <= countY; row++) {
        for (column = 0; column <= countX; column++) {
            drawDot(x, y, size)

            x = x + size * 2
            count++
        }
        x = size
        countX = canvas.width / size * 2
        y = y + size * 2
    }
    if (count >= total) {
        buildListItem()
    }
}

function createRowsBlocks(size) {
    var x = 0;
    var y = 0;
    var countX = canvas.width / size;
    var countY = canvas.height / size;
    var total = countX + countY;
    var count = 0;
    createBackground()
    console.log('Count X: ' + countX);
    console.log('Count Y: ' + countY);
    console.log('Total: ' + total);
    for (row = 0; row <= countY; row++) {
        for (column = 0; column <= countX; column++) {
            drawBlock(x, y, size)
            x = x + size
            count++
        }
        x = 0
        countX = canvas.width / size
        y = y + size
    }
    if (count >= total) {
        buildListItem()
    }
}

function createRowsBoth(size) {
    var x = 0;
    var y = 0;
    var countX = canvas.width / size;
    var countY = canvas.height / size;
    var total = countX + countY;
    var count = 0;
    createBackground()
    console.log('Count X: ' + countX);
    console.log('Count Y: ' + countY);
    console.log('Total: ' + total);
    for (row = 0; row <= countY; row++) {
        for (column = 0; column <= countX; column++) {
            createBoth(count, x, y, size)
            x = x + size
            count++
        }
        x = size
        countX = canvas.width / size
        y = y + size
    }
    if (count >= total) {
        buildListItem()
    }
}

function createWhat(i) {
    var r = (i % 2)
    //console.log('Number: ' + r)
    if (r === 0) {
        //console.log('Even: ' + r)
        drawDot()
    }
    if (r === 1) {
        //console.log('Odd: ' + r)
        drawBlock()
    }
}

function createBoth(i, x, y, size) {
    var r = (i % 2)
    //console.log('Number: ' + r)
    if (r === 0) {
        //console.log('Even: ' + r)
        var size2 = size / 2
        var x2 = x + size / 2
        var y2 = y + size / 2
        drawDot(x2, y2, size2)
    }
    if (r === 1) {
        //console.log('Odd: ' + r)
        drawBlock(x, y, size)
    }
}

function createCollection(layoutSelect, particleSelect, imageCount, particleCount, backgroundColor) {
    for (i = 0; i < imageCount; i++) {
        createBackground(backgroundColor)
        if (layoutSelect === 'Random' && particleSelect === 'Dots') {
            createRandomDots(particleCount)
        }
        if (layoutSelect === 'Rows' && particleSelect === 'Dots') {

            createRowsDots(8)
        }
        if (layoutSelect === 'Random' && particleSelect === 'Blocks') {

            createRandomBlocks(particleCount);
        }
        if (layoutSelect === 'Rows' && particleSelect === 'Blocks') {

            createRowsBlocks(8);
        }
        if (layoutSelect === 'Random' && particleSelect === 'Both') {

            createRandomBoth(particleCount);
        }
        if (layoutSelect === 'Rows' && particleSelect === 'Both') {
            createRowsBoth(8);

        }
        console.log('Image: ' + i)
    }
}
function indexer(object) {
    if (object) {
        if (object == Particle) {
            if (particles.length === 0) {
                return 0
            }
            if (particles.length > 0) {
                return particles.length
            }
        }
        if (object == Image) {
            if (collection.length === 0) {
                return 0
            }
            if (collection.length > 0) {
                return collection.length
            }
        }
    }
}
function readCollection() {
    for (i = 0; i < images.length; i++) {
        console.log(images[i]);
    }
}

/** Start-it-up */
function Start() {
    console.log('Started...')
    placeholder(true)
}
function placeholder(bool) {
    if (bool) {
        canvasPlaceholder.classList.remove('hidden');
        canvas.classList.add('hidden');
    }
    if (bool === false) {
        canvas.classList.remove('hidden');
        canvasPlaceholder.classList.add('hidden');
    }
}
/** Utilities */
function createBackground(color) {
    var c = color || getRandomRGB()
    ctx.fillRect(0,
        0,
        canvas.width,
        canvas.height,
        c);
}
function CanvasImageSrc() {
    var dataURI = canvas.toDataURL();
    imageDataURI = dataURI;
    console.log(dataURI);
    return dataURI;
}
// Colors
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
/** From:
* https://stackoverflow.com/a/10215724
*/
fitToContainer(canvas);
function fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

/** From:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function GetRandomInt(max) {
    var int = Math.floor(Math.random() * max);
    return int;
}
/** EVENTS */

function touch(bool) {
    if (bool) {
        canvas.addEventListener('click', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
            createCircle(mouse.x, mouse.y);
        });
    }
}
/*
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

canvas.addEventListener('resize', function() {
    canvas.height = canvas.height;
    canvas.width = canvas.width;
});
*/
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function animate() {
    requestAnimationFrame(animate);
}
animate();