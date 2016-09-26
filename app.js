var express = require('express')
app = express();

var listenPort = 1441

app.use(express.static(__dirname+'/public'));

app.listen(listenPort, function() {
    console.log('Server listen on port '+listenPort);
});