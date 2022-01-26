/* Solar System Simulated */

const http = require('http');
const fs = require('fs');
const path = require('path');
//const dots = require('dots.js');
//const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            res.statusCode = 404;
            res.write('file not found');
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/*
let handleRequest = (request, response) => {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.statusCode = 404;
            response.write('file not found');
        } else {
            response.write(data);
        }
        response.end();
    });
};

http.createServer(handleRequest).listen(port);

/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/