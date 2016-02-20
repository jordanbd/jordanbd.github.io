'use strict';

define(['jquery', 'underscore'], function($, _) {

    var impl;

    var test = {
        debug: function() {
            console.debug.apply(console, arguments);
        },
        logEvent: function(event) {
            var msg = event.text[0];
            console.info.apply(console, [msg]);
        }
    };

    function randInt(i) {
        return Math.floor(Math.random()*i);
    }

    function ui() {

        var $canvas = $('#canvas');
        var $log = $('<div/>')
            .attr('id', 'logger')
            .appendTo($canvas);

        var _redditEvent = _.template(
            '<div id="<%= id %>" class="event-reddit">' +
                '<span class="event-reddit-title"><%= title %></span>' +
                '<span class="event-reddit-body"><%= body %></span>' +
                '<div class="event-reddit-replies"></div>' +
            '</div>');

        var _redditReply = _.template(
            '<div>' +
                '<span><%= body %></span>' +
            '</div>'
        );

        return {
            debug: function() {
                console.debug.apply(console, arguments);
            },
            logEvent: function(event) {

                if (event.text instanceof Array) {
                    var text = event.text[randInt(event.text.length)];
                    if (typeof text === 'string') {
                        var $ele = $('<div/>');
                        $ele.text(event.text);
                        $log.prepend($ele);
                    } else {

                        var o = text;

                        if (event.type == 'reddit') {
                            var $ele = $(_redditEvent({
                                id: 'reddit_' + o.postId,
                                title: o.title,
                                body: o.body
                            }));
                            $log.prepend($ele);
                        } else if (event.type == 'reddit-reply') {

                            console.debug('adding reddit-reply: %O', o);

                            // find parent comment
                            var $parent = $('#reddit_' + o.replyTo);

                            if ($parent.length > 0) {

                                // build reply
                                var $ele = $(_redditReply({
                                    body: o.body
                                }));

                                // how many replies so far?
                                var $replies = $('.event-reddit-replies', $parent);
                                if ($replies.children().length == 0) {
                                    console.debug('creating first level reply');
                                    $replies.append($ele); // create the first reply
                                } else {
                                    console.debug('creating random level reply');
                                    // 50% chance of adding another first-level reply
                                    // 50% chance of replying to another random reply
                                    if (randInt(2) == 1) {
                                        $replies.append($ele); // first level reply
                                    } else {
                                        var $children = $replies.children();
                                        var $child = $($children[randInt($children.length)]); // make sure we recast to jquery obj
                                        $child.append($ele);
                                    }
                                }


                                // 3. move to top of log
                                $log.prepend($parent);
                            }

                        }

                    }
                } else if (typeof event.text === 'string') {
                    var $ele = $('<div/>');
                    $ele.text(event.text);
                    $log.prepend($ele);
                }

            }
        }

    }

    impl = ui();

    return {
        test: impl.test,
        debug: impl.debug,
        logEvent: impl.logEvent
    };

});