enyo.kind({
    name: "WeatherInfoOverlay",
    components: [
        {name: "overlayImage", kind: enyo.Image, classes: "weather-info-overlay-image"},
        {name: "maxTemp", classes: "weather-info-overlay-max-temp weather-info-overlay-temp"},
        {name: "minTemp", classes: "weather-info-overlay-min-temp weather-info-overlay-temp"},
        {name: "conditions"}
    ],
    published: {
        weather: null,
        isToday: null,
        isShowingDetails: false
    },
    weatherChanged: function(oldWeather) {
        if (this.weather.celsius.max) {
            this.$.maxTemp.setContent(this.weather.celsius.max + "°");
        }
        if (this.weather.celsius.min) {
            this.$.minTemp.setContent(this.weather.celsius.min + "°");
        }
        if (this.weather.conditions.full) {
            this.$.conditions.setContent(this.weather.conditions.full);
        }
    },
    isTodayChanged: function(oldIsToday) {
        this.$.overlayImage.setSrc("assets/weather-icons/overlay-" + (this.isToday ? "yellow" : "normal") + ".png");
    },
    isShowingDetailsChanged: function(wasShowingDetails) {
        this.setShowing(this.isShowingDetails);
    }
});