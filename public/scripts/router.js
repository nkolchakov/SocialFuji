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
            .on('/twitter', () => {
                // templateLoader.get('twitter')
                //     .then(funcTemplate => {
                //         let html = funcTemplate();
                //         $('#content').html(html);
                //     });
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