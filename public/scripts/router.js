const router = (function (){
    let navigo;
    
    function init(){
        navigo = new Navigo(null, false);

        navigo.on ('/index', function () {
            console.log('loaded');
        }).resolve();
        
    }

    return {
        init
    }
}());

export {router}