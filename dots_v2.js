/** Dots.js */

/** Setup */
const canvasContainer = document.getElementById('canvasContainer');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageList = document.getElementById('imageList');

const imageFormUI = document.getElementById('imageFormUI');

const imageSizeXUI = document.getElementById('imageSizeXUI');
const imageSizeYUI = document.getElementById('imageSizeYUI');

const imageNameUI = document.getElementById('imageNameUI');
const imageCountUI = document.getElementById('imageCountUI');
const shapeCountUI = document.getElementById('shapeCountUI');
const styleSelectUI = document.getElementById('styleSelectUI');
const shapeSelectUI = document.getElementById('shapeSelectUI');

let particles = [];
let particleIndex = 0;
let particleCount = 1;

let images = [];
let imageIndex = 0;
let imageCount = 1;

let imageId = 0;
let imageDataURI = undefined;

let collectionName = 'Dots';
let collectionCount = 1;

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
    this.shape = function shape() {
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
    this.shape = function shape() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size, this.color);
    }
}

class CanvasImage {
    constructor(id, name, total, particles) {
        this.id = id;
        this.name = name;
        this.total = total;
        this.particles = particles;
    }
}


