var hasMapInit = false;
var databaseID = [];
var database = [];
var myDataRef = new Firebase('https://rla9jpcgz6r.firebaseio-demo.com/');


$(document).ready(function() {
	load();
	$('.send_message').on('click', function() {

	});
	myDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		database.push(message);

		databaseID.push(snapshot.ref().toString());
	});

});


$(document).delegate('#page2', 'pageshow', function() {
	// alert(1);
	if (!hasMapInit) {
		initMap();
		hasMapInit = true;
	} else {
		// calcRoute(start, end);
	}
});

function submit() {

	var name = $('#userInput').val().trim();
	var pass = $('#passInput').val().trim();
	var createNew = true;
	var data = new Object();
	data.lat = lat;
	data.lng = lng;
	for (var i = 0; i < database.length; i++) {
		console.log(database[i].name + "=" + name);
		if (database[i].name == name) {
			var updateRef = new Firebase(databaseID[i]);
			createNew = false;
		}
	};
	if (createNew) {
		data.phone = "+18888888888";
		myDataRef.push({

			name: name,
			pass: pass,
			data: data
		});
	} else {
		updateRef.update({
			data: data
		});
	}
	// function displayChatMessage(name, pass, lat, lng) {
	// 	$('.msg').html("<a><br>name: " + name + "<br>pass: " + pass + "<br> lat: " + lat + "<br> lng: " + lng + "</a>")
	// 	// $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
	// };
}


function refresh() {
	load();
	console.log("Lat: " + lat);
	console.log("Long: " + lng);
	var name = $('#userInput').val().trim();
	var pass = $('#passInput').val().trim();
	var createNew = true;
	var data = new Object();
	data.lat = lat;
	data.lng = lng;
	for (var i = 0; i < database.length; i++) {
		console.log(database[i].name + "=" + name);
		if (database[i].name == name) {
			var updateRef = new Firebase(databaseID[i]);
			createNew = false;
		}
	};
	if (createNew) {
		myDataRef.push({
			name: name,
			pass: pass,
			data: data
		});
	} else {
		updateRef.update({
			data: data
		});
	}

	myDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		database.push(message);
		databaseID.push(snapshot.ref().toString());
	});

	myCity.setMap(null);
	createCircle();
}
/*8
function doSomething() {
	console.log("yay!");
	$.get("../somepage.php");
	return false;
}*/