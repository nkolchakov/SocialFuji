SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        //setup 
        'plugin-babel': '/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '/systemjs-plugin-babel/systemjs-babel-browser.js',

        //files
        'main': '/scripts/main.js',
        'router': 'scripts/router.js',
        'mainController': 'scripts/controllers/main-controller.js',
        'twitterController': 'scripts/controllers/twitter-controller.js',
        'instagramController': 'scripts/controllers/instagram-controller.js',

        //libs
        'jquery': '/libs/jquery/dist/jquery.js',
        'handlebars': '/handlebars/dist/handlebars.js',
        'bootstrap': '/libs/bootstrap/dist/js/bootstrap.js',
        'fb': 'https://connect.facebook.net/en_US/sdk.js'
    }
});