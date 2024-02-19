"use strict";
/* Dots Test - Express Server */
const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const hostname = '127.0.0.1';
const port = 8080;
server.use(express.static(__dirname));
server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
