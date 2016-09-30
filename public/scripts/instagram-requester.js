var instaReq = (function() {

    function getTag(tagName) {
        let promise = new Promise((resolve, reject) => {
            var feed = new Instafeed({
                get: 'tagged',
                tagName: tagName,
                userID: ' 3008598822',
                accessToken: '3008598822.ba4c844.379aabfdd8214190868c0f2aa93350ab',
                success: (data) => {
                    console.log('1');
                    templateLoader.get('instagram')
                        .then(funcTemplate => {
                            let html = funcTemplate(data);
                            $('#content').html(html);
                        })
                },
                mock: () => {

                },
                after: () => {
                    console.log($('#search-tagname-btn').html());
                    $('#search-tagname-btn').on('click', function() {
                        let tag = $('#input-tagname-input').val();
                        window.location = 'asd';
                    });
                    console.log('ready');
                }
            })
            resolve(feed.run());
        });

        return promise;
    }

    return {
        getTag
    }
})();