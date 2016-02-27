'use strict';

define(['app/model/player', 'app/model/words'], function(player, words) {

    var attacks = [
        /* Default class attacks */
        {
            title: 'Post to social media',
            description: 'Discuss the current ongoing wave on social media. Let\'s not kid around though - you are hoping that someone at Blizzard ' +
                'notices your desperation and gives you beta. You are so transparent. Maybe stay away if you are very salty...',
            subDescription: 'Costs: -5 seconds, May increase: Money, May increase: Beta chance, May increase: Salt',
            beforeOutcome: function() {
                if (!player.data['socialmediacount']) {
                    player.data['socialmediacount'] = 0;
                }
                player.data['socialmediacount']++;
            },
            isAvailable: function() {
                return player.secondsRemaining >= 5 && player.characterClassId == 'default';
            },
            outcomes: [
                /* start blizzard pizza quest */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['blizzard-pizza-quest'];
                    },
                    flavourText: 'You notice $$CM mention that she is hungry on Twitter...',
                    apply: function() {
                        player.changeSecondsRemaining(-5);
                        player.quests.push('blizzard-pizza');
                        player.data['blizzard-pizza-quest'] = true;
                        return words.buildApplyReturn({time: -5, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'This is my chance!'
                        }
                    ]
                },

                /* start reddit spammer quest */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['reddit-spammer-quest'];
                    },
                    flavourText: 'You get a private message from your salty friend Adrian182.<br/><br/>"I am sick of these nazi reddit mods! ' +
                        'I am sick of missing out on beta! I am going to make them all pay!"<br/><br/>Looks like someone has fallen to the dark ' +
                        'side of the salt.',
                    apply: function() {
                        player.changeSecondsRemaining(-5);
                        player.quests.push('reddit-spammer');
                        player.data['reddit-spammer-quest'] = true;
                        player.data['reddit-spammer-started'] = true;
                        return words.buildApplyReturn({time: -5, questCountAdded: 1});
                    }
                },

                /* start dva quest */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['dva-scrim-quest'];
                    },
                    flavourText: 'World champion Starcraft 2 player D.Va announces on Twitter that she needs 1v1 practice partners ' +
                        'for an upcoming tournament!',
                    apply: function() {
                        player.changeSecondsRemaining(-5);
                        player.quests.push('dva-scrim');
                        player.data['dva-scrim-quest'] = true;
                        return words.buildApplyReturn({time: -5, questCountAdded: 1});
                    }
                }
            ]
        },
        {
            title: 'Go for a walk',
            description: 'Resets your saltiness. Chance to get involved in a very quick adventure.',
            subDescription: 'Costs: -20 seconds',
            isAvailable: function() {
                return player.secondsRemaining >= 20 && player.characterClassId == 'default';
            },
            outcomes: [
                /* standard outcome - lower salt */
                {
                    isAvailable: function() {
                        return true;
                    },
                    chance: 0.3,
                    flavourText: [
                        'You take a brisk walk around the building to clear your head.',
                        'A brief respite from the beta frenzy helps prevent the build up of salt.',
                        'The sounds of silence prevent you from meeting darkness (your old friend).',
                        'You think about the big bucks you\'re going to make when you turn pro at this game.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-20);
                        player.changeSalt(-100);
                        return words.buildApplyReturn({time: -20, salt: -100});
                    }
                },

                /* find lucky clover */
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return !player.data['clover'];
                    },
                    flavourText: 'You stumble across a small wooden container with a faded inscription on the lid. The container contains ' +
                        ' a seven-leaf clover - looks like your luck is changing! You add the clover to your inventory.<br/><br/><em>"Here Lies ' +
                        'Philip J. Fry, named for his uncle, to carry on his spirit."</em>',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.items.push('clover');
                        player.data['clover'] = true;
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: 1});
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
                    flavourText: 'You stop briefly to look out your office window. In the distance you spot what looks like a tall, thin gray man wearing black.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['slender-spotted'] = true;
                        return words.buildApplyReturn({time: -20, salt: -100})
                            + 'You pretend you didn\'t see anything.';
                    },
                    buttons: [
                        {
                            text: 'Aww hell no!'
                        }
                    ]
                },

                /* find briefcase */
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return !player.data['briefcase-found'];
                    },
                    flavourText: [
                        'A crazy-looking Australian fellow hands you a briefcase and asks you to hide it for him. He then giggles and runs off.'
                    ],
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.items.push('briefcase');
                        player.data['briefcase-found'] = true;
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: 1})
                    },
                    buttons: [
                        {
                            text: 'Thank you generous stranger!'
                        }
                    ]
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
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.data['berries'] = true;
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: 4})
                    }
                },
                /* death on walk */
                {
                    chance: 0.01,
                    flavourText: 'A giant orc statue collapses on you while on your walk.',
                    apply: function() {
                        player.data['deadorcstatue'] = true;
                        player.data['beta'] = true; // hack?
                        return 'You have died.'
                    },
                    buttons: [
                        {
                            text: 'Oh WTF'
                        }
                    ]
                },

                /* start winston quest */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return !player.data['winston-quest'];
                    },
                    flavourText: 'You encounter a sad looking gorilla on your walk. He tells you that he wished he had ' +
                        'some peanut butter and that he would greatly reward anyone who gave him some.<br/><br/>' +
                        'He then sighs and trudges off. Nobody else seems to notice the magic talking gorilla.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['winston-quest'] = true;
                        player.quests.push('winston-peanut1');
                        return words.buildApplyReturn({time: -20, salt: -100, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'The poor monkey'
                        }
                    ]
                },

                /* start soldier 76 quest */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return !player.data['soldier76-quest'];
                    },
                    flavourText: 'A scruffy-looking blind man approaches you on your walk. He needs a pair of glasses to ' +
                        'help him see again. You imply that glasses don\'t cure blindness and that maybe he\'d prefer a ' +
                        'hot meal? No. He wants the glasses.<br/><br/>"The mission is all that matters."',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['soldier76-quest'] = true;
                        player.quests.push('soldier76-glasses');
                        return words.buildApplyReturn({time: -20, salt: -100, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'What mission?'
                        }
                    ]
                },

                /* start roadhog quest */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return !player.data['roadhog-quest'];
                    },
                    flavourText: [
                        'A bag with a dollar sign on it falls off the back of an ice-cream truck driven by a fat guy in a Bane constume.<br/><br/>' +
                        'You take the bag... it could come in handy!'
                    ],
                    apply: function() {
                        player.data['roadhog-quest'] = true;
                        player.changeSecondsRemaining(-20);
                        player.changeSalt(-100);
                        player.items.push('dollar-sign-bag');
                        player.quests.push('roadhog-truck');
                        return words.buildApplyReturn({time: -20, salt: -30, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'I don\'t think he saw me'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Do some work',
            description: 'Actually do your job instead of sitting around waiting for a Beta invite.',
            subDescription: 'Costs: -30 seconds, Increases: Money by $100',
            isAvailable: function() {
                return player.secondsRemaining >= 30 && player.characterClassId == 'default';
            },
            outcomes: [
                {
                    chance: 1,
                    score: 999,
                    isAvailable: function() {
                        return player.data['slender-email'] && !player.data['slender-research'];
                    },
                    flavourText: 'Alex\'s warning keeps bouncing around your head. What could he possibly mean? You google ' +
                        'the name - slender man. People know him. Others have seen him. Some have survived.<br/><br/>You find ' +
                        'what you\'re looking for. You need to be salty. At least 90% salty. Once you have it, you must run.',
                    apply: function() {
                        player.data['slender-research'] = true;
                    }
                },
                {
                    chance: 1,
                    flavourText: [
                        'You open up Microsoft Excel and mindlessly tap away at the keyboard so your colleagues think you are working.',
                        'You shuffle some papers on your desk and randomly staple certain pages together.',
                        'You call a colleague into a meeting room where you both work out on a whiteboard the odds of one of you ' +
                        'getting into the Beta. You aren\'t creating an algorithm for Facebook here - you could have used a calculator.',
                        'You plot out the number of days you can take as sick leave in the event you are invited into beta.',
                        'You spec requirements for an awful Overwatch Beta RPG on a notepad.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-30);
                        player.changeMoney(100);
                        return words.buildApplyReturn({time: -30, money: 100})
                    }
                }
            ]
        },
        {
            title: 'Check your email inbox',
            description: 'Beta invites take hours to arrive by email. There is literally no reason why you should check your inbox...',
            subDescription: 'Costs: 0 seconds',
            isAvailable: function() {
                return player.characterClassId == 'default';
            },
            outcomes: [
                {
                    chance: 1,
                    score: 999,
                    isAvailable: function() {
                        return player.data['helpedman'] && !player.data['helpedman-items'];
                    },
                    flavourText: [
                        'You have received an email.<br/><br/>"Hey, thanks for loaning me the $100. I needed it for gorilla stuff like launching satellites into space. <br/><br/>As a reward, I\'ve put some items up for sale that you may find useful..."'
                    ],
                    apply: function() {
                        player.data['helpedman-items'] = true;
                    },
                    buttons: [
                        {
                            text: 'Greedy monkey won\'t give me them for free'
                        }
                    ]
                },
                {
                    chance: 1,
                    score: 9999,
                    isAvailable: function() {
                        return player.data['slender-warning'] && !player.data['slender-email'];
                    },
                    flavourText: [
                        '"You saw him didn\'t you? You saw the slender man. He is coming for you. Right now. You need to run or you will die. Run you fool. RUN."'
                    ],
                    apply: function() {
                        player.data['slender-email'] = true;
                    },
                    buttons: [
                        {
                            text: '...'
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
            title: 'Check your Battle.net account',
            description: 'Log in to Account Management and check to see if you have been invited into the Beta. This is the only way ' +
            'to confirm you are in beta. Be warned: if you have not yet been invited into the beta your salt will increase.',
            subDescription:  'Costs: -5 seconds, Increases: Salt, Chance to finish game',
            isAvailable: function() {
                return player.secondsRemaining >= 5 && player.characterClassId == 'default';
            },
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
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({salt: 5, time: -5})
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
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({salt: 10, time: -5})
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
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({salt: 10, time: -5})
                    },
                    buttons: [
                        {
                            text: 'Grr...'
                        }
                    ]
                }
            ]
        },

        /* Friend and twitch class attacks */
        {
            title: 'Check your Battle.net account',
            description: 'Log in to Account Management and check to see if you have been invited into the Beta. This is the only way ' +
            'to confirm you are in beta. As you are playing the friend or twitch classes this is LITERALLY ALL YOU NEED TO DO TO WIN THE GAME.',
            isAvailable: function() {
                return player.characterClassId == 'friend' || player.characterClassId == 'twitch';
            },
            outcomes: [
                /* Success */
                {
                    chance: function() {
                        return player.betaChance;
                    },
                    flavourText: 'Ah yes I expected this.',
                    apply: function() {
                        player.data['beta'] = true;
                    },
                    buttons: [
                        {
                            text: 'About time'
                        }
                    ]
                }
            ]
        }
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