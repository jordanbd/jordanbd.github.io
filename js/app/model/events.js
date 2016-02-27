'use strict';

define(['app/model/player'], function(player) {

    var events = [
        /* Blizzard posts */
        {
            chance: 1,
            isAvailable: function() {
                return !player.data['event-welcome'];
            },
            apply: function() {
                player.data['event-welcome'] = true;
            },
            type: 'twitter',
            flavourText: [
                '$$CM posts on Twitter, "We are starting a new beta wave for Overwatch! Check your Battle.net accounts to see ' +
                'if you were accepted."'
            ]
        },
        //{
        //    chance: 1,
        //    isAvailable: function() {
        //        return player.secondsRemaining < 180 && !player.data['event-blizz2'];
        //    },
        //    apply: function() {
        //        player.data['event-blizz2'] = true;
        //    },
        //    type: 'twitter',
        //    flavourText: [
        //        // FIXME
        //    ]
        //},
        /* Warning about slender */
        {
            chance: 1,
            isAvailable: function() {
                return player.data['slender-spotted'] && !player.data['slender-warning'];
            },
            apply: function() {
                player.data['slender-warning'] = true;
            },
            type: 'twitter',
            flavourText: [
                {
                    user: 'Alex',
                    text: player.name + '! CHECK YOUR EMAIL!! YOU ARE IN DANGER.'
                }
            ]
        },
        /* Reddit spammer */
        {
            chance: 1,
            isAvailable: function() {
                return player.data['reddit-spammer-started'];
            },
            type: 'reddit',
            flavourText: [
                {
                    user: 'The spammer',
                    text: '-( ͡° ͜ʖ ͡°)╯╲___卐卐卐卐 Don\'t mind me just taking my mods for a walk'
                },
                {
                    user: 'The spammer',
                    text: 'ヽ༼ຈل͜ຈ༽ﾉ raise your dongers ヽ༼ຈل͜ຈ༽ﾉ'
                },
                {
                    user: 'The spammer',
                    text: 'GIVE BETA GIVE BETA GIVE BETA GIVE BETA GIVE BETA'
                },
                {
                    user: 'The spammer',
                    text: 'BLIZZ SUCKSSSSS GIVE BETA'
                },
                {
                    user: 'The spammer',
                    text: 'DAE DED GAME?'
                },
                {
                    user: 'The spammer',
                    text: 'MODS ARE ASLEEP POST PICTURES OF TF2 LOLxd'
                }
            ]
        },
        /* Reddit salty posts */
        {
            chance: 0.4,
            type: 'reddit',
            flavourText: [
                {
                    user: 'Random_Kaos',
                    text: 'Great to see that OnlyWatch is back.'
                },
                {
                    user: 'Zyrish',
                    text: 'If you switch between Hearthstone and Overwatch really fast, it\'s almost like you have a play button...I live a sad life.'
                },
                {
                    user: 'LLoKKo',
                    text: 'SALT RAINS FROM ABOVE!'
                },
                {
                    user: 'kalamies0',
                    text: 'i would wait until flaggins done and then salt'
                },
                {
                    user: 'Lawdie123',
                    text: '｀、ヽヽ｀ヽ｀、ヽヽ༼ຈ ل͜ຈ༽ﾉ☂ ɪᴛs ʀᴀɪɴɪɴɢ sᴀʟᴛ! ヽ༼ຈل͜ຈ༽ﾉ☂ ヽ｀ヽ｀ヽ｀、ヽヽ｀'
                },
                {
                    user: 'PoD682',
                    text: 'The world needs heroes, just not you.'
                },
                {
                    user: 'my_name_is_worse',
                    text: '/r/Overwatch: The Salt Awakens'
                },
                {
                    user: 'uberxD',
                    text: 'At this poiint I think I have a better chance to get into the Half Life 3 beta than this'
                },
                {
                    user: 'Devildog0491',
                    text: 'I OWN EVERY GOD DAMN BLIZZARD TITLE AND HAVE SPENT THOUSANDS FUCK BLIZZARD AHHHHHHHHH.'
                },
                {
                    user: 'Aldahe',
                    text: '<a href="http://i.imgur.com/yJ5vSIR.jpg" target="_blank">ALL ABOARD THE SALT TRAIN</a>'
                },
                {
                    user: 'Jasonandstuff',
                    text: 'Blizzard, more like not gotta send you betaizzard ami right?'
                },
                {
                    user: 'gordonfrohmann',
                    text: 'Welp, no beta invite...again. Back to playing tf2 and hating myself for it.'
                },
                {
                    user: 'KoreyTheTestMonkey',
                    text: 'Why even have hope, you won\'t get in...'
                },
                {
                    user: 'AcclimateToMind',
                    text: 'I know it. I can feel it in the wind, in the air filling my lungs. My hopes will be raised, only for them to come crashing back down around me. Blizzard knows not what they do to me.'
                },
                {
                    user: 'raptornex',
                    text: 'Fuck me for believing in you Blizzard.'
                },
                /* Reddit happier posts */
                {
                    user: 'sethers656',
                    text: 'I\'m not much for prayer. but this one I can get behind. I just really want to hit people with a giant hammer, is that too much to ask?'
                },
                {
                    user: 'Brisbie_',
                    text: 'My body is ready. My heart will endure for the House of Blizzard.'
                },
                {
                    user: 'Dayz15',
                    text: 'F'
                },
                {
                    user: 'tACorruption',
                    text: 'Good luck everyone, try to shoo the visions of the "fuck" train away. Hope they send some invites this week.'
                },
                {
                    user: 'mabus85',
                    text: 'GABEN PLZ'
                },
                {
                    user: 'Bbkoul',
                    text: 'Ah, feels good to have hope! :D'
                },
                {
                    user: 'Fressshx',
                    text: 'I\'ll gladly sacrifice myself for the good of all and take on this burden of beta.'
                },
                {
                    user: 'DoItToItPruitt',
                    text: 'I volunteer as tribute. Blizz pls.'
                },
                {
                    user: 'PaladinWiggles',
                    text: 'Kids these days, no patience.'
                },
                /* Reddit chatter */
                {
                    user: 'defnotbjk',
                    text: 'Blizzard should really increase beta Invites in general. It\'s kinda crazy seeing beta accounts sell for 500+ or people "renting" put their account.'
                }
            ]
        }
    ];

    function getNextEvent() {
        // Sort events so that highest chance is first
        events.sort(function compareFunction(a, b) {

            var aChance = null;
            if (typeof a.chance === 'function') {
                aChance = a.chance();
            } else {
                aChance = a.chance;
            }
            var bChance = null;
            if (typeof b.chance === 'function') {
                bChance = b.chance();
            } else {
                bChance = b.chance;
            }

            if (aChance > bChance) {
                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                return -1;
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
            } else if (bChance > aChance) {
                return 1;
            }
            // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
            return 0;

        });

        var result = null;
        while (result == null) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                if (event.isAvailable && !event.isAvailable()) {
                    continue;
                }
                var chance = null;
                if (typeof event.chance === 'function') {
                    chance = event.chance();
                } else {
                    chance = event.chance;
                }
                if (Math.random() < chance) {
                    result = event;
                    break;
                }
            }
        }

        return result;
    }

    return {
        getNextEvent: getNextEvent
    }

});