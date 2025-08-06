import express from 'express';
import net from 'net';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as signature from './signature.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5150;
let server;
let startedByUs = false;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/src', express.static(path.join(__dirname, '../../../src')));
app.use('/dist', express.static(path.join(__dirname, '../../../dist')));

app.use('/src', (req, res, next) => {
    if (!req.path.endsWith('.js')) {
        const jsPath = path.join(__dirname, '../../../src', `${req.path}.js`);
        res.sendFile(jsPath);
    } else {
        next();
    }
});

app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // No Content
});

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

export async function startServer() {
    const isRunning = await checkServer(PORT);
    if (!isRunning) {
        console.time('server-start-complete');
        console.log('Starting the server...');
        server = app.listen(PORT, () => {
            console.log('Server started on port', PORT);
            console.timeEnd('server-start-complete');
        });

        await new Promise(resolve => server.once('listening', resolve));
        startedByUs = true;
    } else {
        console.log('Server already running on port', PORT);
    }
}

export function stopServer() {
    if (startedByUs && server) {
        console.log('Server stopped');
        server.close();
    } else {
        console.log('Server was not started by this process, so not stopping it.');
    }
}
