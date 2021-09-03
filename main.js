song1 ="";
song2 ="";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
status1= "";
status2=" ";
scoreLeftwrist = "";
scoreRightwrist = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
    
}

function setup()
{
    canvas = createCanvas(600,650);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modeloaded);
    poseNet.on("pose",gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    status1 = song1.isPlaying();
    status2 = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightwrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(status1 == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "SONG NAME = PETER PAN";
        }
    }
    else if(scoreLeftwrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(status2 == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "SONG NAME = HARRY POTTER THEME SONG";
        }
    }
    
}

function modeloaded()
{
    console.log("posenet is initialized");
}

function gotPoses(results)
{
    if(results.length > 0 )
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist score = " + scoreLeftwrist);

        scoreRightrrist = results[0].pose.keypoints[10].score;
        console.log("rightWrist score = " + scoreRightwrist);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;


        console.log("leftWrist X = "+ leftWristX + "leftWrist Y = " + leftWristY);
        console.log("rightWrist X = "+ rightWristX + "rightWrist Y = "+ rightWristY);
    }
}

