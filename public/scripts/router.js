import { twitterController } from 'twitterController';
import { instagramController } from 'instagramController';
import { mainController } from 'mainController';

const router = (function() {
    let navigo;

    function init() {
        navigo = new Navigo(null, false);

        navigo
            .on('/index', () => {
                mainController.getHome();
            })
            .on('/instagram/tag=:tag', (params) => {
                instagramController.getTag(params.tag)
                window.scroll(0, 100);
            })
            .on('/instagram/user=:user', (params) => {
                instagramController.getUser(params.user);
            })
            .on('/instagram', () => {
                // home page of instagram, show #welcome posts
                instagramController.getTag('welcome');
            })
            .on('/facebook', () => {
                //TODO
            })
            .on('/facebook-login', () => {
                //TODO
            })
            .on('/twitter-login', () => {
                twitterController.login();
            })
            .on('/twitter-search/q=:query', (params) => {
                twitterController.search(params.query);
            })
            .on('/twitter-search/p=:post', (params) => {
                twitterController.post(params.post)
            })
            .on(/twitter/, () => {
                twitterController.getPosts();
            })
            .on(/oauth/, () => {
                twitterController.authenticate()
            })
            .on('/about', () => {
                window.location = "#/index";
            })
            .on('register', () => {
                //TODO
            })
            .on('login', () => {
                //TODO
            })
            .on('/logout', () => {
                //TODO
            })
            .on('', function() {
                navigo.navigate('#/index');
            })
            .resolve();
    }

    return {
        init
    };
}());

export { router };