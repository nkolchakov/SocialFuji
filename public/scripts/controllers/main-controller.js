const mainController = (function() {
    function getHome() {
        templateLoader.get('home')
            .then(funcTemplate => {
                let html = funcTemplate();
                $('#content').html(html);
            });
    }

    return {
        getHome
    }
}());

export { mainController }