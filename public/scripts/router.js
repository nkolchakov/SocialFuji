const router = (function() {
    let navigo;

    function init() {
        navigo = new Navigo(null, false);

        navigo
            .on('/index', function() {
                console.log('loaded');
            })
            .on('/instagram', () => {
                var feed = new Instafeed({
                    get: 'tagged',
                    tagName: 'gaming',
                    userID: ' 3008598822',
                    accessToken: '3008598822.ba4c844.379aabfdd8214190868c0f2aa93350ab',
                    success: (data) => {
                        templateLoader.get('instagram')
                            .then(funcTemplate => {
                                let html = funcTemplate(data);
                                $('#content').html(html);
                            })
                    }


                });
                feed.run();
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