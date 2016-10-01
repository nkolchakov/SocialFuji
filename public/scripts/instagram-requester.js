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
        let d = data;
        for (post of d.data) {
            post.caption.text = post.caption.text.substr(0, post.caption.text.indexOf('#'));
        }
        return d;
    }



    function getUser(username) {
        let id;
        let promise;
        getUserIdByName(username)
            .then((response) => {
                console.log(response);
                if (response.data.length <= 1) {
                    id = response.data[0].id;
                    promise = new Promise((resolve, reject) => {
                        var feed = new Instafeed({
                            get: 'user',
                            userId: id,
                            accessToken: ACCESS_TOKEN,
                            success: (data) => {
                                templateLoader.get('instagram')
                                    .then(funcTemplate => {
                                        let modifiedData = removeHashtagsFromCaption(data);
                                        console.log(modifiedData);
                                        let html = funcTemplate(modifiedData);
                                        $('#content').html(html);
                                    })
                                    // attach event to search button after template is created

                            },
                            error: () => {
                                alert('Profile is private');
                            },
                            mock: () => {

                            }
                        });
                        resolve(feed.run());
                        console.log('first');
                    })
                } else {
                    console.log('hereee');
                    promise = new Promise((resolve, reject) => {
                        templateLoader.get('instagram-profiles')
                            .then(funcTemplate => {
                                let html = funcTemplate(response);
                                $('#content').html(html);
                            })
                            .then(() => {
                                $('.redirect-to-profile').on('click', function(ev) {
                                    let anchor = $(ev.target);
                                    console.log(anchor);
                                    let username = anchor.attr('tag');
                                    // redirect to profile


                                })
                            });;
                        console.log('first');
                    });
                }
                return promise;
            })
            .then(() => {
                $('#search-tagname-btn').on('click', function() {
                    console.log('clicked');
                    let searchVal = $('#input-tagname-input').val();
                    let redirectedUrl;
                    if (searchVal.indexOf('#') >= 0) {
                        let modifiedTag = searchVal.substring(1);
                        console.log(modifiedTag);
                        redirectedUrl = '#/instagram/tag=' + modifiedTag;
                    } else {
                        searchVal = searchVal.replace(/\s+/g, '');
                        searchVal.toLowerCase();
                        redirectedUrl = '#/instagram/user=' + searchVal;
                    }
                    window.location = redirectedUrl;
                })
            });;
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
                                    searchVal = searchVal.replace(/\s+/g, '');
                                    searchVal.toLowerCase();
                                    redirectedUrl = '#/instagram/user=' + searchVal;
                                }
                                window.location = redirectedUrl;
                            })
                        });
                },
                error: () => {
                    alert('Profile is private');
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