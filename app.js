let express = require('express')
app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let Twitter = require('./utils/twitter-requester');

let listenPort = 1441;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + ''));

app.get('/api/sign', function(req, res) {
    Twitter.signIn()
        .then((requestToken) => {
            res.json({
                result: requestToken
            });
        });
});

app.post('/api/authorization', function(req, res) {
    Twitter.authorization(req.body.verifier)
        .then(() => {
            res.json({
                result: 'ready'
            });
        });
});

app.get('/api/twits', function(req, res) {
    Twitter.getPosts()
        .then(function(posts) {
            if (!posts || !posts.length) {
                res.status(404)
                    .json({
                        err: 'Twits not found'
                    });
                return;
            }
            res.json({
                result: posts
            });
            return;
        });
});

app.post('/api/search', function(req, res) {
    Twitter.search(req.body.query)
        .then((data) => {
            res.json({
                result: data
            });
        });
});

app.post('/api/post', function(req, res) {
    Twitter.post(req.body.content)
        .then(() => {
            res.json({
                result: 'ready'
            });
        });
});

app.listen(listenPort, function() {
    console.log('Server listen on port ' + listenPort);
});