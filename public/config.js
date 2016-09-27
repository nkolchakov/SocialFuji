SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        //setup 
        'plugin-babel': '/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '/systemjs-plugin-babel/systemjs-babel-browser.js',
        
        //files
        'main': '/scripts/main.js',
        'router': 'scripts/router.js',

        //libs
        'jquery': '/libs/jquery/dist/jquery.js',
        'navigo': '/navigo/lib/navigo.js'
        
    }
});