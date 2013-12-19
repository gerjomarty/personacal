enyo.kind({
    name: "YearHeadlineDate",
    classes: "year-headline-date",
    components: [{name: "yearText"}],
    published: {
        date: null
    },
    dateChanged: function(oldDate) {
        var formatter = new enyo.g11n.DateFmt({format: "yyyy"});
        this.$.yearText.setContent(formatter.format(this.date));
    }
});