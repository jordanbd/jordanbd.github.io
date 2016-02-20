'use strict';

define(['app/model/player'], function(player) {

    var attacks = [
        {
            title: 'Post to social media',
            description: 'Discuss the current ongoing wave on social media. Let\'s not kid around though - you are hoping that someone at Blizzard ' +
                'notices your desperation and gives you beta. You are so transparent. Posting on social media can raise or lower your saltiness, ' +
                'give or take money and yes, even raise or lower your beta chances. Be cautious. Maybe stay away if you are very salty...',
            beforeOutcome: function() {
                if (!player.data['socialmediacount']) {
                    player.data['socialmediacount'] = 0;
                }
                player.data['socialmediacount']++;
            },
            outcomes: [
                /* reduce time */
                {
                    chance: 0.01,
                    flavourText: 'Midway through a debate with $$MOD on why your content was not technically shitposting you are enveloped in a blinding white light. ' +
                        'When you open your eyes you realise that you have travelled back in time exactly 60 seconds. This stuff probably happens all the time?',
                    isAvailable: function() {
                        return !player.data['timetravelled'];
                    },
                    apply: function() {
                        player.changeSecondsRemaining(60);
                        player.data['timetravelled'] = true;
                        return 'You have gained 60 seconds of time.'
                    },
                    buttons: [
                        {
                            text: 'Dude I saw someone in the light, wtf?'
                        }
                    ]
                },
                /* raise saltiness */
                {
                    chance: 0.1,
                    flavourText: 'You comment on reddit, "Good luck everyone, I hope we all get in!". You are downvoted to -23.',
                    apply: function() {
                        player.changeSalt(5);
                        return 'Your saltiness has increased';
                    },
                    buttons: [
                        {
                            text: 'Pricks'
                        }
                    ]
                },
                /* lower saltiness */
                {
                    chance: 0.1,
                    flavourText: 'You get in on a "FUCK" chain in the reddit comments. Those things are so stupid. You are upvoted +239 times.',
                    apply: function() {
                        player.changeSalt(-5);
                        return 'Your saltiness has decreased.';
                    },
                    buttons: [
                        {
                            text: 'I am a quality contributor to this subreddit'
                        }
                    ]
                },
                /* completely reset saltiness */
                {
                    chance: 0.03,
                    flavourText: '$$CM responds to one of your dumb Twitter questions that you could\'ve found the answer to yourself if you spent ' +
                        'literally any time googling it. You are so stupid, but you are happy that senpai has noticed you.',
                    apply: function() {
                        player.changeSalt(-100);
                        return 'Your saltiness has reset to zero.';
                    },
                    buttons: [
                        {
                            text: 'I bet they give beta to people who ask good questions'
                        }
                    ]
                },
                /* find money */
                {
                    chance: 0.1,
                    flavourText: 'You post a series of odd videos to Youtube starring a puppet and prominently featuring chips for some reason.',
                    apply: function() {
                        player.changeMoney(100);
                        return 'Ad revenue pays out a crisp $100.'
                    },
                    buttons: [
                        {
                            text: 'I will release my next video in 2017'
                        }
                    ]
                },
                /* lose money */
                // TODO
                /* lose all money */
                // TODO
                /* raise beta */
                {
                    chance: 0.05,
                    flavourText: [
                        'Your desperate, obnoxious sounding posts have somehow caught the sympathetic eye of a watching Blizzard employee.'
                    ],
                    apply: function() {
                        player.changeBetaChance(0.03);
                        return 'Your beta chances have slightly increased.';
                    },
                    buttons: [
                        {
                            text: 'Praise JKapp!'
                        }
                    ]
                },
                /* lower beta */
                {
                    chance: 0.05,
                    isAvailable: function() {
                        return player.salt >= 80 && player.betaChance > 0;
                    },
                    flavourText: [
                        'Posting on social media when you are salty is never a good idea. You send some creepy, desperate messages to a Blizzard employee ' +
                        'on Twitter. They do not appreciate it.'
                    ],
                    apply: function() {
                        player.changeBetaChance(-0.03);
                        return 'Your beta chances have slightly decreased.';
                    },
                    buttons: [
                        {
                            text: 'It was just a prank!'
                        }
                    ]
                }
                // TODO
                /* reset beta */
                // TODO
                /* give beta - happy ending */
                /* give beta - robbery ending */
                /* give beta - alien abduction ending */
            ]
        },
        {
            title: 'Go for a walk',
            description: 'Go for a leisurely stroll. Your saltiness will decrease but you will waste 20 seconds of time. You have a chance ' +
                'to find items and money when going for a walk.',
            isAvailable: function() {
                return player.secondsRemaining >= 20;
            },
            beforeOutcome: function() {
                player.changeSecondsRemaining(-20);
            },
            outcomes: [
                /* increase time */
                {
                    chance: 0.01,
                    flavourText: [
                        'You decide to walk backwards around your building. Oddly enough you now find yourself with ' +
                        'more time than you had before.'
                    ],
                    apply: function() {
                        player.changeSalt(-10);
                        player.changeSecondsRemaining(60);
                        return 'Your saltiness has decreased and your time remaining has increased.'
                    },
                    buttons: [
                        {
                            text: 'That is NOT how it works'
                        }
                    ]
                },
                /* standard outcome - lower salt */
                {
                    isAvailable: function() {
                        return true;
                    },
                    chance: 0.39,
                    flavourText: [
                        'You take a brisk walk around the building to clear your head.',
                        'A brief respite from the beta frenzy helps prevent the build up of salt.',
                        'The sounds of silence prevent you from meeting darkness (your old friend).'
                    ],
                    apply: function() {
                        player.changeSalt(-10);
                        return 'Your saltiness has decreased slightly.';
                    }
                },
                /* find water */
                {
                    chance: 0.05,
                    flavourText: 'On your walk you find some stale water in an old gym bag. You add the water to your inventory.',
                    apply: function() {
                        player.changeSalt(-10);
                        player.items.push('stale-water');
                        return 'Your saltiness has also decreased slightly.';
                    },
                    buttons: [
                        {
                            text: 'I have never been to a gym?'
                        }
                    ]
                },
                /* find lucky clover */
                {
                    chance: 0.05,
                    flavourText: 'You stumble across a small wooden container with a faded inscription on the lid. The container contains ' +
                        ' a seven-leaf clover - looks like your luck is changing! You add the clover to your inventory.<br/><br/><em>"Here Lies ' +
                        'Philip J. Fry, named for his uncle, to carry on his spirit."</em>',
                    apply: function() {
                        player.changeSalt(-10);
                        player.items.push('clover');
                        return 'Your saltiness has also decreased slightly.';
                    },
                    buttons: [
                        {
                            text: 'Neat!'
                        }
                    ]
                },
                /* stumble on slenderman */
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return !player.data['slender-spotted'];
                    },
                    flavourText: 'You stop briefly to look out your bedroom window. In the distance you spot what looks like a tall, thin gray man wearing black.',
                    apply: function() {
                        player.changeSalt(-10);
                        player.data['slender-spotted'] = true;
                        return 'Your saltiness has decreased slightly. You close the blinds and pretend you didn\'t see anything.';
                    },
                    buttons: [
                        {
                            text: 'Aww hell no!'
                        }
                    ]
                },
                /* find money */
                {
                    isAvailable: function() {
                        return !player.data['stole-partner-money']
                    },
                    chance: 0.05,
                    flavourText: [
                        'While on your walk you stumble upon your partner\'s bag and find $100.00 in it! You take your partner\'s money.'
                    ],
                    apply: function() {
                        player.data['stole-partner-money'] = true;
                        player.changeSalt(-10);
                        player.changeMoney(100);
                        return 'Your saltiness has decreased slightly.';
                    },
                    buttons: [
                        {
                            text: 'Haha, I don\'t even have a partner'
                        }
                    ]
                },
                /* reverse - increase salt */
                {
                    chance: 0.05,
                    flavourText: 'As you re-enter your computer room you stub your toe on your Soldier: 76 collector\'s edition ' +
                        'statue.',
                    apply: function() {
                        player.changeSalt(10);
                        return 'Your saltiness has increased.';
                    },
                    buttons: [
                        {
                            text: 'This game sucks'
                        }
                    ]
                },
                /* find briefcase */
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return !player.data['briefcase'];
                    },
                    flavourText: [
                        'A man hands you a briefcase and leaves before saying anything.'
                    ],
                    apply: function() {
                        player.changeSalt(-10);
                        player.items.push('briefcase');
                        player.data['briefcase'] = true;
                        return 'Item added to your inventory. Your saltiness has decreased.';
                    }
                },
                /* find a handful of berries */
                {
                    chance: 0.2,
                    isAvailable: function() {
                        return !player.data['berries'];
                    },
                    flavourText: [
                        'You grab a handful of berries from an unidentified bush while out walking.'
                    ],
                    apply: function() {
                        player.changeSalt(-10);
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.data['berries'] = true;
                        return '4 items added to your inventory. Your saltiness has decreased.';
                    }
                },
                /* a shaggy fellow */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return player.money >= 100 && !player.data['helpedman'];
                    },
                    flavourText: 'You encounter a shaggy looking fellow on your walk. He asks you if he can have $100. ' +
                        'He does not say what for.',
                    buttons: [
                        {
                            text: 'Uhh, sure?',
                            apply: function() {
                                player.changeMoney(-100);
                                player.data['helpedman'] = true;
                            }
                        },
                        {
                            text: 'No!!'
                        }
                    ]
                },
                /* large lower salt */
                {
                    chance: 0.05,
                    flavourText: [
                        'You reflect on life and what it means to be a slave to the whims of a corporation like Blizzard.'
                    ],
                    apply: function() {
                        player.changeSalt(-30);
                        return 'Your saltiness has greatly decreased';
                    },
                    buttons: [
                        {
                            text: 'I am wasting my life'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Check your email inbox',
            description: 'Beta invites take hours to arrive by email. There is literally no reason why you should check your inbox...',
            outcomes: [
                {
                    chance: 2, // lol
                    isAvailable: function() {
                        return player.data['helpedman'];
                    },
                    flavourText: [
                        'You have received an email. "Hey, thanks for loaning me the $100. As a reward, I\'ve put some items up for sale that you may find useful...'
                    ],
                    apply: function() {
                        player.data['helpedman-items'] = true;
                    },
                    buttons: [
                        {
                            text: 'Guess he needs more money'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return true;
                    },
                    flavourText: [
                        'You get excited when you spot an email from Blizzard, but it\'s a newsletter announcing another WoW expansion. You die a little inside.',
                        'Your inbox is empty. Well, except for all the phishing emails.',
                        'Your horrible friend has sent you a spoof email with the subject announcing you were invited into the Overwatch beta. It was just a prank bro.'
                    ],
                    buttons: [
                        {
                            text: 'Sigh'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Do some work',
            description: 'Actually do your job instead of sitting around waiting for a Beta invite. Good way of increasing money but costs a significant ' +
                'amount of time.',
            outcomes: []
        },
        {
            title: 'Check your Battle.net account',
            description: 'Log in to Account Management and check to see if you have been invited into the Beta. This is the only way ' +
            'to confirm you are in beta. Be warned: if you have not yet been invited into the beta your salt will increase.',
            outcomes: [
                //TODO slow internet connection costs you time
                /* Success */
                {
                    chance: function() {
                        return player.betaChance;
                    },
                    flavourText: 'No way...',
                    apply: function() {
                        player.data['beta'] = true;
                    },
                    buttons: [
                        {
                            text: 'OMG'
                        }
                    ]
                },
                /* Fail - with origins edition (super salty) */
                {
                    isAvailable: function() {
                        return player.data['origins'] && player.salt > 80;
                    },
                    chance: function() {
                        return 1 - player.betaChance;
                    },
                    flavourText: 'YES... wait... no!! The Origins edition tricked you again... AGAIN. Your grip on your sanity loosens...',
                    apply: function() {
                        player.changeSalt(5);
                        return 'Your saltiness increases.';
                    },
                    buttons: [
                        {
                            text: 'Brilliant, thanks'
                        }
                    ]
                },
                /* Fail - with origins edition */
                {
                    isAvailable: function() {
                        return player.data['origins'] && player.salt <= 80;
                    },
                    chance: function() {
                        return 1 - player.betaChance;
                    },
                    flavourText: [
                        'For the briefest of moments you think you see it. "Overwatch - Beta". But the Origins edition icon ' +
                        'plays tricks on your mind. You are not in the beta... yet.',
                        'You only see one Overwatch icon - the Origins edition. You need to see two. The beta continues to ' +
                        'elude you.',
                        'The excitement rises then quickly falls as you are momentarily tricked by the Origins edition icon.'
                    ],
                    apply: function() {
                        player.changeSalt(10);
                        return 'Your saltiness has increased.';
                    },
                    buttons: [
                        {
                            text: 'There\'s still time...'
                        }
                    ]
                },
                /* Fail - without origins edition */
                {
                    isAvailable: function() {
                        return !player.data['origins'];
                    },
                    chance: function() {
                        return 1 - player.betaChance;
                    },
                    flavourText: [
                        'You are not in beta. It\'s the story of your life.',
                        'No beta. This is not fair.',
                        'Nothing. If you try again it might show up?'
                    ],
                    apply: function() {
                        player.changeSalt(10);
                        return 'Your saltiness has increased.';
                    },
                    buttons: [
                        {
                            text: 'Grr...'
                        }
                    ]
                }
            ]
        },
    ];

    function getAttacks() {
        var results = [];
        for (var i = 0; i < attacks.length; i++) {
            var attack = attacks[i];
            if (!attack.isAvailable || attack.isAvailable()) {
                results.push(attack);
            }
        }
        return results;
    }

    return {
        getAttacks: getAttacks
    }

});