const express = require('express');
const net = require('net');
const path = require('path');
const signature = require('./signature');

const app = express();
const PORT = process.env.PORT || 5150;
let server;

app.set('view engine', 'ejs');
app.set('views', './tests/api-server/src/views');
app.use(express.static('./tests/api-server/public'));
app.use('/src', express.static(path.join(__dirname, '../../../src')));
app.use('/dist', express.static(path.join(__dirname, '../../../dist')));
app.use('/src', (req, res, next) => {
    if (req.path.indexOf('.js', req.path.length - 3) === -1) {
        // If the request does not end in '.js', append '.js' and try to resolve the file
        const jsPath = path.join(__dirname, '../../../src', `${req.path}.js`);
        res.sendFile(jsPath);
    } else {
        next();
    }
});

// Route for testing LT modules (initalises Items API)
app.get('/itemsapi', (req, res) => {
    const signatureData = signature.itemsApi();
    res.render('itemsapi', { signature: JSON.stringify(signatureData) });
});

function startServer() {
    checkServer(PORT, isRunning => {
        if (!isRunning) {
            console.log('Starting the server...');
            server = app.listen(PORT);
        }
    });
}

function checkServer(port, callback) {
    const server = net.createServer();
    server.once('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            callback(true);
        }
    });

    server.once('listening', function () {
        server.close();
        callback(false);
    });

    server.listen(port);
}

function stopServer() {
    server.close();
}

module.exports = { startServer, stopServer };
