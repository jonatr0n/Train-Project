// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDsd8uMt68nLETy8Pzs-uDlPrGwTlI4xso",
  authDomain: "train-project-e93c6.firebaseapp.com",
  databaseURL: "https://train-project-e93c6.firebaseio.com",
  projectId: "train-project-e93c6",
  storageBucket: "train-project-e93c6.appspot.com",
  messagingSenderId: "196185192857"
};
firebase.initializeApp(config);

var database = firebase.database();

//add new train button
$("#addTrainBtn").on("click", function () {

  var trainName = $('#trainNameInput').val().trim();
  var destination = $('#destInput').val().trim();
  var firstTrain = $('#firstTrainInput').val().trim();
  var frequency = $('#freqInput').val().trim();

  //new train object
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency,
  }

  database.ref().push(newTrain);

  $('#trainNameInput').val("");
  $('#destInput').val("");
  $('#firstTrainInput').val("");
  $('#freqInput').val("");


  return false;
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;


  // MOMENT JS

  // First Time 
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});
