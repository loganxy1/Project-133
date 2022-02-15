status = "";
objects = [];
song = "";

function preload(){
    song = loadSound("ohYeah.mp3");
}

function setup(){
    canvas = createCanvas(450, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(450, 450);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model has initialized");
    status =  true;
}

function draw(){
    image(video, 0, 0, 450, 450);
    if(status!=true){
        objectDetector.detect(video, gotResults);
        for(var i=0; i<objects.length; i++){
            console.log("forloop");
            noFill();
            stroke("lime");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent+"%", objects[i].x + 15, objects[i].y + 15);
            song.stop();
            document.getElementById("status").innerHTML = "Status: Object/s Detected";
            document.getElementById("object").innerHTML = "Baby Detected";
        }
    }
    else{
        song.play();
        document.getElementById("object").innerHTML = "Baby Not Detected";
        document.getElementById("status").innerHTML = "Status: Object/s Not Detected";
    }
}


function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        objects = results;
    }
}