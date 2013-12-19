enyo.kind({
    name: "MonthHeadlineDate",
    classes: "month-headline-date",
    components: [{name: "monthText"}],
    published: {
        date: null
    },
    dateChanged: function(oldDate) {
        var formatter = new enyo.g11n.DateFmt({format: "M"});
        this.$.monthText.setContent(formatter.format(this.date));
    }
});