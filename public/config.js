SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './systemjs-plugin-babel/systemjs-babel-browser.js',
        
        'main': './scripts/main.js',

        'jquery': './libs/jquery/dist/jquery.js',
        'navigo': './navigo/lib/navigo.js'
        
    }
});