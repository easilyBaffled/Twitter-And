function get_data(url){
    var resp;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readystate == 4){
            resp = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
    console.log("Awesome test yeah");
    return resp;
}

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
        var url = msg;
        console.log(msg);
        get_data(url);
        port.postMessage(url);
  });
});