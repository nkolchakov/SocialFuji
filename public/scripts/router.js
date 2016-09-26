const router = (function (){
    let navigo;
    
    function init(){
        navigo = new Navigo(null, false);

        navigo.on ('/page', function () {
            alert("Navigo works");
            console.log('ok page loaded');
        }).resolve();
        navigo.on ('/test', function () {
            alert("test");
            console.log('ok test loaded');
        }).resolve();
    }

    return {
        init
    }
}());

export {router}