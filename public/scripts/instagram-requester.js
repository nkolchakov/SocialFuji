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

    function getComments(mediaId) {
        let url = `https://api.instagram.com/v1/media/${mediaId}/comments?access_token=` + ACCESS_TOKEN;

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

    // search for a specific user from ones with similiar name
    function getUniqueUserFromAll(username, response) {
        for (user of response.data) {
            if (user.username === username) {
                return user.id;
            }
        }
    }

    function removeHashtagsFromCaption(data) {
        let modifiedData = data;
        for (post of modifiedData.data) {
            if (!post.caption) {
                continue;
            }
            post.caption.text = post.caption.text.substr(0, post.caption.text.indexOf('#'));
        }
        return modifiedData;
    }

    function makeUserFeedByID(userId) {
        var feed = new Instafeed({
            get: 'user',
            userId: userId,
            accessToken: ACCESS_TOKEN,
            success: (data) => {
                templateLoader.get('instagram')
                    .then(funcTemplate => {
                        let modifiedData = removeHashtagsFromCaption(data);
                        let html = funcTemplate(modifiedData);
                        $('#content').html(html);
                    })
            },
            error: () => {
                alert('Profile is private');
            },
            mock: () => {

            }
        });
        feed.run();
    }

    function getUser(username) {
        let id;
        let promise;
        getUserIdByName(username)
            .then((response) => {
                if (response.data.length <= 1) {
                    id = response.data[0].id;
                    promise = new Promise((resolve, reject) => {
                        makeUserFeedByID(id);
                        resolve();
                    })
                } else {
                    promise = new Promise((resolve, reject) => {
                        templateLoader.get('instagram-profiles')
                            .then(funcTemplate => {
                                let html = funcTemplate(response);
                                $('#content').html(html);
                                resolve();
                            })
                            // on profiles click redirect to chosen profile if it's not private
                            .then(() => {
                                $('.redirect-to-profile').on('click', function(ev) {
                                    let anchor = $(ev.target);
                                    let username = anchor.attr('tag');
                                    getUserIdByName(username)
                                        .then((response) => {
                                            let userId = getUniqueUserFromAll(username, response);
                                            // make request and load template
                                            makeUserFeedByID(userId);
                                        });
                                });
                            });
                    });
                }
                return promise;
            })
            .then(() => {
                $('#search-tagname-btn').on('click', function() {
                    let searchVal = $('#input-tagname-input').val();
                    let redirectedUrl;
                    if (searchVal.indexOf('#') >= 0) {
                        // remove the #hashtag from the search and add it to the url
                        let modifiedTag = searchVal.substring(1);
                        redirectedUrl = '#/instagram/tag=' + modifiedTag;
                    } else {
                        // remove spaces from search, so it can be added to the url
                        searchVal = searchVal.replace(/\s+/g, '');
                        searchVal.toLowerCase();
                        redirectedUrl = '#/instagram/user=' + searchVal;
                    }
                    window.location = redirectedUrl;
                })
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
                                    searchVal = searchVal.replace(/\s+/g, '');
                                    searchVal.toLowerCase();
                                    redirectedUrl = '#/instagram/user=' + searchVal;

                                }
                                window.location = redirectedUrl;
                            });

                            $('.show-comments-btn').on('click', function(ev) {
                                let $element = $(ev.target);
                                let mediaId = $element.attr('id');
                                getComments(mediaId)
                                    .then((comments) => {
                                        (function() {
                                            $('#comments-container').html('');
                                            // add here
                                            if (comments.data.length < 1) {
                                                //$element.parent().append('<div> no comments yet</div>');
                                                $('#comment-' + mediaId).html('<div> no comments yet</div>');
                                            } else {
                                                let commentsHtml = templateLoader.get('instagram-comments')
                                                    .then(funcTemplate => {
                                                        let html = funcTemplate(comments);
                                                        $('#comment-' + mediaId).html(html);
                                                    })
                                            }

                                        })();
                                    })
                            });
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