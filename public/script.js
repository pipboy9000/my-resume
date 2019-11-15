let toastElement;

let flamingoImages = [
    './images/icon_dothraki.png',
    './images/icon_elvish.png',
    './images/icon_klingon.png',
    './images/icon_valyrian.png',
]

let flamingoCurrentImg = 0;

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

//cycle flamingo images
setInterval(() => {
    flamingoCurrentImg++;
    flamingoCurrentImg %= flamingoImages.length;
    let imgUrl = `url('${flamingoImages[flamingoCurrentImg]}')`;
    document.getElementById("flamingo-logo").style.backgroundImage = imgUrl;
    // console.log(imgUrl);
}, 3000);

function sendFeedback() {

    let feedback = {}
    feedback.name = document.getElementById('nameInput').value;
    feedback.email = document.getElementById('emailInput').value;
    feedback.msg = document.getElementById('msgInput').value;

    axios.post('/feedback', feedback).then(res => {
        console.log(res);
    })
}