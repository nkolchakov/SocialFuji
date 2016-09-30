const router = (function () {
    let navigo;

    function init() {
        navigo = new Navigo(null, true);

        navigo
            .on('/index', function () {
                console.log('loaded');
            })
            .on('#/facebook-login', () => {

            })
            .on('#/twitter-login', () => {

            })
            .on('#/instagram-login', () => {

            })
            .on('#/about', () => {

            })
            .on('#/logout', () => {

            })
            .resolve();
    }

    return {
        init
    }
} ());

export {router}