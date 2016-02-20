'use strict';

define(['app/player'], function(player) {

    var events = [
        /* 0. Opening event - beta wave starting */
        {
            id: 'event.game.start',
            isAvailable: function() {
                return !player.data.events[this.id]
            },
            onRun: function() {
                player.data.events[this.id] = true;
            },
            type: 'twitter',
            text: [
                'A new beta wave is starting!'
            ]
        },
        /* 1. Reddit post - are keys going out? */
        {
            id: 'event.reddit.new.keys?',
            isAvailable: function() {
                return !player.data.events[this.id]
                    && player.data.events['event.game.start'];
            },
            onRun: function() {
                player.data.events[this.id] = true;
            },
            type: 'reddit',
            text: [
                {
                    postId: 'newKeys',
                    title: 'Just got invited?',
                    body: 'Hey guys check your accounts I just got invited a minute ago!'
                }
            ]
        },
        /* 2. Remind player of their saltiness at start of game */
        {
            id: 'event.salt.start.reminder',
            isAvailable: function() {
                return !player.data.events[this.id];
            },
            onRun: function() {
                player.data.events[this.id] = true;
            },
            type: 'notify',
            text: [
                'You are currently $salty. Don\'t let your salt levels get too high or you might do something silly...'
            ]
        },
        /* 3. Idiots post top level "FUCK" chain */
        {
            id: 'event.fuck.chain',
            isAvailable: function() {
                return player.data.events['event.reddit.new.keys?'] // new keys post has been made
                    && (!player.data.events[this.id] || Math.floor(Math.random()*5) == 1); // 20% chance of posting reply, 100% chance if no fuck chain exists
            },
            onRun: function() {
                player.data.events[this.id] = true;
            },
            type: 'reddit-reply',
            replyClass: 'fuckChain',
            text: [
                {
                    replyTo: 'newKeys',
                    body: 'FUCK!'
                },
                {
                    replyTo: 'newKeys',
                    body: 'fuck.'
                },
                {
                    replyTo: 'newKeys',
                    body: 'truck'
                },
                {
                    replyTo: 'newKeys',
                    body: 'CUNT'
                },
                {
                    replyTo: 'newKeys',
                    body: 'fuuUUUkkkk'
                }
            ]
        }
        ///* 4. Anger at fuck chain */
        //{
        //    id: 'event.fuck.chain.anger',
        //    isAvailable: function() {
        //        return player.data.events['event.fuck.chain'] && Math.floor(Math.random()*5) == 1;
        //    },
        //    type: 'reddit-reply',
        //    text: [
        //        {
        //            replyTo:/* FIXME have to be able to reply to class of replies */
        //        }
        //    ]
        //}
    ];

    function getNextEvent() {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event.isAvailable()) {
                return event;
            }
        }
        return null;
    }

    function getEvent(i) {
        return events[i];
    }

    return {
        getNextEvent: getNextEvent,
        getEvent: getEvent
    }

});