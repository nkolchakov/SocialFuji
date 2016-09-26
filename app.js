var express = require('express')
app = express();

var listenPort = 1441

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/node_modules'));

app.listen(listenPort, function() {
    console.log('Server listen on port '+listenPort);
});

