var microsecondsPerDay = 1000 * 60 * 60 * 24;
var OneDayAgo = (new Date).getTime() - microsecondsPerDay;
var numRequestsOutstanding = 0;
var history = {};
var keys = [];


chrome.history.search({
    'text': '', // Return every history item....
    'startTime': OneDayAgo // that was accessed less than one week ago.
}, function(data) {
    for (var i = 0; i < data.length; i++) {
        var url = data[i].url;
        var visitCount = data[i].visitCount;
        history[url] = visitCount;
        keys.push(url);
    }
});

keys.sort(compare);
function compare(a, b) {
    var historyA = history[a];
    var historyB = history[b];
    return historyB - historyA;
}


chrome.browserAction.onClicked.addListener(function() {
 for(var i = 0; i < 5; i++) {
    chrome.tabs.create({
            selected: true,
            url: keys[i]
        });
      }
});
