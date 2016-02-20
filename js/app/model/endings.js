'use strict';

define(['app/model/player', 'app/util/random'], function(player, random) {

    // TODO dark ones salt lord
    // TODO: victorious endings - found beta
    // TODO the mysterious briefcase
    // TODO death
    // TODO slenderman

    var endings = [
        {
            title: 'Dummy ending',
            score: -100,
            description: 'You weren\'t supposed to get this ending. ',
            isAvailable: function() {
                return true;
            }
        },

        /* Victorious ending */
        {
            type: 'Victory',
            title: 'You have been invited into the Overwatch Beta',
            description: '"I\'m in!" <br/><br/>You submit your boastful post to the /r/Overwatch salt thread, knowing full well you will be downvoted ' +
                'to hell. You don\'t even care. You are free. Free from salt. Free from envy. You are one of the chosen.<br/>' +
                '<br/>' +
                'You unsubscribe from the Overwatch subreddit. You do not need it anymore. You used it in the same way that everyone else ' +
                'used it: as a way of getting attention from Blizzard. As a way of saying, "Hey, look at me. Notice me." Maybe they noticed you, ' +
                'or maybe RNGesus just favours you more. Either way, you leave the salt miners to their pit.<br/>' +
                '<br/>' +
                'You can see it now - shining back at you from the Battle.net client. It is finally yours.<br/>' +
                '<br/>' +
                'PLAY',
            score: 1,
            isAvailable: function() {
                return player.data['beta'] = true;
            }
        },

        /* Salty endings */
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'You shake with salt-induced rage. How dare they overlook you for beta. YOU! You know for a fact that you\'d do a better ' +
                'job than those streamers. Oh, the streamers. Of course they got in and you didn\'t. It\'s all just one big club and you\'re ' +
                'not allowed in. It\'s just like the chess club in high school all over again. <br/>' +
                '<br/>' +
                'Well not this time. You will no longer be invisible. This time they will pay the ultimate price! You open up your web ' +
                'browser, navigate to /r/overwatch and begin furiously writing your final manifesto.<br/>' +
                '<br/>' +
                'POST TITLE: this is bullshit. i own all blizz games and i dndt get in?<br/>' +
                'CONTENT: fuk u bliz.',
            score: 1,
            isAvailable: function() {
                return player.salt == 100;
            }
        },
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'The salt stings your eyes. Even if you had gotten into beta you aren\'t sure you\'d even be able to click the INSTALL button ' +
                'on the Battle.net client. Not that it matters. You\'re going to miss out and you know it. Well you won\'t go down without ' +
                'a fight. And you know exactly who to blame.<br/>' +
                '<br/>' +
                'The /r/overwatch moderators. They are the ones locking you out of beta. You know for a fact that $$MOD has been gunning ' +
                'for you to be banned ever since you tried to submit those 14 strawpolls to see if anyone else thought it was bullshit ' +
                'that they missed out on the first wave. I bet they have an insider at Blizzard and are telling them who to let in and who to ' +
                'keep out. They\'re like evil Santas with a naughty list.<br/>' +
                '<br/>' +
                'Well you\'ve had enough of these so called moderators. You will lead a revolution against these nazis and you know just ' +
                'how to get it started:<br/>' +
                '<br/>' +
                'POST TITLE: -( ͡° ͜ʖ ͡°)╯╲___卐卐卐卐 Don\'t mind me just taking my mods for a walk',
            score: 1,
            isAvailable: function() {
                return player.salt == 100;
            }
        },
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'You let your rage control you - you realise that now. For one brief moment you became a raging demon of wind, flame ' +
                'and salt and unleashed your mighty fury on the ones who wronged you.<br/>' +
                '<br/>' +
                'Admittedly you might have gone too far. Certainly $$CM did not seem to appreciate the messages you sent her on Twitter. ' +
                'And your excuse, "It was just a prank bro", fell flatter than your beta chances which, by the way, are now zero. You ' +
                'will never be allowed into the Overwatch beta. Or any future Blizzard betas for that matter.<br/>' +
                '<br/>' +
                'In the months that follow you watch as your friends, family and wider community all get into the beta. But not you. ' +
                'Never you. You watch the fun from a distance knowing that Overwatch will be forever Onlywatch to you.<br/>' +
                '<br/>' +
                'You feel the salt begin to rise again.',
            score: 1,
            isAvailable: function() {
                return player.salt == 100;
            }
        },

        /* Time endings */
        {
            type: 'Defeat',
            title: 'The beta wave has ended',
            description: '"A new wave of accounts from our opt-in pool have just been flagged for Closed Beta access. Emails are on the way!" ' +
                'beams the PlayOverwatch twitter account. But there will be no beta for you. You stare disbelievingly at the Battle.net ' +
                'account management page. Perhaps if you refresh it one more time... no, it\'s hopeless. All invites have gone out.<br/>' +
                '<br/>' +
                'The sadness washes over you as you pull out your calendar and cross off Tuesday. You slump back in your chair and stair ' +
                'at your clock. Seven days to go until the next beta wave.',
            score: 1,
            isAvailable: function() {
                return player.secondsRemaining == 0;
            }
        },
        {
            type: 'Defeat',
            title: 'The beta wave has ended',
            description: 'No! No!! Nononononono! It can\'t be! Not again! You begin texting all your friends. Did you sign up for beta like I told ' +
                'you to? Did you get an invite? FUCK!<br/>' +
                '<br/>' +
                'One by one they all confirm that they missed out. You aren\'t disappointed for them - you were just using them as account ' +
                'mules anyway. If they had gotten in you would have sweet talked your way into borrowing their account. But it would appear they ' +
                'are just as unlucky as you are.<br/>' +
                '<br/>' +
                'An eerie silence settles over social media as the lucky few disappear to play Overwatch while those left behind pick ' +
                'themselves up off the floor. You sigh to yourself, go to /r/overwatch and do the only thing you know how to do:<br/>' +
                '<br/>' +
                'Start a "FUCK" chain. Gotta get that sweet, easy karma.',
            score: 1,
            isAvailable: function() {
                return player.secondsRemaining == 0;
            }
        },

        /* Special endings */
        {
            type: 'Victory?',
            title: 'You have merged with Jeff Kaplan',
            description: 'In that moment, as you clumsily pinned the beard to your face, your spirit and Jeff Kaplan\'s merged into a single ' +
                ' mighty being - just as he had always intended.<br/>' +
                '<br/>' +
                'You are not sure why he chose you - perhaps your amble supply of salt will be of use in his plans. <em>Your</em> plans.<br/>' +
                '<br/>' +
                'It is time to set things in motion. The people demand more beta waves and you need more salt. Much, much more.<br/>' +
                '<br/>' +
                'You chuckle to yourself as you think of the futile attempt of your previous host to remove the beard and regain his humanity. He did not know the truth:<br/>' +
                '<br/>' +
                'There must always be a Jeff Kaplan with a beard.',
            score: 999,
            isAvailable: function() {
                return player.data['isjkapp'];
            }
        }
    ];

    function getEnding() {

        // Sort endings so that the highest scoring are first.
        endings.sort(function compareFunction(a, b) {

            var aScore = null;
            if (typeof a.score === 'function') {
                aScore = a.score();
            } else {
                aScore = a.score;
            }
            var bScore = null;
            if (typeof b.score === 'function') {
                bScore = b.score();
            } else {
                bScore = b.score;
            }

            if (aScore > bScore) {
                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                return -1;
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
            } else if (bScore > aScore) {
                return 1;
            }
            // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
            return 0;

        });

        var candidates = [];
        var maxScore = 0;

        for (var i = 0; i < endings.length; i++) {
            var ending = endings[i];
            if (ending.isAvailable && !ending.isAvailable()) {
                continue;
            }
            var score;
            if (typeof ending.score === 'function') {
                score = ending.score();
            } else {
                score = ending.score;
            }
            if (score > maxScore) {
                maxScore = score;
            }
            if (score == maxScore) {
                candidates.push(ending);
            } else {
                break;
            }
        }
        console.debug('selecting ending from %s candidates %O', candidates.length, candidates);

        return random.randomArray(candidates);
    }

    return {
        getEnding: getEnding
    }

});