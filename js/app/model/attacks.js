'use strict';

define(['app/model/player', 'app/model/words', 'app/util/random', 'app/model/common'], function(player, words, random, common) {

    var attacks = [
        /* Default class attacks */
        {
            title: 'Post to social media',
            description: 'Discuss the current ongoing wave on social media. Let\'s not kid around though - you are hoping that someone at Blizzard ' +
                'notices your desperation and gives you beta. You are so transparent. Maybe stay away if you are very salty...',
            subDescription: 'Costs: -' + common.TIME.SOCIAL_COST + ' seconds, May increase: Money, May increase: Beta chance, May increase: Salt',
            beforeOutcome: function() {
                if (!player.data['socialmediacount']) {
                    player.data['socialmediacount'] = 0;
                }
                player.data['socialmediacount']++;
            },
            isAvailable: function() {
                return player.secondsRemaining >= common.TIME.SOCIAL_COST && player.characterClassId == 'default';
            },
            outcomes: [
                // TODO : remember - social media is "MF%"

                /* start blizzard pizza quest */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['blizzard-pizza-quest'];
                    },
                    flavourText: 'You notice $$CM mention that she is hungry on Twitter...',
                    apply: function() {
                        player.changeSecondsRemaining(-10);
                        player.quests.push('blizzard-pizza');
                        player.data['blizzard-pizza-quest'] = true;
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, questCountAdded: 1});
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
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        player.quests.push('reddit-spammer');
                        player.data['reddit-spammer-quest'] = true;
                        player.data['reddit-spammer-started'] = true;
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, questCountAdded: 1});
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
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        player.quests.push('dva-scrim');
                        player.data['dva-scrim-quest'] = true;
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, questCountAdded: 1});
                    }
                },

                /* start button quest */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['blizzard-button-quest'];
                    },
                    flavourText: 'Blizzard have a problem! Their Beta inviting machine - the Beta-Inviter-9000 - has broken down! For some reason they built a ' +
                    'machine to do this? Anyway, they need scrap metal because the stupid thing is all rusted and broken because it hasn\'t been used in ages.',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        player.quests.push('blizzard-button');
                        player.data['blizzard-button-quest'] = true;
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, questCountAdded: 1});
                    }
                },

                /* lower beta */
                {
                    chance: 0.03,
                    isAvailable: function() {
                        return player.salt >= 50 && player.betaChance > 0;
                    },
                    flavourText: [
                        'Posting on social media when you are salty is never a good idea. You send some creepy, desperate messages to $$CM ' +
                        'on Twitter. They do not appreciate it.'
                    ],
                    apply: function() {
                        player.changeBetaChance(-common.BETA.LOW);
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, beta: -common.BETA.LOW});
                    },
                    buttons: [
                        {
                            text: 'It was just a prank!'
                        }
                    ]
                },

                /* raise beta */
                {
                    chance: 0.05,
                    flavourText: [
                        'Your desperate, obnoxious sounding posts have somehow caught the sympathetic eye of $$CM.'
                    ],
                    apply: function() {
                        player.changeBetaChance(common.BETA.LOW);
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, beta: common.BETA.LOW});
                    },
                    buttons: [
                        {
                            text: 'Praise JKapp!'
                        }
                    ]
                },

                /* find money */
                {
                    chance: 0.05,
                    flavourText: [
                        'You post a video to Youtube demanding that Blizzard nerf McCree.',
                        'You spend an evening counting the number of rockets Pharah launches during her ultimate and post a video to Youtube about it.',
                        'You post a video to Youtube announcing that you will soon post a video to Youtube with some actual content.',
                        'You receive an anonymous donation while streaming yourself playing games on Twitch to 2 viewers.',
                        'You stream your Battle.net launcher screen showing the Overwatch PLAY button ghosted out for 16 hours and receive an anonymous pity donation.',
                        'You build a dev tracker for Overwatch, which is literally the easiest type of application to build for anything. Ad revenue pays handsomely!'
                    ],
                    apply: function() {
                        var money = 1 + random.nextInt(100);
                        player.changeMoney(money);
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, money: money});
                    },
                    buttons: [
                        {
                            text: 'I\'m rich!'
                        }
                    ]
                },

                /* me being a loser */
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return player.salt >= 50;
                    },
                    flavourText: [
                        'You make a childish comment on reddit lamenting that you missed out on the Beta stress test weekend. ' +
                        '"Fuck me for believing in your Blizzard!" you shout (type) to the heavens. It literally gets you no where.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST});
                    }
                },

                /* completely reset saltiness */
                {
                    chance: 0.05,
                    isAvailable: function() {
                        return !player.data['saltreset'];
                    },
                    flavourText: '$$CM responds to one of your dumb Twitter questions that you could\'ve found the answer to yourself if you spent ' +
                    'literally any time googling it. You are so stupid, but you are happy that senpai has noticed you.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        player.data['saltreset'] = true;
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, miscText: 'Your saltiness has reset to zero.'});
                    },
                    buttons: [
                        {
                            text: 'I bet they give beta to people who ask good questions'
                        }
                    ]
                },

                /* raise saltiness */
                {
                    chance: 0.1,
                    flavourText: [
                        'You comment on reddit, "Good luck everyone, I hope we all get in!". <br/><br/>You are downvoted to -23.',
                        'You venture into a salt thread on Reddit and say something that is not salty. <br/><br/>You are downvoted to -18.',
                        'You make a comment on Reddit that vaguely implies that you have Beta. <br/><br/>You are downvoted to -482.'
                    ],
                    apply: function() {
                        player.changeSalt(5);
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({salt: 5, time: -common.TIME.SOCIAL_COST});
                    },
                    buttons: [
                        {
                            text: 'Pricks'
                        }
                    ]
                },

                /* lower saltiness */
                {
                    chance: 0.30,
                    flavourText: [
                        'You get in on a "FUCK" chain in the reddit comments. Those things are so stupid. <br/><br/>You are upvoted +239 times.',
                        'You post on reddit demanding more invite ways get sent out.  Your post is littered with spelling mistakes, ' +
                        'grammatical errors and a significant misunderstanding of the way software development works. <br/><br/>You are upvoted +588 times.',
                        'You see some exceptional fanart posts on Twitter get attention from $$CM - those sneaky (junk) rats, I bet she gave them beta. You draw ' +
                        'an awful picture of Tracer using MSPaint and post it on reddit. <br/><br/>You inexplicably gets +100 upvotes.'
                    ],
                    apply: function() {
                        player.changeSalt(-5);
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({salt: -5, time: -common.TIME.SOCIAL_COST});
                    },
                    buttons: [
                        {
                            text: 'I am a quality contributor to this subreddit'
                        }
                    ]
                },

                /* item drop: bag-common */
                {
                    chance: 0.1,
                    flavourText: [
                        'For filling in one of Blizzard\'s surveys they send you a bag of junk. There are no Beta keys in this bag.'
                    ],
                    apply: function() {
                        player.items.push('bag-common');
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Gee, thanks'
                        }
                    ]
                },

                /* item drop: bag-rare */
                {
                    chance: 0.05,
                    flavourText: [
                        'You win a Twitch giveaway by using a view bot to stack the odds in your favour.'
                    ],
                    apply: function() {
                        player.items.push('bag-rare');
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'No dude someone sent those bots to me'
                        }
                    ]
                },

                /* item drop: bag-epic */
                {
                    chance: 0.01,
                    flavourText: [
                        'A blinking pop-up congratulates you for being viewer one million. You are apparently the first person ever to claim the prize.'
                    ],
                    apply: function() {
                        player.items.push('bag-epic');
                        player.changeSecondsRemaining(-common.TIME.SOCIAL_COST);
                        return words.buildApplyReturn({time: -common.TIME.SOCIAL_COST, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Does this mean the Nigerian prince was telling the truth?'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Go for a walk',
            description: 'Lowers your saltiness by -' + common.SALT.WALK_DECREASE + '%. Chance to start a quest.',
            subDescription: 'Costs: -' + common.TIME.WALK_COST + ' seconds',
            isAvailable: function() {
                return player.secondsRemaining >= common.TIME.WALK_COST && player.characterClassId == 'default';
            },
            outcomes: [
                /* standard outcome - lower salt */
                {
                    isAvailable: function() {
                        return true;
                    },
                    chance: function() {
                        if (player.questHistory.length < 2) {
                            return 0.1;
                        } else {
                            // As the user finishes more and more quests the probability that the "low chance" outcomes will
                            // occur increases. Make sure this does not happen so easily.
                            return 0.3;
                        }
                    },
                    flavourText: [
                        'You take a brisk walk around the building to clear your head.',
                        'A brief respite from the beta frenzy helps prevent the build up of salt.',
                        'The sounds of silence prevent you from meeting darkness (your old friend).',
                        'You think about the big bucks you\'re going to make when you turn pro at this game.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-30);
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE});
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
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.items.push('clover');
                        player.data['clover'] = true;
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Neat!'
                        }
                    ]
                },
                /* start slenderman quest */
                {
                    chance: 0.002,
                    isAvailable: function() {
                        return !player.data['slender-spotted'];
                    },
                    flavourText: 'You stop briefly to look out your office window. In the distance you spot what looks like a tall, thin gray man wearing black.',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['slender-spotted'] = true;
                        player.quests.push('slenderman');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE})
                            + 'You pretend you didn\'t see anything.';
                    },
                    buttons: [
                        {
                            text: 'Aww hell no!'
                        }
                    ]
                },

                /* find briefcase */ // fixme what is this crap
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return !player.data['briefcase-found'];
                    },
                    flavourText: [
                        'A crazy-looking Australian fellow hands you a briefcase and asks you to hide it for him. He then giggles and runs off.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.items.push('briefcase');
                        player.data['briefcase-found'] = true;
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, itemCount: 1})
                    },
                    buttons: [
                        {
                            text: 'Thank you generous stranger!'
                        }
                    ]
                },
                /* find a handful of berries */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['berries'];
                    },
                    flavourText: [
                        'You grab a handful of berries from an strange shrub while out walking.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.items.push('berry');
                        player.data['berries'] = true;
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, itemCount: 4})
                    },
                    buttons: [
                        {
                            text: 'Yep, that\'s a safe thing to do'
                        }
                    ]
                },
                /* death on walk */
                {
                    chance: 0.005,
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
                /* find stale water */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['stale-water-found'];
                    },
                    flavourText: 'On your walk you find some stale water in an old gym bag. You add the water to your inventory.',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.items.push('stale-water');
                        player.data['stale-water-found'] = true;
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'I have never been to a gym?'
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
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['winston-quest'] = true;
                        player.quests.push('winston-peanut1');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, questCountAdded: 1});
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
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['soldier76-quest'] = true;
                        player.quests.push('soldier76-glasses');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, questCountAdded: 1});
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
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['roadhog-quest'] = true;
                        player.items.push('dollar-sign-bag');
                        player.quests.push('roadhog-truck');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, itemCount: 1, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'I don\'t think he saw me'
                        }
                    ]
                },

                /* start torb quest */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return !player.data['torb-quest'];
                    },
                    flavourText: 'You bump into a man dumpster diving in an ally. He tells you that he is an inventor and needs scrap metal. ' +
                        'You tell him that he might be looking in the wrong place but you\'ll keep an eye out. He returns to his fossicking.',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['torb-quest'] = true;
                        player.quests.push('torb-scrap');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'Should I call the cops?'
                        }
                    ]
                },

                /* start lucio quest */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return !player.data['lucio-quest'];
                    },
                    flavourText: 'You find a flyer for a dance party that needs a DJ. You could do that?',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['lucio-quest'] = true;
                        player.quests.push('lucio-party');
                        return words.buildApplyReturn({questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'Is this an excuse to do a Lucio-related quest?'
                        }
                    ]
                },

                /* start bastion quest */
                {
                    chance: 0.9,
                    isAvailable: function() {
                        return player.data['torb-turret-complete']
                            && !player.data['bastion-quest'];
                    },
                    flavourText: 'You find that idiot scientist again chasing birds in the park. He says he needs one to fix a robot he found in the forest. ' +
                        'Right.',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['bastion-quest'] = true;
                        player.quests.push('bastion-broken');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'Why does he need a bird?'
                        }
                    ]
                },

                /* find bird */
                {
                    chance: 0.5,
                    isAvailable: function() {
                        return player.data['bastion-quest']
                            && !player.data['bastion-bird-found'];
                    },
                    flavourText: 'While on your walk a bird decides to land on your shoulder and start singing. You immediately hate this bird.',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        player.changeSalt(-common.SALT.WALK_DECREASE);
                        player.data['bastion-bird-found'] = true;
                        player.items.push('bird');
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, salt: -common.SALT.WALK_DECREASE, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'ITS IN MY HAIR'
                        }
                    ]
                },

                /* get arrested for having unlicensed gun */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return player.countItems('pistol') == 1 && player.countItems('gun-license') == 0 && player.salt >= 50;
                    },
                    flavourText: 'Your relaxing walk is brought to an abrupt halt when a policeman asks to see your license for the gun that the soldier gave you. ' +
                        'You tell him to "chill" and that "it\'s cool". <br/><br/>When he informs you that you will be fined your saltiness takes over and you pull ' +
                        'your gun on the policeman.',
                    apply: function() {
                        player.data['beta'] = true; // hack
                        player.data['unlicensed-weapon'] = true;
                    },
                    buttons: [
                        {
                            text: 'Time to reap!'
                        }
                    ]
                },

                /* get fined for having unlicensed gun */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return player.countItems('pistol') == 1 && player.countItems('gun-license') == 0 && player.salt < 50;
                    },
                    flavourText: 'Your relaxing walk is brought to an abrupt halt when a policeman asks to see your license for the gun that the soldier gave you. ' +
                    'You tell him to "chill" and that "it\'s cool". <br/><br/>You receive a fine of "all your money."',
                    apply: function() {
                        player.changeSecondsRemaining(-common.TIME.WALK_COST);
                        var money = -player.money;
                        player.changeMoney(money);
                        return words.buildApplyReturn({time: -common.TIME.WALK_COST, money: money});
                    },
                    buttons: [
                        {
                            text: 'This is why I\'m voting for Trump'
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
            subDescription: function() {
                var timeCost = -common.TIME.ACCOUNT_COST;
                if (player.countItems('account-salt-free') > 0) {
                    timeCost /= 2;
                }
                return 'Costs: ' + timeCost + ' seconds, Increases: Salt, Chance to finish game'
            },
            isAvailable: function() {
                var timeCost = -common.TIME.ACCOUNT_COST;
                if (player.countItems('account-salt-free') > 0) {
                    timeCost /= 2;
                }
                return player.secondsRemaining >= Math.abs(timeCost) && player.characterClassId == 'default';
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
                        var timeCost = -common.TIME.ACCOUNT_COST;
                        if (player.countItems('account-salt-free') > 0) {
                            timeCost /= 2;
                        }
                        var saltCost = common.SALT.ACCOUNT_INCREASE;
                        if (player.countItems('account-salt-free') > 0) {
                            saltCost = 0;
                        }

                        player.changeSalt(saltCost);
                        player.changeSecondsRemaining(timeCost);
                        return words.buildApplyReturn({salt: saltCost, time: timeCost})
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
                        var timeCost = -common.TIME.ACCOUNT_COST;
                        if (player.countItems('account-salt-free') > 0) {
                            timeCost /= 2;
                        }
                        var saltCost = common.SALT.ACCOUNT_INCREASE;
                        if (player.countItems('account-salt-free') > 0) {
                            saltCost = 0;
                        }

                        player.changeSalt(saltCost);
                        player.changeSecondsRemaining(timeCost);
                        return words.buildApplyReturn({salt: saltCost, time: timeCost})
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
                        var timeCost = -common.TIME.ACCOUNT_COST;
                        if (player.countItems('account-salt-free') > 0) {
                            timeCost /= 2;
                        }
                        var saltCost = common.SALT.ACCOUNT_INCREASE;
                        if (player.countItems('account-salt-free') > 0) {
                            saltCost = 0;
                        }

                        player.changeSalt(saltCost);
                        player.changeSecondsRemaining(timeCost);
                        return words.buildApplyReturn({salt: saltCost, time: timeCost})
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