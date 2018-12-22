// Initialize Firebase
var config = {
    apiKey: "AIzaSyB780R89bPyuoLwIwRAjKqSgM3szmrKxyo",
    authDomain: "train-project-96cfd.firebaseapp.com",
    databaseURL: "https://train-project-96cfd.firebaseio.com",
    projectId: "train-project-96cfd",
    storageBucket: "train-project-96cfd.appspot.com",
    messagingSenderId: "250498507626"
  };
  firebase.initializeApp(config);
//variable to reference the database
var database = firebase.database();

$(document).on("click", "button", function(){
    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainTime = $("#time").val().trim();
    var trainFrequency = $("#frequency").val().trim();
    //sending data to the database

    database.ref().push({
        trainName: trainName,
        theDestination: trainDestination,
        TrainTime: trainTime,
        Frequency: frequency,
    });

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
    console.log(moment(trainTime, "HH:mm").add(10, "minutes"));
    
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
})

database.ref().on("child_added", function(childSnap){
    var name = childSnap.val().trainName;
    var destination = childSnap.val().theDestination;
    var runOne = childSnap.val().TrainTime;
    var freq = childSnap.val().frequency;

    var firstTimeConverted = moment(childSnap.val().firstRun, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

    var newRow = $("<tr>")
    $("#dataTable").append(newRow)

    console.log(name, destination, runOne, freq) 
    newRow.append().html("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + freq + "</td>" + "<td>" + moment(nextTrain).format("hh:mm a") + "</td>" + "<td>" + tMinutesTillTrain + "</td>");
    
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
})