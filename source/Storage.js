enyo.kind({
    name: "Storage",
    kind: "enyo.Component",
    set: function(name, value) {
        localStorage.setItem(name, value);
    },
    get: function(name) {
        if (typeof name === "string") {
            return localStorage.getItem(name);
        } else {
            throw "ERROR in Storage#get: name was not a string";
        }
    },
    remove: function(name) {
        if (typeof name === "string") {
            localStorage.remove(name);
        } else {
            throw "ERROR in Storage#remove: name was not a string";
        }
    }
});