
async function autodetectImg() {
    const page = (new DOMParser()).parseFromString(await (await fetch(document.querySelector('input#url').value)).text(), 'text/html');
    const faviconURL = page.querySelector('link[rel="shortcut icon"]').getAttribute('href');
    document.querySelector('input#img').value = faviconURL;
}

function parseHTML(htmlStr) {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(htmlStr);
}

function save() {
    let toml = `
[[apps]]
name = "${document.querySelector('#name').value}"
url = "${document.querySelector('#url').value}"
img = "${document.querySelector('#img').value}"
    `
    let dlg = parseHTML(`
    <div id="toml">
        Paste this in your <code>~/.electrium.toml</code> file in the <code># Add apps here</code> section and restart Electrium.
        <pre style="text-align:left">
${toml}
        </pre>
    </div>
    `);
    document.querySelectorAll('#toml').forEach(elem => document.querySelector('#mainArea').removeChild(elem));
    document.querySelector('#mainArea').appendChild(dlg);
}