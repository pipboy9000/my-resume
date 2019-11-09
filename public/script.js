var toastElement;

window.addEventListener('load', function () {
    toastElement = document.getElementById("toast");
});

function toast(txt) {
    toastElement.innerText = txt;
    toastElement.classList.remove("hide");
    toastElement.classList.add("show");

    setTimeout(function () {
        toastElement.classList.remove("show");
        toastElement.classList.add("hide");
    }, 2000)
}

function copyToClipboard(txt) {
    const el = document.createElement('textarea');
    el.value = txt;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function phoneClicked() {
    toast("Copied to clipboard");
    copyToClipboard("0523421905");
}

function mailClicked() {
    toast("Copied to clipboard");
    copyToClipboard("dan784@gmail.com");
}

fetch("https://meta.stackoverflow.com/users/1606811/dan-levin?tab=profile").then(data => {
    debugger;
    console.log(data);
})