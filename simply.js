simply.title('Hello World!');

function getWeather() {
	navigator.geolocation.getCurrentPosition(function(pos){
	  var coords = pos.coords;
	  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?' +
		  'lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=metric';
	  ajax({ url: weatherUrl, type: 'json' }, function(data) {
		var temp0 = 273.15;
		simply.text({ title: data.name, subtitle: data.main.temp - temp0});
	  });
	});
};

simply.on('singleClick', function(e) {
  //simply.subtitle('You pressed the ' + e.button + ' button!');
  if (e.button == 'up') {
		getWeather();
	} else {
		simply.subtitle('Not working!');
	};
});

simply.on('longClick', function(e) {
  simply.subtitle('You held the ' + e.button + ' button!');
});