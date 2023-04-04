song_1 = "";
song_2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}


function draw()
{
    image(video, 0, 0, 600, 500);

    song1_status = song_1.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        song_2.stop();

        if(song1_status == false)
        {
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song Name = Harry Potter Theme Song";
        }
    }
}

function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function play()
{
    song_1.play();
    song_1.setVolume(1);
    song_1.rate(1);
}

function modelLoaded()
{
    console.log("PoseNet model is Initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left Wrist x = " + leftWristX + ",left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right Wrist x = " + rightWristX + ",right wrist y = " + rightWristY)
    }
}