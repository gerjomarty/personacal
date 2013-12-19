var conditionPhrases = {"Drizzle": "rain", "Rain": "rain", "Snow": "snow", "Snow Grains": "snow", "Ice Crystals": "snow", "Ice Pellets": "snow", "Hail": "snow", "Mist": "fog", "Fog": "fog", "Fog Patches": "fog", "Smoke": "fog", "Volcanic Ash": "fog", "Widespread Dust": "cloud", "Sand": "fog", "Haze": "fog", "Spray": "rain", "Dust Whirls": "cloud", "Sandstorm": "fog", "Blowing Snow": "snow-storm", "Blowing Widespread Dust": "cloud", "Blowing Sand": "fog", "Rain Mist": "rain", "Rain Showers": "rain", "Snow Showers": "snow", "Snow Blowing Snow Mist": "snow-storm", "Ice Pellet Showers": "snow", "Hail Showers": "snow", "Small Hail Showers": "snow-rain", "Thunderstorm": "thunder", "Thunderstorms": "thunder", "Thunderstorms and Rain": "thunder", "Thunderstorms and Snow": "thunder", "Thunderstorms and Ice Pellets": "thunder", "Thunderstorms with Hail": "thunder", "Thunderstorms with Small Hail": "thunder", "Patches of Fog": "fog", "Shallow Fog": "fog", "Partial Fog": "fog", "Overcast": "cloud", "Clear": "sun", "Partly Cloudy": "sun-cloud", "Mostly Cloudy": "cloud", "Scattered Clouds": "cloud", "Small Hail": "snow", "Squals": "storm", "Funnel Cloud": "cloud", "Flurries": "snow", "Sleet": "snow-rain", "Partly Sunny": "sun-cloud", "Mostly Sunny": "sun-cloud", "Sunny": "sun", "Unknown Precipitation": "rain", "Unknown": "unknown"};

enyo.kind({
	name: "DataFetcher",
	components: [
		{
			name: "service",
			kind: enyo.WebService,
			callbackName: "callback",
			jsonp: true,
			onResponse: "gotResponse",
			onError: "gotError"
		}
	],
	showing: false,
	published: {
		weatherApiKey: null,
		locationQuery: null
	},
	events: {
		onDataFetched: ""
	},
	create: function() {
		this.inherited(arguments);
		this.midnightJob = window.setInterval(enyo.bind(this, "onMidnightTimer"), 1000);
		this.updateJob = window.setInterval(enyo.bind(this, "onUpdateTimer"), 1800000);
	},
	destroy: function() {
		window.clearInterval(this.midnightJob);
		window.clearInterval(this.updateJob);
		this.inherited(arguments);
	},
	onMidnightTimer: function() {
		var timeNow = new Date();
		if (this.lastTimeChecked && this.lastTimeChecked.getDate() != timeNow.getDate()) {
			this.lastTimeChecked = timeNow;
			this.fetchData();
		} else {
			this.lastTimeChecked = timeNow;
		}
	},
	onUpdateTimer: function() {
		this.fetchData();
	},
	getApiUrl: function() {
		return "http://api.wunderground.com/api/"+this.weatherApiKey+"/yesterday/forecast10day"+this.locationQuery+".json";
	},
	weatherApiKeyChanged: function(oldWeatherApiKey) {
		this.$.service.setUrl(this.getApiUrl());
	},
	locationQueryChanged: function(oldLocationQuery) {
		this.$.service.setUrl(this.getApiUrl());
	},
	fetchData: function() {
		this.$.service.send({callback: "callback"});
	},
	fetchBlankData: function() {
		var blankData = [];
		for (var i = 0; i < 7; i++) {
			blankData.push({
				celsius: {max: null, min: null},
				fahrenheit: {max: null, min: null},
				conditions: {iconName: null, full: null}
			});
		}
		this.doDataFetched({dates: getDates(), weather: blankData});
	},
	conditionIcon: function(conditions) {
		var normalisedConditions = conditions.replace(/^(light|heavy|low drifting|freezing|chance of( a)?) /i, '');
		var iconName = conditionPhrases[normalisedConditions];
		if (iconName) { return iconName; }
		return "unknown";
	},
	parseYesterday: function(data) {
		var observations = data.history.observations;
		var tempC = [], tempF = [], iconNames = [], conditions = [];
		for (var i = 0; i < observations.length; i++) {
			tempC.push(parseFloat(observations[i].tempm));
			tempF.push(parseFloat(observations[i].tempi));
			iconNames.push(this.conditionIcon(observations[i].conds));
			conditions.push(observations[i].conds);
		}
		return {
			celsius: {max: Math.round(Math.max.apply(Math, tempC)), min: Math.round(Math.min.apply(Math, tempC))},
			fahrenheit: {max: Math.round(Math.max.apply(Math, tempF)), min: Math.round(Math.min.apply(Math, tempF))},
			conditions: {iconName: mode(iconNames), full: mode(conditions)}
		}
	},
	parseForecast: function(data) {
		var forecasts = data.forecast.simpleforecast.forecastday;
		var parsedData = [];
		for (var i = 0; i < 6; i++) {
			parsedData.push({
				celsius: {max: parseInt(forecasts[i].high.celsius), min: parseInt(forecasts[i].low.celsius)},
				fahrenheit: {max: parseInt(forecasts[i].high.fahrenheit), min: parseInt(forecasts[i].low.fahrenheit)},
				conditions: {iconName: this.conditionIcon(forecasts[i].conditions), full: forecasts[i].conditions}
			});
		}
		return parsedData;
	},
	gotResponse: function(inSender, inEvent) {
		var weatherYesterday = [this.parseYesterday(inEvent.data)];
		var weatherForecast = this.parseForecast(inEvent.data);
		this.doDataFetched({dates: getDates(), weather: weatherYesterday.concat(weatherForecast)});
	},
	gotError: function(inSender, inEvent) {
		enyo.error("Error when fetching weather: " + inEvent.data);
		this.fetchBlankData();
	}
});
