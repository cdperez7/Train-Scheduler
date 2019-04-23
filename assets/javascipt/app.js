var config = {
    apiKey: "AIzaSyDNfJGNlPGbxxHG14s3pEs6RTSG4nGJnxQ",
    authDomain: "train-scheduler-homework-7.firebaseapp.com",
    databaseURL: "https://train-scheduler-homework-7.firebaseio.com",
    projectId: "train-scheduler-homework-7",
    storageBucket: "train-scheduler-homework-7.appspot.com",
    messagingSenderId: "472839829250"
  };

firebase.initializeApp(config);
var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();

    //capture data
    var empTrainName = $("#train-time").val().trim();
    var empDestination = $("#destination").val().trim();
    var empFrequency = $("#frequency").val().trim();
    var empFirstTrainTime = $("#first-train-time").val().trim();
    console.log(empTrainName);
    console.log(empDestination);
    console.log(empFrequency);
    console.log(empFirstTrainTime);

    //creating data structure within FireBase
    var newTrain = {
        trainName: empTrainName,
        Destination: empDestination,
        Frequency: empFrequency,
        FirstTrainTime: empFirstTrainTime
    };
    //push new data to FireBase
    database.ref().push(newTrain);

    $("#train-time").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#first-train-time").val("");
});

database.ref().on("child_added", function(data) {
    var empTrainName = data.val().trainName;
    var empDestination = data.val().Destination;
    var empFrequency = data.val().Frequency;
    var empFirstTrainTime = data.val().FirstTrainTime;

    var momentInst = moment('MMMM Do YYYY, h:mm:ss a');
    console.log(momentInst);
    // var minutesAway = momentInst.diff(moment(), 'months') * -1;
    // var nextMinutesAway = empMonths * empRate;

    var trainCell = $("<td>").text(empTrainName);
    var destinationCell = $("<td>").text(empDestination);
    // var frequencyCell = $("<td>").text(momentInst.format('MM/DD/YYYY'));
    var frequencyCell = $("<td>").text(empFrequency);
    var firstTrainTimeCell = $("<td>").text(empFirstTrainTime);

    var newRow = $("<tr>").append(trainCell, destinationCell, frequencyCell, firstTrainTimeCell);
    $("tbody").append(newRow);
});