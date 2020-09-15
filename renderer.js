const { remote } = require("electron");
const config = require('./config.js');
const fs = require('fs');
const chalk = require('chalk');
const launchApp = require('./launchApp.js');
var win = remote.getCurrentWindow();
window.addEventListener('DOMContentLoaded', () => {

document.querySelector("#titleshown").innerHTML = document.title;

var minimize = document.querySelector("#minimize");
var maximize = document.querySelector("#maximize");
var quit = document.querySelector("#quit");

minimize.addEventListener("click", () => {
  win.minimize();
});

maximize.addEventListener("click", () => {
  win.setFullScreen(!win.isFullScreen());
});

quit.addEventListener("click", () => {
  win.close();
});


console.log(chalk`[{bold.green Electrium}/{red Render}] loading config`);
const curConf = JSON.parse(fs.readFileSync(config));
let frag = document.createDocumentFragment();
curConf.apps.forEach(app => {
  let btn = document.createElement('button');
  btn.classList.add('app');
  if(app.default) {
    btn.classList.add('selected');
    launchApp(app.url);
     document.querySelector('#titleshown').innerHTML = document.title = app.name;
  }
  btn.setAttribute('data-url', app.url);
  btn.setAttribute('title', app.name);
  btn._app = app;
  let img = document.createElement('img');
  img.src = app.img;
  img.width = img.height = '32';
  btn.appendChild(img);
  frag.appendChild(btn);
})
document.querySelector('#sidebar').appendChild(frag);

let apps = document.querySelectorAll('button.app');
for(const btn of apps) {
  btn.addEventListener('click', () => {
    for(const btn2 of apps) {
      btn2.classList.remove('selected');
    }
    btn.classList.add('selected');
    launchApp(btn.getAttribute('data-url'));
    document.querySelector('#titleshown').innerHTML = document.title = btn._app.name;
    if(btn._app.special) {
      require('./' + btn._app.special + '.js').use(document.querySelector('#content').contentWindow);
    }
  })
}
document.querySelector('#devtools').addEventListener('click', () => win.webContents.toggleDevTools());

});