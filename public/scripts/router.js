const router = (function() {
    let navigo;

    function init() {
        navigo = new Navigo(null, false);

        navigo
            .on('/index', function() {
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
                templateLoader.get('twitter-login')
                    .then(funcTemplate => {
                        let html = funcTemplate();
                        $('#content').html(html);
                    });
            })
            .on('/twitter', () => {
                templateLoader.get('twitter')
                    .then(funcTemplate => {
                        let html = funcTemplate();
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
            .resolve();
    }

    return {
        init
    };
}());

export { router };