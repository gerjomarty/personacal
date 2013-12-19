enyo.kind({
	name: "PersonaCal",
	published: {
		isShowingDetails: false
	},
	components: [
		{name: "dataFetcher", kind: DataFetcher, onDataFetched: "dataFetched"},
		{name: "settingsPopup", kind: "SettingsPopup", onSettingsCancelled: "settingsCancelled", onSettingsSubmitted: "settingsSubmitted"},
		{name: "db", kind: "Storage"},
		{name: "settingsButton", kind: "onyx.Button", content: "Settings", showing: false, classes: "settings-button", ontap: "settingsButtonTapped"},
		{name: "calendarContainer", kind: "CalendarContainer", ontap: "containerTapped"}
	],
	create: function() {
		this.inherited(arguments);
		var apiKey = this.$.db.get("apiKey");
		var link = this.$.db.get("link");
		if (typeof apiKey === "string" && typeof link === "string") {
			this.storedLocationFetched(apiKey, link);
		} else {
			this.storedLocationMissing();
		}
	},
	storedLocationFetched: function(apiKey, link) {
		this.$.dataFetcher.setWeatherApiKey(apiKey);
		this.$.dataFetcher.setLocationQuery(link);
		this.$.dataFetcher.fetchData();
	},
	storedLocationMissing: function() {
		this.$.dataFetcher.fetchBlankData();
		this.showSettings();
	},
	dataFetched: function(inSender, inEvent) {
		this.$.calendarContainer.setDataHash(inEvent);
	},
	settingsButtonTapped: function(inSender, inEvent) {
		this.showSettings();
	},
	containerTapped: function(inSender, inEvent) {
		this.setIsShowingDetails(!this.isShowingDetails);
		this.$.calendarContainer.setIsShowingDetails(this.isShowingDetails);
	},
	isShowingDetailsChanged: function(wasShowingDetails) {
		this.$.settingsButton.setShowing(this.isShowingDetails);
	},
	showSettings: function() {
		var apiKey = this.$.db.get("apiKey");
		if (typeof apiKey === "string" && apiKey.length > 0) {
			this.$.settingsPopup.setApiKey(apiKey);
		} else {
			this.$.settingsPopup.setApiKey(null);
		}
		var name = this.$.db.get("name");
		if (typeof name === "string" && name.length > 0) {
			this.$.settingsPopup.setName(name);
		} else {
			this.$.settingsPopup.setName(null);
		}
		this.$.settingsPopup.show();
	},
	settingsSubmitted: function(inSender, inEvent) {
		this.$.settingsPopup.hide();
		this.isShowingDetails = false;
		this.$.db.set("apiKey", inEvent.apiKey);
		this.$.db.set("name", inEvent.name);
		this.$.db.set("link", inEvent.link);
		this.$.db.set("timeZone", inEvent.timeZone);
		this.storedLocationFetched(inEvent.apiKey, inEvent.link);
	},
	settingsCancelled: function(inSender, inEvent) {
		this.$.settingsPopup.hide();
	},
});
