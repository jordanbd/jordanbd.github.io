'use strict';

define(['app/util/random'], function(random) {

    var classes = [
        //{
        //    identifier: 'default',
        //    title: 'GOD',
        //    description: 'The developer',
        //    subDescription: '',
        //    name: function() {
        //        return 'Ben';
        //    },
        //    salt: 0,
        //    money: 9999,
        //    secondsRemaining: 9999,
        //    betaChance: 0,
        //    quests: ['lucio-party', 'soldier76-glasses', 'widow-reaper-bossfight'],
        //    items: ['scrap', 'scrap', 'money-with-salt', 'account-salt-free', 'beta-bite', 'beta-bite']
        //},
        {
            identifier: 'default',
            title: 'A typical Blizzard fan',
            description: 'The Blizzard Fan has no friends at Blizzard, no connections and no hope at getting into Beta.',
            subDescription: 'Difficulty: Hard',
            name: function() {
                return random.randomArray(['BlizzFan84', 'TracerFanBoy63', 'WIN_son', 'TheCavalryIsHereLuv', 'BetaPlsBlizz', 'Soldier84', 'LuckTruckBrrrrr']);
            },
            salt: 0,
            money: 40,
            secondsRemaining: 360,
            betaChance: 0
        },
        {
            identifier: 'friend',
            title: '<span style="color:yellow">[Just for fun]</span> Your idiot friend who only signed up for beta yesterday',
            description: 'Your friend doesn\'t like Blizzard games. He still signed up for ' +
                'the Overwatch beta but doesn\'t think he will play.',
            subDescription: 'Difficulty: Very Easy <em>(this is not the real game)</em>',
            name: function() {
                return 'Mike (Loser)'
            },
            salt: 0,
            money: 'Funemployed',
            secondsRemaining: 360,
            betaChance: 1
        },
        {
            identifier: 'twitch',
            title: '<span style="color:yellow">[Just for fun]</span> A Twitch streamer',
            description: 'Didn\'t even sign up for beta, lol.',
            subDescription: 'Difficulty: Very Easy <em>(this is not the real game)</em>',
            name: function() {
                return 'SupYoFollowMe'
            },
            salt: 0,
            money: 10000,
            secondsRemaining: 360,
            betaChance: 1
        }
    ];

    function getClasses() {
        return classes;
    }

    return {
        getClasses: getClasses
    }

});