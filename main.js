Obj=[];
sta="";

function preload() {
    alaram=loadSound("alarm.mp3");
}
function setup() {
    canvas=createCanvas(480,480);
    canvas.center();
    v=createCapture(VIDEO);
    v.hide();
}
function draw() {
    image(v,0,0,480,480);
    for (var i = 0; i < Obj.length; i++) {
        fill("#DC143C");
        noFill();
        stroke("#DC143C")
        y=floor(Obj[i].confidence*100);
        text(Obj[i].label + " " + y + "%",Obj[i].x+15,Obj[i].y+15);
        rect(Obj[i].x,Obj[i].y,Obj[i].width,Obj[i].height);
        if (Obj[i].label=="person") {
            document.getElementById("s1").innerHTML="Object detected";
            document.getElementById("s2").innerHTML="Baby Found";
            alaram.stop();
        }
        else {
            document.getElementById("s2").innerHTML="Baby Not Detected";
            alaram.play();
        }    
        }
}

function start() {
    g1=ml5.objectDetector('cocossd',load);
    document.getElementById("s1").innerHTML="Detecting Objects";
}
function load() {
    console.log("done");
    sta=true;
    g1.detect(v,u);
}
function u(error,result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        Obj=result;
    }
}