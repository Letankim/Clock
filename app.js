let hour = document.querySelector(".hour"),
    minute = document.querySelector(".minute"),
    seconds = document.querySelector(".seconds"),
    audioSeconds = document.querySelector(".audio_seconds"),
    btnControlAudio = document.querySelector(".status"),
    iconStatusAudio = document.querySelector(".audio_icon");

const date = new Date();
const myTime = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    seconds: date.getSeconds(),
    setHour: function(currentHour) {
        this.hour = currentHour;
    },
    setMinute: function(currentMinute) {
        this.minute = currentMinute;
    },
    setSecond: function(currentSecond) {
        this.second = currentSecond;
    }
}

let isAudio;
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
    const [hour, minute, second] = myTime;
    const s = 6 * second + 90;
    seconds.style.transform = ("rotate(" + s + "deg) translateX(-35%)");
    const m = 6 * minute+ 90 + second*0.1;
    minute.style.transform = ("rotate(" + m + "deg) translateX(-35%)");
    const h = 30 * (hour - 12) + 90 + minute * 0.5;
    hour.style.transform = ("rotate(" + h + "deg) translateX(-35%)");
}

function handleInfo() {
    const [hour, minute, second] = myTime;
    myTime.setSecond(second++);
    if(myTime.seconds == 60) {
        myTime.setMinute(minute++);
        myTime.setSecond(0);
    }
    if(myTime.minute == 60) {
        myTime.setHour(hour++);
        myTime.setMinute(0);
        if(myTime.hour == 24) {
            myTime.setHour(0);
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


