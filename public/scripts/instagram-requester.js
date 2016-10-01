var instaReq = (function() {
    const ACCESS_TOKEN = '3008598822.ba4c844.379aabfdd8214190868c0f2aa93350ab';
    const USER_ID = '3008598822'

    function getUserIdByName(username) {
        let url = `https://api.instagram.com/v1/users/search?q=${username}&access_token=` + ACCESS_TOKEN;
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: (response) => {
                    resolve(response);
                }
            });
        });
        return promise;
    }

    function removeHashtagsFromCaption(data) {
        for (post of data.data) {
            post.caption.text = post.caption.text.substr(0, post.caption.text.indexOf('#'));
        }

        return data;

    }

    function getUser(username) {
        let id;
        getUserIdByName(username)
            .then(response => {
                id = response.data[0].id;
            })
            .then(() => {
                let promise = new Promise((resolve, reject) => {
                    var feed = new Instafeed({
                        get: 'user',
                        userId: id,
                        accessToken: ACCESS_TOKEN,
                        success: (data) => {
                            templateLoader.get('instagram')
                                .then(funcTemplate => {
                                    console.log(data);
                                    data = removeHashtagsFromCaption(data);
                                    let html = funcTemplate(data);
                                    $('#content').html(html);
                                })
                                // attach event to search button after template is created
                                .then(() => {
                                    $('#search-tagname-btn').on('click', function() {
                                        let searchVal = $('#input-tagname-input').val();
                                        let redirectedUrl;
                                        if (searchVal.indexOf('#') >= 0) {
                                            let modifiedTag = searchVal.substring(1);
                                            console.log(modifiedTag);
                                            redirectedUrl = '#/instagram/tag=' + modifiedTag;
                                        } else {
                                            redirectedUrl = '#/instagram/user=' + searchVal;
                                        }
                                        window.location.href = redirectedUrl;
                                    })
                                });
                        },
                        mock: () => {

                        }
                    });
                    resolve(feed.run());
                })
                return promise;
            });
    }

    function getTag(tagName) {
        let promise = new Promise((resolve, reject) => {
            var feed = new Instafeed({
                get: 'tagged',
                tagName: tagName,
                userID: USER_ID,
                accessToken: ACCESS_TOKEN,
                success: (data) => {
                    templateLoader.get('instagram')
                        .then(funcTemplate => {
                            data = removeHashtagsFromCaption(data);
                            let html = funcTemplate(data);
                            $('#content').html(html);
                        })
                        // attach event to search button after template is created
                        .then(() => {
                            $('#search-tagname-btn').on('click', function() {
                                let searchVal = $('#input-tagname-input').val();
                                let redirectedUrl;
                                if (searchVal.indexOf('#') >= 0) {
                                    let modifiedTag = searchVal.substring(1);
                                    redirectedUrl = '#/instagram/tag=' + modifiedTag;
                                } else {
                                    redirectedUrl = '#/instagram/user=' + searchVal;
                                }
                                window.location.href = redirectedUrl;
                            })
                        });
                },
                mock: () => {

                }
            });
            resolve(feed.run());
        });

        return promise;
    }

    return {
        getTag,
        getUser
    }
})();