const router = (function() {
    let navigo;

    function init() {
        navigo = new Navigo(null, true);

        navigo
            .on('/index', function() {
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

            })
            .on('/twitter-login', () => {

            })
            .on('/instagram-login', () => {

            })
            .on('/about', () => {

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