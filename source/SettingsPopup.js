enyo.kind({
    name: "SettingsPopup",
    kind: "onyx.Popup",
    style: "width: 90%; height: 90%; padding: 20px;",
    centered: true,
    modal: true,
    autoDismiss: false,
    events: {
        onSettingsCancelled: "",
        onSettingsSubmitted: ""
    },
    published: {
        apiKey: null,
        name: null,
        link: null,
        timeZone: null
    },
    components: [
        {kind: "CityFetcher", name: "cityFetcher", onCitiesFetched: "citiesFetched"},
        {content: "Please sign up for a Weather Underground API key at <a href=\"http://www.wunderground.com/weather/api/\">http://www.wunderground.com/weather/api/</a>, then enter it here", classes: "settings-text api-key-text", allowHtml: true},
        {kind: "onyx.InputDecorator", alwaysLooksFocused: true, classes: "settings-input-decorator api-key-decorator", components: [
            {kind: "onyx.Input", name: "apiKeyInput", classes: "settings-input", placeholder: "Enter Weather Underground API key", oninput: "apiKeyInputChanged"}
        ]},
        {name: "currentCity", content: "No city currently selected", classes: "settings-text city-text"},
        {kind: "onyx.InputDecorator", alwaysLooksFocused: true, classes: "settings-input-decorator city-decorator", components: [
            {kind: "onyx.Input", name: "cityInput", classes: "settings-input", placeholder: "Start typing a city, then select your location", oninput: "cityInputChanged"}
        ]},
        {kind: "enyo.List", name: "cityList", onSetupItem: "setupCity", classes: "city-list", components: [
            {classes: "city", ontap: "cityTapped", components: [
                {name: "cityName", classes: "settings-text city-name"}
            ]}
        ]},
        {kind: "enyo.Group", classes: "button-group", components: [
            {kind: "onyx.Button", name: "submitButton", classes: "submit-button onyx-affirmative", content: "Submit", disabled: true, ontap: "submitButtonTapped"},
            {kind: "onyx.Button", name: "cancelButton", classes: "cancel-button onyx-blue", content: "Cancel", ontap: "cancelButtonTapped"}
        ]},
        {content: "Weather information provided by:", classes: "source-text"},
        {kind: "enyo.Image", src: "assets/wunderground.png", classes: "source-image"}
    ],
    create: function() {
        this.inherited(arguments);
        this.cities = null;
        this.$.cityList.setCount(0);
    },
    onShow: function() {
        this.toggleSubmitButton();
    },
    apiKeyChanged: function(oldApiKey) {
        this.$.apiKeyInput.setValue(this.apiKey);
    },
    nameChanged: function(oldName) {
        if (typeof this.name === "string" && this.name.length > 0) {
            this.$.currentCity.setContent("Currently selected: " + this.name);
        } else {
            this.$.currentCity.setContent("No city currently selected");
        }
    },
    apiKeyInputChanged: function(inSender, inEvent) {
        this.setApiKey(inEvent.target.value);
        this.toggleSubmitButton();
    },
    cityInputChanged: function(inSender, inEvent) {
        if (typeof inEvent.target.value === "string" && inEvent.target.value.length > 0) {
            this.$.cityFetcher.setSearchTerm(inEvent.target.value);
            this.$.cityFetcher.fetchData();
        }
    },
    citiesFetched: function(inSender, inEvent) {
        this.cities = inEvent;
        this.$.cityList.setCount(this.cities.length);
        this.$.cityList.reset();
    },
    setupCity: function(inSender, inEvent) {
        var city = this.cities[inEvent.index];
        this.$.cityName.addRemoveClass("selected", this.$.cityList.isSelected(inEvent.index));
        this.$.cityName.setContent(city.name);
    },
    cityTapped: function(inSender, inEvent) {
        var city = this.cities[inEvent.index];
        this.setName(city.name);
        this.setLink(city.link);
        this.setTimeZone(city.timeZone);
        this.$.cityList.select(inEvent.index, {});
        this.$.cityList.renderRow(inEvent.index);
        this.toggleSubmitButton();
    },
    toggleSubmitButton: function() {
        if (typeof this.apiKey === "string" && this.apiKey.length > 0) {
            var selected = this.$.cityList.getSelection().getSelected();
            for (var i in selected) {
                // If anything is inside selected, there is a selection
                this.$.submitButton.setDisabled(false);
                return;
            }
        }
        this.$.submitButton.setDisabled(true);
    },
    submitButtonTapped: function(inSender, inEvent) {
        this.$.submitButton.removeClass("active");
        this.doSettingsSubmitted({apiKey: this.apiKey, name: this.name, link: this.link, timeZone: this.timeZone});
        this.$.cityInput.setValue("");
        this.cities = null;
        this.$.cityList.setCount(0);
    },
    cancelButtonTapped: function(inSender, inEvent) {
        this.$.cancelButton.removeClass("active");
        this.doSettingsCancelled();
        this.$.cityInput.setValue("");
        this.cities = null;
        this.$.cityList.setCount(0);
    }
});