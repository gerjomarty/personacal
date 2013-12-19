enyo.kind({
    name: "CalendarContainer",
    classes: "calendar-container",
    published: {
        dataHash: null,
        isShowingDetails: false
    },
    components: [
        {kind: "TodayBackground"},
        {kind: "HeadlineDate", name: "headlineDate"},
        {kind: "InfoBlock", name: "dayY"},
        {kind: "InfoBlock", name: "day0"},
        {kind: "InfoBlock", name: "day1"},
        {kind: "InfoBlock", name: "day2"},
        {kind: "InfoBlock", name: "day3"},
        {kind: "InfoBlock", name: "day4"},
        {kind: "InfoBlock", name: "day5"}
    ],
    dataHashChanged: function(oldDataHash) {
        var dates = this.dataHash.dates;
        var weather = this.dataHash.weather;

        this.$.headlineDate.setDate(dates[1]);

        var blocks = [this.$.dayY, this.$.day0, this.$.day1, this.$.day2, this.$.day3, this.$.day4, this.$.day5];
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].setDate(dates[i]);
            blocks[i].setWeather(weather && weather[i]);
            if (i == 1) { blocks[i].setIsToday(true); }
        }
    },
    isShowingDetailsChanged: function(wasShowingDetails) {
        var blocks = [this.$.dayY, this.$.day0, this.$.day1, this.$.day2, this.$.day3, this.$.day4, this.$.day5];
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].setIsShowingDetails(this.isShowingDetails);
        }
    }
});