enyo.kind({
    name: "DateInfoBlock",
    classes: "date-info-block",
    components: [{name: "dateText"}],
    published: {
        date: null
    },
    dateChanged: function(oldDate) {
        var formatter = new enyo.g11n.DateFmt({format: "d"});
        this.$.dateText.setContent(formatter.format(this.date));
    }
});