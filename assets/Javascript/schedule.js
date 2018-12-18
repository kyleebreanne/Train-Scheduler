  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyALoXgQkhfDm1ysWDPOhXGCAmiyw4Gs3-A",
    authDomain: "employee-data-e476b.firebaseapp.com",
    databaseURL: "https://employee-data-e476b.firebaseio.com",
    projectId: "employee-data-e476b",
    storageBucket: "",
    messagingSenderId: "1008595911842"
    };
    firebase.initializeApp(config);
    // database reference
    var database = firebase.database();
    //set the database data
    $(document).on("click", "button", function(){
        var name = $("#empName").val().trim();
        var role = $("#empRole").val().trim();
        var start = $("#empSD").val().trim();
        var rate = $("#empMR").val().trim();

        database.ref().push({
            employeeName: name,
            role: role,
            startDate: start,
            monthlyRate: rate,
        })

    })

    database.ref().on("child_added", function(snapshot){
    //retrieve values from the database
        var dataName ="<td>" + snapshot.val().employeeName + "</td>";
        var dataRole = "<td>" + snapshot.val().role + "</td>";
        var dataStartDate = "<td>" + snapshot.val().startDate + "</td>";
        var dataRate = "<td>" + snapshot.val().monthlyRate + "</td>";
    //new row to add 
        var newRow = $("<tr>"); 

        newRow.append().html(dataName);  
        newRow.append().html(dataRole);
        newRow.append().html(dataStartDate);
        newRow.append().html(dataRate);

        $("#employee").append(newRow); 
    
    })
