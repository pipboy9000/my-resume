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

//stack overflow card
axios.get('/medias/so/1606811').then(res => {
    let data = res.data;
    let repDiv = document.getElementById('so-rep');
    repDiv.innerText = data.reputation;

    if (data.badges.bronze) {
        let bronzeDiv = document.getElementById('so-bronze');
        bronzeDiv.innerText = data.badges.bronze
    }

    if (data.badges.silver) {
        let bronzeDiv = document.getElementById('so-silver');
        bronzeDiv.innerText = data.badges.silver
    }

    if (data.badges.gold) {
        let bronzeDiv = document.getElementById('so-gold');
        bronzeDiv.innerText = data.badges.gold
    }
})