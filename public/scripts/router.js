const router = (function() {
    let navigo;

    function init() {
        navigo = new Navigo(null, true);

        navigo
            .on('/index', function() {
                console.log('loaded');
            })
            .on('/instagram/:tagSearch', (params) => {
                console.log(params.tagSearch);
                instaReq.getTag(params.tagSearch)
            })
            .on('/instagram', () => {
                instaReq.getTag('instagram');

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