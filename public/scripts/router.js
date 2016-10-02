const router = (function () {
    let navigo;

    function init() {
        navigo = new Navigo(null, false);

        navigo
            .on('/index', function () {
                templateLoader.get('home')
                    .then(funcTemplate => {
                        let html = funcTemplate();
                        $('#content').html(html);
                    });
                console.log('loaded');
            })
            .on('/instagram/tag=:tag', (params) => {
                instaReq.getTag(params.tag)
                window.scroll(0, 100);
            })
            .on('/instagram/user=:user', (params) => {
                instaReq.getUser(params.user);
            })
            .on('/instagram', () => {
                // home page of instagram, show #welcome posts
                instaReq.getTag('welcome');

            })
            .on('/facebook', () => {
                templateLoader.get('facebook')
                    .then(funcTemplate => {
                        let html = funcTemplate();
                        $('#content').html(html);
                    });
            })
            .on('/facebook-login', () => {
                templateLoader.get('facebook-login')
                    .then(funcTemplate => {
                        let html = funcTemplate();
                        $('#content').html(html);
                    });
            })
            .on('/twitter-login', () => {
                $.getJSON('api/sign')
                    .done((requestToken) => {
                        window.location = "https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken.result;
                    })
                    .fail();
            })
            .on('/twitter-search', () => {
                let text = 'Obama';
                let value = $('#twitters').val();
                console.log(value);

                let search = new Promise((resolve, reject) => {
                    $.ajax({
                        url: 'api/search',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            query: text
                        }),
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (err) {
                            resolve();
                        }
                    });
                });

                Promise.all([
                    search,
                    templateLoader.get('twitter')
                ]).then((response) => {
                    let data = {},
                        twits = response[0].result,
                        template = response[1];

                    data.twits = twits;
                    let html = template(data);
                    $('#content').html(html);
                });
            })
            .on('/twitter-post', () => {

                let post = new Promise((resolve, reject) => {
                    //let text = ('#VALUECONTAINER').val();
                    let text = 'Post from nodejs';

                    $.ajax({
                        url: 'api/post',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            content: text
                        }),
                        success: function (responese) {
                            resolve();
                        },
                        error: function (err) {
                            resolve();
                        }
                    });
                });
                post
                    .then(() => {
                        alert(`You post in Twitter`);
                    });
            })
            .on('/twitter', () => {
                let loadData = new Promise((resolve, reject) => {
                    $.getJSON('api/twits')
                        .done(resolve)
                        .fail(reject);
                });

                Promise.all([
                    loadData,
                    templateLoader.get('twitter')
                ]).then((response) => {
                    let data = {},
                        twits = response[0].result,
                        template = response[1];

                    data.twits = twits;
                    console.log(data);
                    let html = template(data);
                    $('#content').html(html);
                });
            })
            // .on('/instagram-login', () => {

            // })
            .on('/about', () => {
                window.location = "#/index";
            })
            .on('/logout', () => {

            })
            .on(/oauth/, () => {
                let oauth_verifier = location.href.split('verifier=')[1];

                let verify = new Promise((resolve, reject) => {
                    $.ajax({
                        url: 'api/authorization',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            verifier: oauth_verifier
                        }),
                        success: function (responese) {
                            resolve();
                        },
                        error: function (err) {
                            resolve();
                        }
                    });
                });

                verify
                    .then(() => {
                        navigo.navigate('/twitter');
                    });
            })
            .resolve();
    }

    return {
        init
    };
} ());

export { router };