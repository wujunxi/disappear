var self = require("sdk/self");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
    callback(text);
}

exports.dummy = dummy;


var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        16: "./bug-16.png",
        32: "./bug-32.png",
        64: "./bug-64.png"
    },
    onClick: showPanel
});

function openLink(state) {
    tabs.open("http://www.mozilla.org");
}

var data = self.data;

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