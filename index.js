const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config.js');

console.log(chalk`[{green.bold Electrium}/{red Config}] checking config`);
if(!fs.existsSync(`${process.env.HOME || process.env.USERDIR}/.electrium.json`)) {
    console.log(chalk`[{green.bold Electrium}/{red Config}] ~/.electrium.json does not exist; creating...`);
    fs.writeFileSync(config, JSON.stringify({
        apps: [
            {
                name: 'Welcome',
                url: 'welcome.html',
                img: 'welcome.svg',
                default: true
            },
            {
                name: 'Add App',
                url: 'login.html',
                img: 'add.svg',
                special: 'addApp'
            }
        ]
    }));
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        backgroundColor: '#222',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webviewTag: true,
            nodeIntegrationInSubFrames: true
        },
        autoHideMenuBar: true,
        icon: require('path').join(__dirname, 'logo.png')
    });
    // win.webContents.openDevTools();
    win.loadFile('index.html');
    win.on('closed', () => {
        delete win;
        app.quit();
    });
}

app.on('ready', createWindow);