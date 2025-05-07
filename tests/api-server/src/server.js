const express = require('express');
const net = require('net');
const path = require('path');
const signature = require('./signature');
const { log } = require('console');

const app = express();
const PORT = process.env.PORT || 5150;
let server;
let startedByUs = false;

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

function checkServer(port) {
    return new Promise(resolve => {
        const testServer = net.createServer();

        testServer.once('error', err => {
            if (err.code === 'EADDRINUSE') {
                resolve(true);
            }
        });

        testServer.once('listening', () => {
            testServer.close();
            resolve(false);
        });

        testServer.listen(port);
    });
}

async function startServer() {
    const isRunning = await checkServer(PORT);
    if (!isRunning) {
        console.time('server-start-complete');
        console.log('Starting the server...');
        server = app.listen(PORT, () => {
            console.log('Server started on port', PORT);
            console.timeEnd('server-start-complete');
        });

        // Wait for server to be ready
        await new Promise(resolve => server.once('listening', resolve));
        startedByUs = true;
    } else {
        console.log('Server already running on port', PORT);
    }
}

function stopServer() {
    if (startedByUs && server) {
        console.log('Server stopped');
        server.close();
    } else {
        console.log('Server was not started by this process, so not stopping it.');
    }
}

module.exports = { startServer, stopServer };
