let appWnd;

window.addEventListener('message', msgReceived);
function save() {
    appWnd.postMessage({
        msg: 'login-add-app',
        name: document.querySelector('#name').value,
        url: document.querySelector('#url').value,
        img: document.querySelector('#img').value
    }, '*');
}
async function autodetectImg() {
    const page = (new DOMParser()).parseFromString(await (await fetch(document.querySelector('input#url').value)).text(), 'text/html');
    const faviconURL = page.querySelector('link[rel="shortcut icon"]').getAttribute('href');
    document.querySelector('input#img').value = faviconURL;
}

window.alert = function alert(msg) {
    let range = document.createRange();
    range.selectNode(document.body);
    let elem = range.createContextualFragment(`
<dialog open>
    <button onclick="this.parentElement.parentElement.removeChild(this.parentElement);">Close</button>
    <p>${msg}</p>
</dialog>
    `);
    document.body.appendChild(elem);
}

function msgReceived(e) {
    if(e.data.msg == "establish") {
        appWnd = event.source;
        //alert('Established connection: ' + appWnd);
    }
}