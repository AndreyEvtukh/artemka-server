const express = require('express');
const debug = require('debug')('artemka-server:server');
const http = require('http');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
console.error(9)
const apiRouter = require('./routes/api');
const app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(
//     cors({origin: ['http://localhost:4201', 'http://localhost:3001', 'https://artemka-server.vercel.app']})
// );
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
console.error(9)
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://artemka-server.vercel.app');
//     next();
// });

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.keepAlive = true;

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;
