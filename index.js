let allSelect = document.querySelectorAll("select");
console.log(allSelect);
let timeEl = document.querySelector("h1");
let setBtn = document.querySelector("button");
let contentBox = document.querySelector(".content-box");
let alarmTime, isAlarmSet = false;
let ringtone = new Audio("./assets/ringtone.mp3");


//run loop for hours
for(let i=12 ; i>0 ; i--){
    i = i<10 ? "0"+i : i; //agar 10 se chota hai to 01 02 03 like this show hona chahiye
    let option = `<option value="${i}">${i}</option>`
    allSelect[0].innerHTML += option;
}

//run loop for minutes
for(let i=59 ; i>=0 ; i--){
    i = i<10 ? "0"+i : i; 
    let option = `<option value="${i}">${i}</option>`
    allSelect[1].innerHTML += option;
}

//run loop for AM PM
for(let i=2 ; i>0 ; i--){
    
    ampm = i==1 ? "PM" :"AM";

    let option = `<option value="${ampm}">${ampm}</option>`
    allSelect[2].innerHTML += option;
}

//getting hour minute and second in the display

setInterval(()=>{
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let ampm = "AM";
    if(h>=12){
        ampm = "PM";
    }


    // to convert it into 12 hours clock not 24 hour
    h = h==0 ? h=12 : h;
    ampm = h === 0 ? "AM" : h === 12 ? "PM" : h > 12 ? "PM" : "AM";
    h = h === 0 ? 12 : h > 12 ? h - 12 : h;
    // adding 0 before hour minute and second

    h = h<10 ? "0"+h : h;
    m = m<10 ? "0"+m : m;
    s = s<10 ? "0"+s : s;

    // console.log(`${h}:${m}:${s}:${ampm}`);
    timeEl.innerText = `${h}:${m}:${s}:${ampm}`;
    if(alarmTime == `${h}:${m} ${ampm}`){
        // console.log("Ringing Sound...TING TING");
        ringtone.play();
        ringtone.loop = true;
    }

},1000)

// set alarm coding

setBtn.onclick = ()=>{
    setAlarm();
}

setAlarm = ()=>{
    if(isAlarmSet){
        alarmTime="";
        ringtone.pause();
        contentBox.classList.remove("disabled");
        setBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    isAlarmSet = true;
    let time = `${allSelect[0].value}:${allSelect[1].value} ${allSelect[2].value}`
    // console.log(time);
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
       return swal("Murkh🤬" , "Sahi time daal!")
    }
    contentBox.classList.add("disabled");
    setBtn.innerText = "Clear Alarm";
    alarmTime = time;
}