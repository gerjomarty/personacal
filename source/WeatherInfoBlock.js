enyo.kind({
    name: "WeatherInfoBlock",
    classes: "weather-info-block",
    components: [
        {
            name: "weatherIcon",
            classes: "weather-info-block-icon",
            kind: enyo.Image
        },
        {
            name: "infoOverlay",
            kind: "WeatherInfoOverlay",
            showing: false
        }
    ],
    published: {
        weather: null,
        isToday: false,
        isShowingDetails: false
    },
    weatherChanged: function(oldWeather) {
        this.changeWeather(this.isToday, this.weather);
    },
    isTodayChanged: function(wasToday) {
        this.changeWeather(this.isToday, this.weather);
    },
    isShowingDetailsChanged: function(wasShowingDetails) {
        this.$.infoOverlay.setIsShowingDetails(this.isShowingDetails);
    },
    changeWeather: function(isToday, weather) {
        var iconType = isToday ? "colour" : "grayscale-gray";
        var iconName = "unknown";
        if (weather.conditions.iconName) {
            iconName = weather.conditions.iconName;
        }
        this.$.weatherIcon.setSrc("assets/weather-icons/" + iconType + "/" + iconName + ".png");
        this.$.infoOverlay.setIsToday(isToday);
        this.$.infoOverlay.setWeather(weather);
    }
});