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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateFeedback(feedback) {

    let valid = true;

    let labels = document.getElementsByTagName('label');
    for (let l of labels) {
        l.classList.remove('invalid');
    }

    if (!feedback.name) {
        let nameLable = document.querySelector('[for="nameInput"]');
        nameLable.classList.add('invalid');
        valid = false;
    }

    if (!validateEmail(feedback.email)) {
        let emailLabel = document.querySelector('[for="emailInput"]');
        emailLabel.classList.add('invalid');
        valid = false;
    }

    if (!feedback.msg) {
        let emailLabel = document.querySelector('[for="msgInput"]');
        emailLabel.classList.add('invalid');
        valid = false;
    }

    return valid;
}

function setSending() {
    let formElements = document.getElementsByClassName('formElement');
    for (let el of formElements) {
        el.disabled = true;
    }

    document.querySelector('button > span').style.display = 'none'
    document.querySelector('.spinner').style.display = 'block'
}

function sendFeedback() {

    let feedback = {}

    feedback.name = document.getElementById('nameInput').value.trim();
    feedback.email = document.getElementById('emailInput').value.trim();
    feedback.msg = document.getElementById('msgInput').value.trim();

    if (!validateFeedback(feedback))
        return;

    setSending();

    axios.post('/feedback', feedback).then(res => {
        let btnText = document.querySelector('button > span')
        btnText.style.display = 'block';

        let spinner = document.querySelector('.spinner');
        spinner.style.display = 'none';

        if (res.data == 'success') {
            btnText.innerText = 'Thank You!';
        } else {
            btnText.innerText = 'Error';
        }
    })
}

function showInfo() {
    document.getElementById('info').style.display = 'flex'
}
function hideInfo() {
    document.getElementById('info').style.display = 'none'
}