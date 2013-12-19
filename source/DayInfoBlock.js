enyo.kind({
    name: "DayInfoBlock",
    classes: "day-info-block",
    components: [{name: "dayText"}],
    published: {
        date: null
    },
    dateChanged: function(oldDate) {
        var formatter = new enyo.g11n.DateFmt({format: "EEE"});
        this.$.dayText.setContent(formatter.format(this.date));
    }
});