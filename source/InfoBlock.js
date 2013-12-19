enyo.kind({
    name: "InfoBlock",
    classes: "info-block",
    published: {
        date: null,
        weather: null,
        isToday: false,
        isShowingDetails: false
    },
    components: [
        {kind: "DayInfoBlock", name: "dayInfo"},
        {kind: "DateInfoBlock", name: "dateInfo"},
        {kind: "WeatherInfoBlock", name: "weatherInfo"}
    ],
    dateChanged: function(oldDate) {
        this.$.dayInfo.setDate(this.date);
        this.$.dateInfo.setDate(this.date);
    },
    weatherChanged: function(oldWeather) {
        this.$.weatherInfo.setWeather(this.weather);
    },
    isTodayChanged: function(wasToday) {
        this.addRemoveClass("info-block-today", this.isToday);
        this.$.weatherInfo.setIsToday(this.isToday);
    },
    isShowingDetailsChanged: function(wasShowingDetails) {
        this.$.weatherInfo.setIsShowingDetails(this.isShowingDetails);
    }
});