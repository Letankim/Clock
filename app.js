let hour = document.querySelector(".hour"),
    minute = document.querySelector(".minute"),
    seconds = document.querySelector(".seconds"),
    audioSeconds = document.querySelector(".audio_seconds"),
    btnControlAudio = document.querySelector(".status"),
    iconStatusAudio = document.querySelector(".audio_icon");

var date = new Date();
var getHour = date.getHours();
var getMinute = date.getMinutes();
var getSeconds = date.getSeconds();
var isAudio;
window.onload = function() {
    render();
    if(localStorage.getItem("isAudio") != null) {
        isAudio = JSON.parse(localStorage.getItem("isAudio"));
        isAudio = false;
        audioStatusControl(btnControlAudio);
    } else {
        localStorage.setItem("isAudio", JSON.stringify(false));
    }
}
function render() {
    var s = 6 * getSeconds + 90;
    seconds.style.transform = ("rotate(" + s + "deg) translateX(-35%)");
    var m = 6 * getMinute + 90 + getSeconds*0.1;
    minute.style.transform = ("rotate(" + m + "deg) translateX(-35%)");
    var h = 30 * (getHour - 12) + 90 + getMinute * 0.5;
    hour.style.transform = ("rotate(" + h + "deg) translateX(-35%)");
}

function handleInfo() {
    getSeconds++;
    if(getSeconds == 60) {
        getMinute++;
        getSeconds = 0;
    }
    if(getMinute == 60) {
        getHour++;
        getMinute = 0;
        if(getHour == 24) {
            getHour = 0;
        }
    }
}

setInterval(function() {
    handleInfo();
    render();
    playAudio();
},1000);

btnControlAudio.addEventListener('click', function() {
    if(isAudio) {
        isAudio = false;
    } else {
        isAudio = true;
    }
    audioStatusControl(this);
});


function audioStatusControl(status) {
    if(isAudio) {
        status.classList.remove('active');
        iconStatusAudio.setAttribute('class', "bx bxs-bell-ring audio_icon");
        playAudio();
    } else {
        status.classList.add('active');
        iconStatusAudio.setAttribute('class', "bx bxs-bell-off audio_icon");
        playAudio();
    }
    localStorage.setItem("isAudio", JSON.stringify(isAudio));
}

function playAudio() {
    if(isAudio) {
        audioSeconds.play();
    } else {
        audioSeconds.pause();
    }
}


