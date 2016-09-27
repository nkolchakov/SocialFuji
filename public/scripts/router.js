import 'navigo'

const router = (function (){
    let navigo;
    
    function init(){
        navigo = new Navigo(null, false);

        navigo.on ('/index', function () {
            
        }).resolve();
        
    }

    return {
        init
    }
}());

export {router}