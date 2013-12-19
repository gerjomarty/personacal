enyo.kind({
    name: "CityFetcher",
    components: [
        {
            name: "service",
            kind: "enyo.WebService",
            onResponse: "gotResponse",
            onError: "gotError",
            cacheBust: false,
            jsonp: true,
            callbackName: "cb"
        }
    ],
    showing: false,
    published: {
        searchTerm: null
    },
    events: {
        onCitiesFetched: ""
    },
    getApiUrl: function() {
        return "http://autocomplete.wunderground.com/aq?query=" + this.searchTerm;
    },
    searchTermChanged: function() {
        this.$.service.setUrl(this.getApiUrl());
    },
    fetchData: function() {
        this.$.service.send({callback: "cb"});
    },
    gotResponse: function(inSender, inEvent) {
        var data = inEvent.data['RESULTS'];
        var results = [];
        for (var i = 0; i < data.length; i++) {
            var current = data[i];
            if (current.type === "city") {
                results.push({name: current.name, link: current.l, timeZone: current.tz});
            }
        }
        this.doCitiesFetched(results);
    },
    gotError: function(inSender, inEvent) {
        enyo.log(inEvent.data);
    }
});