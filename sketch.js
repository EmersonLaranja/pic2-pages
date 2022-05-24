// let img;
let video;
let detector
let detections = []

function preload(){
    img = loadImage('cat_dog.jpg');
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    detections = results;
    detector.detect(video, gotDetections);
}

function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    detector.detect(video, gotDetections);
}

function draw(){
    image(video, 0, 0)

    for(let i = 0; i < detections.length; i++)
    {
        let object = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        stroke(0, 0, 0);
        fill(255);
        textSize(24);
        text(object.label, object.x + 10, object.y + 25);
    }
}