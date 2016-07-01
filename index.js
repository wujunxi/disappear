var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var data = self.data;

var button = buttons.ActionButton({
    id: "QZone-link",
    label: "Visit QZone",
    icon: {
        16: "./bug-16.png",
        32: "./bug-32.png",
        64: "./bug-64.png"
    },
    onClick: openLink
});

function openLink(state) {
    tabs.open("http://user.qzone.qq.com/347348453");
}


var text_entry = require("sdk/panel").Panel({
    contentURL: data.url("text-entry.html"),
    contentScriptFile: data.url("get-text.js")
});

function showPanel() {
    text_entry.show();
}

text_entry.on("show", function () {
    text_entry.port.emit("show");
});

text_entry.port.on("text-entered", function (text) {
    console.log(text);
    text_entry.hide();
});

tabs.on("ready", function (tab) {
    console.log(tab.url);
    tab.attach({
        contentScriptFile: [data.url("jquery-3.0.0.min.js"), data.url("clear-ad.js")]
    });
});