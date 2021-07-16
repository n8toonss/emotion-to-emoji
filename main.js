Webcam.set({
    width:350,height:300,image_format:"png",png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
    Webcam.snap(function (data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("the version of ml5 is",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tb2P7OYvo/model.json',modelLoaded);
function modelLoaded(){
    console.log("model successfully loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is "+prediction1;
    speak_data2 = " and the second prediction is" + prediction2;
    utter_this = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
  if(error){
      console.error(error);
  }
  else{
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
      document.getElementById("result_emotion_name2").innerHTML = results[1].label;
      prediction1 = results[0].label;
      prediction2 = results[1].label;
      speak();
      if(results[0].label == "happy"){
          document.getElementById("updatedemoji").innerHTML = "&#128522";
    
        }
        if(results[0].label == "sad"){
            document.getElementById("updatedemoji").innerHTML = "&#128532";
        }
        if(results[0].label == "angry"){
            document.getElementById("updatedemoji").innerHTML = "&#128548";
        }
        if(results[1].label == "happy"){
            document.getElementById("updatedemoji2").innerHTML = "&#128522";
      
          }
          if(results[1].label == "sad"){
              document.getElementById("updatedemoji2").innerHTML = "&#128532";
          }
          if(results[1].label == "angry"){
              document.getElementById("updatedemoji2").innerHTML = "&#128548";
          }
    }
}
prediction1 = "";
prediction2 = "";
