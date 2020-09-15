const ButtonMiddleware = require('./ButtonMiddleware.js');
const fs = require('fs');
const config = require('./config.js');

module.exports = new ButtonMiddleware({
    init(wnd) {
        window.addEventListener('message', ev => {
            if(ev.data.msg == 'login-add-app') {
                const curConf = JSON.parse(fs.readFileSync(config));
                console.log(curConf, ev.data);
                delete ev.data.msg;
                const addAppApp = curConf.apps.pop();
                curConf.apps.push(ev.data);
                curConf.apps.push(addAppApp);
                fs.writeFileSync(config, JSON.stringify(curConf));
            }
        });
        console.log('Establishing login connection...');
        wnd.postMessage({msg: 'establish'}, '*');
    }
}, 'init')
