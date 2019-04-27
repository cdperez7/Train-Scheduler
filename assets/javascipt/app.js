$(document).ready(function(){

//personal firebase information
var config = {
    apiKey: "AIzaSyDNfJGNlPGbxxHG14s3pEs6RTSG4nGJnxQ",
    authDomain: "train-scheduler-homework-7.firebaseapp.com",
    databaseURL: "https://train-scheduler-homework-7.firebaseio.com",
    projectId: "train-scheduler-homework-7",
    storageBucket: "train-scheduler-homework-7.appspot.com",
    messagingSenderId: "472839829250"
};
//setting up link with firebase
firebase.initializeApp(config);
var database = firebase.database();

//Global variables to be used
var name;
var destination;
var firstTrain;
var frequency = 0;

//Data to be entered when user adds a train
$("#add-train").on("click", function() {
    event.preventDefault();

    //capture this data
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();


    //creating data structure within FireBase
    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    //push new data to FireBase
    database.ref().push(newTrain);

    // $("#train-name").val("");
    // $("#destination").val("");
    // $("#first-train").val("");
    // $("#frequency").val("");
});

database.ref().on("child_added", function (data) {
    var nextTrain;
    var minAway;

    var firstTrainNew = moment(data.val().firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainNew);
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    console.log(diffTime);
    var remainder = diffTime % data.val().frequency;
    console.log(remainder);
    var minAway = data.val().frequency - remainder;
    console.log(minAway);
    var nextTrain = moment().add(minAway, "minutes");
    console.log(nextTrain);
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").append("<tr><td>" + data.val().name + 
    "</td><td>" + data.val().destination +
    "</td><td>" + data.val().frequency +
    "</td><td>" + data.val().nextTrain +
    "</td><td>" + data.val().minAway + "</td></tr>");

}, function (errorObject){
    console.log("Errors handled: " + errorObject.code);
});
});
