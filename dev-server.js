const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const https = require('https');
const webpack = require('webpack');
const chalk = require('chalk');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    ws: true,
});

const args = require('minimist')(process.argv);

const port = args.p || 3002;
const host = args.h || '10.1.4.38';
const apiPort = args.a ? `:${args.a}` : '';
const devHost = args.devHost || 'www.favorit.com.ua';
const remoteProtocol = args.protocol || 'https';

const fakeSession = '6473B317306FC3068511A1B1C5'; // test

function replaceTargetDomain(cookie) {
    const temp = cookie.split(' ');
    temp[temp.length - 1] = `Domain=${host}`;
    temp[0] = `PHPSESSID=${fakeSession};`;
  // console.log(`temp:`, temp);
    return temp.join('');
}

const apiHost = `${remoteProtocol}://${devHost}${apiPort}`;

const options = {
    host: devHost,
    potocol: remoteProtocol,
    path: '/',
};

let PHPSESSID;
let sessionCookie;

const protocol = remoteProtocol === 'http' ? http : https;

protocol.get(options, (res, req) => {
    const cookieIndex = remoteProtocol === 'http' ? 1 : 3;
    sessionCookie = ((res.headers['set-cookie'] || [])[cookieIndex] || '');
    PHPSESSID = ((res.headers['set-cookie'] || [])[cookieIndex] || '').split(';')[0] || '';
    PHPSESSID = fakeSession;
    sessionCookie = replaceTargetDomain(sessionCookie);
});

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

proxy.on('error', (err, req, res) => {
    if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
    }
    res.end(JSON.stringify({ error: 'proxy_error', reason: err.message }));
});

app.use(cookieParser());

const serverOptions = {
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
  // historyApiFallback: true,
    stats: {
        assets: true,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
    },
};

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.use('/', express.static('./'));

app.use((req, res, next) => {
    if (PHPSESSID && (req.headers.cookie || '').indexOf(PHPSESSID) === -1) {
        req.headers.cookie = `${PHPSESSID };${req.headers.cookie};LANG=ru;`;
    }
    res.header('set-cookie', sessionCookie);
    next();
});


/* PAGE HANDLING */
app.get('/', (req, res) => {
    res.redirect('./src/index.html');
});

app.get('/index*', (req, res) => {
    res.sendFile(path.join(__dirname, './dev.html'));
});

/* API QWERYS */

app.all('*/content/*', (req, res) => {
    proxy.web(req, res, {
		target: 'https://www.favorit.com.ua',
    });
});

/* SERVER */
app.listen(port, host, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(chalk.bold.yellow(`Listening at http://${host}:${port}`));
    console.log(chalk.bold.cyan(`Proxy to ${apiHost}`));
});
