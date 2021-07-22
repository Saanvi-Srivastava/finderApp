video="";
status="";
objects = [];
var synth = window.speechSynthesis

function preload()
{
    video = createCapture(VIDEO);
    video.hide();

}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}


function draw()
{ 
    image(video, 0, 0, 480, 380);

    if(status !="")
    {
        objectDetector.detect(video, gotResult);

        for(i=0; i < objects.length; i++)
        {
            document.getElementById("found_or_not").innerHTML = " " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    if(objects.label == object_name)
    {
      objectDetector.detect(gotResult);
      document.getElementById("found_or_not").innerHTML = object_name + " not found";
      synth = window.speechSynthesis;
      utterThis = new SpeechSynthesisUtterance(object_name + "Found");
      synth.speak(utterThis);
    }
    else
    {
      document.getElementById("found_or_not").innerHTML = object_name + " found ";
    }          
   }

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
