noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function preload()
{

}

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 450);
    canvas.position(560, 50);

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotPoses);
}

function modalLoaded()
{
    console.log('PoseNet is Intialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor( leftWristX - rightWristX );

        console.log('leftWristX = ' + leftWristX + 'rightWristX = ' + rightWristX + 'difference = '+ difference);
    }
}

function draw()
{
    background('#00FFFF');
    document.getElementById('text_side').innerHTML = 'Width and Height of the text will be = ' + difference + 'px';
    fill('#ff0000');
    stroke('#32CD32');
    text(noseX, noseY, difference);

}
