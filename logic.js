 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDV8pUMlI60IejUCRQFmi7r-_-7g0P1aeM",
    authDomain: "train-scheduler-b4215.firebaseio.com",
    databaseURL: "https://train-scheduler-b4215.firebaseio.com/",
    storageBucket: "gs://train-scheduler-b4215.appspot.com",
    messagingSenderId: "96262435526"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var dataRef = firebase.database();

  // Initial Values
  var name = "";
  var destination = "";
  var firstTime = "";
  var frequency = 0;
//   var monthsWorked = (moment(startDate).diff(moment(),"months"));
//   console.log(monthsWorked);
//   var totalBilled = monthsWorked * monthlyRate;
//   console.log(totalBilled);
//   var dateFormat = "MM/DD/YYY";
//   var convertedDate = moment (startDate, dateFormat);

  $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // obtaining months worked and total billed 
    // var dateFormat = "MM/DD/YYYY";
    // var convertedDate = moment (startDate, dateFormat);

    // console.log(moment(convertedDate).toNow());



    // Code for handling the push
    dataRef.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
    //   nextArrival: nextArrival, 
    //   minutesAway: minutesAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

      // Firebase watcher .on("child_added"
  dataRef.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.firstTime);
    console.log(sv.frequency);
    // console.log(sv.nextArrival);
    // console.log(sv.minutesAway);

    // Change the HTML to reflect
    $("#name-display").text(sv.name);
    $("#destination-display").text(sv.destination);
    $("#frequency-display").text(sv.frequency);
    $("#nextArrival-display").text(sv.nextArrival);
    $("#minutesAway-display").text(sv.minutesAway);


   // full list of items to the well
   $('tbody').append("<tr>" + "<div class='well'><span class='train-name'>"  + "<td>" + sv.name + 
   " </span><span class='train-destination'> " + "<td>" + sv.destination + "</td>" +
     " </span><span class='train-frequency'>" + "<td>" + sv.frequency + "</td>" +
     "</span> <span class ='train-next>" + "<td>" + sv.nextArrival + "</td>" +
       "</span> <span class='train-minutes'>" + "<td>" + sv.minutesAway + "</td>" + "</span></div>" + "<tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#frequency-display").text(snapshot.val().frequency);
    // $("#nextArrival-display").text(snapshot.val().nextArrival);
    $("#minutesAway-display").text(snapshot.val().minutesAway);
    // $("#totalBilled-display").text(snapshot.val().totalBilled);
  });