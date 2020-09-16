const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config.js');

console.log(chalk`[{green.bold Electrium}/{red Config}] checking config`);
if(!fs.existsSync(config)) {
    console.log(chalk`[{green.bold Electrium}/{red Config}] ~/.electrium.toml does not exist; creating...`);
    fs.writeFileSync(config, `
[[apps]]
name = "Welcome"
url = "welcome.html"
img = "welcome.svg"
default = true

# Add apps here
# Example (Slack web app):
# [[apps]]
# name = "Slack"
# url = "https://app.slack.com/client"
# img = "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png"

[[apps]]
name = "Add App"
url = "login.html"
img = "add.svg"
    `);
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
            nodeIntegrationInSubFrames: true,
            worldSafeExecuteJavaScript: true,
            //nativeWindowOpen: true
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
