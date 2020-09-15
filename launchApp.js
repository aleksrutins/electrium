module.exports = async function launchApp(url) {
    const iframe = document.querySelector('#content');
    iframe.src = url;
}