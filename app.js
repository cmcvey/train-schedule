

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDpy3kuXDp2dOmNtt8VdeMP4Cusb6rl9NE",
    authDomain: "traintime-54a91.firebaseapp.com",
    databaseURL: "https://traintime-54a91.firebaseio.com",
    projectId: "traintime-54a91",
    storageBucket: "traintime-54a91.appspot.com",
    messagingSenderId: "333078490091"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();


$('#add-train').on('click', function(event) {
  event.preventDefault();

  var newTrain = {
    name: $('#train-name-input').val().trim(),
    destination: $('#destination-input').val().trim(),
    firstTrain: $('#first-train-input').val().trim(),
    frequency: $("#frequency-input").val().trim()
  };

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  trainData.ref().push(newTrain);
})

function addRow(train) {
  var nextTrain = moment(train.firstTrain, "HH:mm")
  var minutesToNext = moment.duration(nextTrain.diff()).hours() * 60 + moment.duration(nextTrain.diff()).minutes();

  if (nextTrain.diff() < 0) {
    minutesToNext = parseInt(train.frequency) + (moment.duration(nextTrain.diff()).hours() * 60 + moment.duration(nextTrain.diff()).minutes()) % parseInt(train.frequency)
    nextTrain = moment().add(minutesToNext, "minutes");
  }

  $("#schedule tbody").append(`
    <tr>
      <td>${train.name}</td>
      <td>${train.destination}</td>
      <td>${train.frequency}</td>
      <td>${moment(nextTrain, "HH:mm").format("HH:mm")}</td>
      <td>${minutesToNext}</td>
    </tr>
  `)
}

trainData.ref().on('child_added', function(snapshot) {
  addRow(snapshot.val());
});
