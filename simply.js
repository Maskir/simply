simply.title('Hello World!', true);

function getWeather() {
	navigator.geolocation.getCurrentPosition(function(pos){
	  var coords = pos.coords;
	  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?' +
		  'lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=metric';
	  ajax({ url: weatherUrl, type: 'json' }, function(data) {
		var temp0 = 273.15;
		var t = data.main.temp;
		var tmin = data.main.temp_min;
		var tmax = data.main.temp_max;
		if (t > 200) {t = t - temp0};	
		if (tmin > 200) {tmin = tmin - temp0};	
		if (tmax > 200) {tmax = tmax - temp0};	
		simply.text({ title: data.name, subtitle: t.toFixed(1) + ' (' + tmin.toFixed(1) + '|' + tmax.toFixed(1) + ')' + '\n' + data.weather[0].description});
	  });
	});
};

function noti() {
	Pebble.showSimpleNotificationOnPebble('Hello!',
	  'Notifications from JavaScript? Welcome to the future!');
};

function accelTap() {
	simply.on('accelTap', function(e) {
	  simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
	});
};

simply.on('singleClick', function(e) {
  //simply.subtitle('You pressed the ' + e.button + ' button!');
	if (e.button == 'up') {
		getWeather();
	} else if (e.button == 'select') {
		noti();
	} else if (e.button == 'down') {	
		accelTap();
	};
});

simply.on('longClick', function(e) {
  simply.subtitle('You held the ' + e.button + ' button!');
});