Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});
Webcam.attach("#camera");

function take_Snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML =
            "<img id='captured_image' src='" + data_uri + "'>";
    });
}
var prediction_1 = "";
var prediction_2 = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
console.log("ml5 version is" + ml5.version);
var classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/j0vMnfWt8/model.json",
    modelLoaded
);

function modelLoaded() {
    console.log("Model is loaded");
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speak();
        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }
        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }
        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }
        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548";
        }
    }
}