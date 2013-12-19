enyo.kind({
    name: "HeadlineDate",
    published: {
        date: null
    },
    components: [
        {kind: "MonthHeadlineDate", name: "monthHeadline"},
        {kind: "YearHeadlineDate", name: "yearHeadline"}
    ],
    dateChanged: function(oldDate) {
        this.$.monthHeadline.setDate(this.date);
        this.$.yearHeadline.setDate(this.date);
    }
});