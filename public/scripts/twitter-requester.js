let Twitter = (function () {
    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
    };

    var Twitter = require('twitter-node-client').Twitter;

    var twitter = new Twitter({
        "consumerKey": "w1oegEZoRGuBir3tjSw7LdqEy",
        "consumerSecret": "uVMwkPmmJcczE2beh3oaESfk6P9ESwfCBcSb0LXieKQhsh71x6",
        "callBackUrl": "http://localhost:1441"
    });

    let oauth = {};

    function signIn() {
        let promise = new Promise((resolve, reject) => {
            twitter.getOAuthRequestToken(function (obj) {
                oauth.token = obj.token;
                oauth.token_secret = obj.token_secret;
                resolve(obj.token);
            });
        });

        return promise;
    }

    function authorization(oauth_verifier) {
        oauth.verifier = oauth_verifier;

        let promise = new Promise((resolve, reject) => {
            twitter.getOAuthAccessToken(oauth, function (data) {
                twitter.accessToken = data.access_token;
                twitter.accessTokenSecret = data.access_token_secret;
                resolve();
            });
        });

        return promise;
    }

    function getPosts() {
        let params = {
            count: 20
        };
        let promise = new Promise((resolve, reject) => {
            twitter.getHomeTimeline
                (params,
                function (err) { },
                function success(data) {
                    data = JSON.parse(data);
                    let posts = [];
                    for (let post of data) {
                        let currentPost = {},
                            content = post.text.split('https'),
                            date = post.created_at;

                        currentPost.author = post.user.name;
                        currentPost.authorImage = post.user.profile_image_url;
                        currentPost.text = content[0].trim();
                        currentPost.url = 'https' + content[1];
                        currentPost.image = post.entities.media ? post.entities.media[0].media_url : undefined;
                        currentPost.date = date.substr(11, 5) + '    ' + date.substr(0, 8) + date.substr(date.length - 4, 4);

                        posts.push(currentPost);
                    }
                    resolve(posts);
                });
        });
        return promise;
    }

    function search(query) {
        let params = {
            q: query,
            count: 20,
            'result\_type': 'popular'
        };
        let promise = new Promise((resolve, reject) => {
            twitter.getSearch(params, () => { }, function (data) {
                data = JSON.parse(data);
                let posts = [];
                for (let post of data.statuses) {
                    let currentPost = {},
                        content = post.text.split('https');

                    currentPost.author = post.user.name;
                    currentPost.authorImage = post.user.profile_image_url;
                    currentPost.text = content[0].trim();
                    currentPost.url = 'https' + content[1];
                    currentPost.image = post.entities.media ? post.entities.media[0].media_url : undefined;
                    currentPost.date = post.created_at;

                    posts.push(currentPost);
                }
                resolve(posts);
            });
        });

        return promise;
    }

    function post(text) {
        let params = {
            status: text
        };

        let promise = new Promise((resolve, reject) => {
            twitter.postTweet(params, () => { }, function (response) {
                resolve(response);
            });
        });

        return promise;
    }

    return {
        getPosts,
        post,
        signIn,
        authorization,
        search
    };
})();

module.exports = {
    signIn: Twitter.signIn,
    authorization: Twitter.authorization,
    getPosts: Twitter.getPosts,
    post: Twitter.post,
    search: Twitter.search
};