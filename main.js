var score_left_wrist=0;
var score_right_wrist=0;
var song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_left_wrist>0.2){
    circle(leftWristX,leftWristY,20);
    numLeftWristY=Number(leftWristY);
    numLeftWristY=floor(numLeftWristY);
    volume=numLeftWristY/500;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
    }
}

function preload(){
    song=loadSound("music.mp3");

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("left wrist confidence is= "+score_left_wrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+leftWristX+" ,left wrist y= "+leftWristY);

         rightWristX=results[0].pose.rightWrist.x;
         rightWristY=results[0].pose.rightWrist.y;
         console.log("right wrist x= "+rightWristX+" ,right wrist y= "+rightWristY);


    }
}

