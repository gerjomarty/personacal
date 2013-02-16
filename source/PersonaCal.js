// enyo.kind({
// 	name: "PersonaCal",
// 	kind: "FittableRows",
// 	fit: true,
// 	components:[
// 		{kind: "onyx.Toolbar", content: "Hello World"},
// 		{kind: "enyo.Scroller", fit: true, components: [
// 			{name: "main", classes: "nice-padding", allowHtml: true}
// 		]},
// 		{kind: "onyx.Toolbar", components: [
// 			{kind: "onyx.Button", content: "Tap me", ontap: "helloWorldTap"}
// 		]}
// 	],
// 	helloWorldTap: function(inSender, inEvent) {
// 		this.$.main.addContent("The button was tapped.<br/>");
// 	}
// });

var dates = [];
var currentDate = new Date();
for (var i = -1; i <= 5; i++) {
	dates[i+1] = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000));
};

enyo.kind({
	name: "PersonaCal",
	components: [
		{kind: "CalendarContainer"}
	]
});

enyo.kind({
	name: "TodayBackground",
	classes: "today-background"
});

enyo.kind({
	name: "CalendarContainer",
	kind: enyo.Control,
	classes: "calendar-container",
	components: [
		{kind: "TodayBackground"},
		{kind: "HeadlineDate", name: "headline-date", date: currentDate},
		{kind: "InfoBlock", name: "day-y", date: dates[0], weather: "Sunny"},
		{kind: "InfoBlock", name: "day-0", classes: "info-block-today", date: dates[1], weather: "Sunny"},
		{kind: "InfoBlock", name: "day-1", date: dates[2], weather: "Sunny"},
		{kind: "InfoBlock", name: "day-2", date: dates[3], weather: "Sunny"},
		{kind: "InfoBlock", name: "day-3", date: dates[4], weather: "Sunny"},
		{kind: "InfoBlock", name: "day-4", date: dates[5], weather: "Sunny"},
		{kind: "InfoBlock", name: "day-5", date: dates[6], weather: "Sunny"}
	]
});

enyo.kind({
	name: "HeadlineDate",
	kind: enyo.Control,
	published: {
		date: null
	},
	components: [
		{kind: "MonthHeadlineDate", name: "monthHeadline"},
		{kind: "YearHeadlineDate", name: "yearHeadline"}
	],
	constructor: function(inArgs) {
		this.inherited(arguments);
		this.date = inArgs.date;
	},
	create: function() {
		this.inherited(arguments);
		this.dateChanged();
	},
	dateChanged: function(oldDate) {
		this.$.monthHeadline.setDate(this.date);
		this.$.yearHeadline.setDate(this.date);
	}
});

enyo.kind({
	name: "InfoBlock",
	kind: enyo.Control,
	classes: "info-block",
	published: {
		date: null,
		weather: null
	},
	components: [
		{kind: "DayInfoBlock", name: "dayInfo"},
		{kind: "DateInfoBlock", name: "dateInfo"},
		{kind: "WeatherInfoBlock", name: "weatherInfo"}
	],
	constructor: function(inArgs) {
		this.inherited(arguments);
		this.date = inArgs.date;
		this.weather = inArgs.weather;
	},
	create: function() {
		this.inherited(arguments);
		this.dateChanged();
		this.weatherChanged();
	},
	dateChanged: function(oldDate) {
		this.$.dayInfo.setDate(this.date);
		this.$.dateInfo.setDate(this.date);
	},
	weatherChanged: function(oldWeather) {
		this.$.weatherInfo.setWeather(this.weather);
	}
});

enyo.kind({
	name: "MonthHeadlineDate",
	kind: enyo.Control,
	components: [{name: "monthText"}],
	published: {
		date: null
	},
	updateDate: function() {
		var formatter = new enyo.g11n.DateFmt({format: "M"});
		this.$.monthText.content = formatter.format(this.date);
	},
	dateChanged: function(oldDate) {
		this.updateDate();
	}
});

enyo.kind({
	name: "YearHeadlineDate",
	kind: enyo.Control,
	components: [{name: "yearText"}],
	published: {
		date: null
	},
	updateDate: function() {
		var formatter = new enyo.g11n.DateFmt({format: "yyyy"});
		this.$.yearText.content = formatter.format(this.date);
	},
	dateChanged: function(oldDate) {
		this.updateDate();
	}
});

enyo.kind({
	name: "DayInfoBlock",
	kind: enyo.Control,
	classes: "day-info-block",
	components: [{name: "dayText"}],
	published: {
		date: null
	},
	updateDate: function() {
		var formatter = new enyo.g11n.DateFmt({format: "EEE"});
		this.$.dayText.content = formatter.format(this.date);
	},
	dateChanged: function(oldDate) {
		this.updateDate();
	}
});

enyo.kind({
	name: "DateInfoBlock",
	kind: enyo.Control,
	classes: "date-info-block",
	components: [{name: "dateText"}],
	published: {
		date: null
	},
	updateDate: function() {
		var formatter = new enyo.g11n.DateFmt({format: "d"});
		this.$.dateText.content = formatter.format(this.date);
	},
	dateChanged: function(oldDate) {
		this.updateDate();
	}
});

enyo.kind({
	name: "WeatherInfoBlock",
	kind: enyo.Control,
	classes: "weather-info=block",
	components: [{name: "weatherText"}],
	published: {
		weather: null
	},
	updateWeather: function() {
		this.$.weatherText.content = this.weather;
	},
	weatherChanged: function(oldWeather) {
		this.updateWeather();
	}
});
