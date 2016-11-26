const twitterController = (function() {
    function getPosts() {
        let loadData = new Promise((resolve, reject) => {
            $.getJSON('api/twits')
                .done(resolve)
                .fail(reject);
        });

        Promise.all([
                loadData,
                templateLoader.get('twitter')
            ])
            .then((response) => {
                let data = {},
                    twits = response[0].result,
                    template = response[1];

                data.twits = twits;
                let html = template(data);
                $('#content').html(html);
            })
            .then(() => { setBtnsEvent(); });
    }

    function post(text) {

        let post = new Promise((resolve, reject) => {
            $.ajax({
                url: 'api/post',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    content: text
                }),
                success: function(responese) {
                    resolve();
                },
                error: function(err) {
                    resolve();
                }
            });
        });
        post
            .then(() => {
                alert(`You post "${text}"in Twitter`);
            });
    }

    function search(text) {

        let search = new Promise((resolve, reject) => {
            $.ajax({
                url: 'api/search',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    query: text
                }),
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    resolve();
                }
            });
        });

        Promise.all([
                search,
                templateLoader.get('twitter')
            ])
            .then((response) => {
                let data = {},
                    twits = response[0].result,
                    template = response[1];

                data.twits = twits;
                let html = template(data);
                $('#content').html(html);
            })
            .then(() => { setBtnsEvent(); });
    }

    function login() {
        $.getJSON('api/sign')
            .done((requestToken) => {
                window.location = "https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken.result;
            })
            .fail();
    }


    function authenticate() {
        let oauth_verifier = location.href.split('verifier=')[1];
        console.log(location.href);

        let verify = new Promise((resolve, reject) => {
            $.ajax({
                url: 'api/authorization',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    verifier: oauth_verifier
                }),
                success: function(responese) {
                    resolve();
                },
                error: function(err) {
                    resolve();
                }
            });
        });

        verify
            .then(() => {
                window.location.href = 'http://localhost:1441#/twitter';
            });
    }

    function setBtnsEvent() {
        $('#search-btn').on('click', function() {
            let query = $('#search-input').val();
            location.href = 'http://localhost:1441/?#/twitter-search/q=' + query;
        });

        $('#post-btn').on('click', function() {
            let post = $('#post-input').val();
            $('#post-input').val('');
            location.href = 'http://localhost:1441/?#/twitter-search/p=' + post;
        });
    }


    return {
        getPosts,
        post,
        search,
        login,
        authenticate
    }
}());

export { twitterController };