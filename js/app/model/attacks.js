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
                        return words.buildApplyReturn({time: 60});
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
                    flavourText: [
                        'You comment on reddit, "Good luck everyone, I hope we all get in!". <br/><br/>You are downvoted to -23.',
                        'You venture into a salt thread on Reddit and say something that is not salty. <br/><br/>You are downvoted to -18.',
                        'You make a comment on Reddit that vaguely implies that you have Beta. <br/><br/>You are downvoted to -482.'
                    ],
                    apply: function() {
                        player.changeSalt(5);
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({salt: 5, time: -5});
                    },
                    buttons: [
                        {
                            text: 'Pricks'
                        }
                    ]
                },
                /* lower saltiness */
                {
                    chance: 0.15,
                    flavourText: [
                        'You get in on a "FUCK" chain in the reddit comments. Those things are so stupid. <br/><br/>You are upvoted +239 times.',
                        'You post on reddit demanding more invite ways get sent out.  Your post is littered with spelling mistakes, ' +
                        'grammatical errors and a significant misunderstanding of the way software development works. <br/><br/>You are upvoted +588 times.',
                        'You see some exceptional fanart posts on Twitter get attention from $$CM - those sneaky (junk) rats, I bet she gave them beta. You draw ' +
                        'an awful picture of Tracer using MSPaint and post it on reddit. <br/><br/>You inexplicably gets +100 upvotes.'
                    ],
                    apply: function() {
                        player.changeSalt(-5);
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({salt: -5, time: -5});
                    },
                    buttons: [
                        {
                            text: 'I am a quality contributor to this subreddit'
                        }
                    ]
                },
                /* completely reset saltiness */
                {
                    chance: 0.08,
                    isAvailable: function() {
                        return !player.data['saltreset'];
                    },
                    flavourText: '$$CM responds to one of your dumb Twitter questions that you could\'ve found the answer to yourself if you spent ' +
                        'literally any time googling it. You are so stupid, but you are happy that senpai has noticed you.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-5);
                        player.data['saltreset'] = true;
                        return words.buildApplyReturn({time: -5}) + 'Your saltiness has reset to zero.';
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
                    flavourText: [
                        'You post a video to Youtube demanding that Blizzard nerf McCree.',
                        'You spend an evening counting the number of rockets Pharah launches during her ultimate and post a video to Youtube about it.',
                        'You post a video to Youtube announcing that you will soon post a video to Youtube with some actual content.'
                    ],
                    apply: function() {
                        player.data['socialmoney'] = true;
                        player.changeMoney(200);
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({time: -5}) + 'Ad revenue pays out a crisp $200.'
                    },
                    isAvailable: function() {
                        return !player.data['socialmoney'];
                    },
                    buttons: [
                        {
                            text: 'I will release my next video in the fall of 2017'
                        }
                    ]
                },
                /* raise beta */
                {
                    chance: 0.1,
                    flavourText: [
                        'Your desperate, obnoxious sounding posts have somehow caught the sympathetic eye of $$CM.'
                    ],
                    apply: function() {
                        player.changeBetaChance(0.01);
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({time: -5, beta: 0.01});
                    },
                    buttons: [
                        {
                            text: 'Praise JKapp!'
                        }
                    ]
                },
                /* lower beta */
                {
                    chance: 0.01,
                    isAvailable: function() {
                        return player.salt >= 50 && player.betaChance > 0;
                    },
                    flavourText: [
                        'Posting on social media when you are salty is never a good idea. You send some creepy, desperate messages to $$CM ' +
                        'on Twitter. They do not appreciate it.'
                    ],
                    apply: function() {
                        player.changeBetaChance(-0.03);
                        player.changeSecondsRemaining(-10);
                        return words.buildApplyReturn({time: -5, beta: -0.03});
                    },
                    buttons: [
                        {
                            text: 'It was just a prank!'
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
                        player.changeSecondsRemaining(-5);
                        return words.buildApplyReturn({time: -5});
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

                /* find dollar sign bag */
                {
                    chance: 0.1,
                    isAvailable: function() {
                        return !player.data['dollarsignbag-found']
                    },
                    flavourText: [
                        'A bag with a dollar sign on it falls off the back of an ice-cream truck driven by a fat guy in a Bane constume.<br/><br/>' +
                        'You take the bag... it could come in handy!'
                    ],
                    apply: function() {
                        player.data['dollarsignbag-found'] = true;
                        player.changeSecondsRemaining(-20);
                        player.changeSalt(-100);
                        player.items.push('dollarsignbag');
                        return words.buildApplyReturn({time: -20, salt: -30, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'I don\'t think he saw me'
                        }
                    ]
                },
                /* dollar sign bag - where is it? */
                {
                    chance: 0.2,
                    isAvailable: function() {
                        return player.data['dollarsignbag-found']
                            && player.data['dollarsignbag-open']
                    },
                    flavourText: [
                        'The fat idiot who was driving the ice-cream truck steps out from the shadows. ' +
                        'With a surprisingly upper class accent, fat Bane demands to know where the bag that fell off his truck went.<br/><br/>You tell fatty that you ' +
                        'took the money and that if he wants it so bad he can chase you for it. You are unaware he possesses a hook.<br/><br/> Fat Bane beats ' +
                        'you up and takes your money.'
                    ],
                    apply: function() {
                        player.data['dollarsignbag-beatup'] = true;
                        player.changeSecondsRemaining(-20);
                        var moneyStolen = player.money;
                        player.changeMoney(-moneyStolen);
                        return words.buildApplyReturn({time: -20, money: -moneyStolen});
                    },
                    buttons: [
                        {
                            text: 'Ugh, that fat hog'
                        }
                    ]
                },
                /* dollar sign bag - return it */
                {
                    chance: 0.2,
                    isAvailable: function() {
                        return player.data['dollarsignbag-found']
                            && !player.data['dollarsignbag-open']
                    },
                    flavourText: [
                        'The fat idiot who was driving the ice-cream truck steps out from the shadows. ' +
                        'With a surprisingly upper class accent, fat Bane demands to know where the bag that fell off his truck went.<br/><br/>You don\'t want to upset ' +
                        'him so you give him his bag back. He offers you a breath from his weird cannister as a thank you. At this point you are too scared to ' +
                        'say no.<br/><br/> Somehow... you feel luckier.'
                    ],
                    apply: function() {
                        player.changeSecondsRemaining(-20);
                        player.changeBetaChance(0.05);
                        player.removeItem('dollarsignbag');
                        return words.buildApplyReturn({time: -20, secondsRemaining: -20, beta: 0.05})
                    },
                    buttons: [
                        {
                            text: 'That was gross'
                        }
                    ]
                },

                /* reverse - increase salt */
                {
                    chance: 0.05,
                    flavourText: 'As you return from your walk you stub your toe on your Soldier: 76 collector\'s edition statue.',
                    apply: function() {
                        player.changeSalt(10);
                        player.changeSecondsRemaining(-20);
                        return words.buildApplyReturn({time: -20, salt: 10})
                    },
                    buttons: [
                        {
                            text: 'Why is this on the floor?'
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

                /* sad gorilla, no peanut butter */
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return !player.data['sadgorilla-nopeanutbutter']
                            && player.countItems('peanut') == 0;
                    },
                    flavourText: 'You encounter a sad looking gorilla on your walk. He tells you that he wished he had ' +
                        'some peanut butter and that he would greatly reward anyone who gave him some.<br/><br/>' +
                        'He then sighs and trudges off. Nobody else seems to notice the magic talking gorilla.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['sadgorilla-nopeanutbutter'] = true;
                        return words.buildApplyReturn({time: -20, salt: -100})
                    },
                    buttons: [
                        {
                            text: 'The poor monkey'
                        }
                    ]
                },
                /* sad gorilla, havent met before, have 1x peanut butter */
                {
                    chance: 0.4,
                    isAvailable: function() {
                        return !player.data['sadgorilla-nopeanutbutter']
                            && player.countItems('peanut') == 1;
                    },
                    flavourText: 'You encounter a sad looking gorilla on your walk. He tells you that he wished he had ' +
                        'some peanut butter and that he would greatly reward anyone who gave him some.<br/><br/>' +
                        'After giving the weird magic gorilla your peanut butter, he sighs again. He tells you he wishes ' +
                        'he had more peanut butter.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['sadgorilla-nopeanutbutter'] = true;
                        player.data['sadgorilla-onepeanutbutter'] = true;
                        player.removeItem('peanut');
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: -1})
                    },
                    buttons: [
                        {
                            text: 'What a greedy jerk'
                        }
                    ]
                },
                /* sad gorilla, havent met before, have 2x peanut butter */
                {
                    chance: 0.4,
                    isAvailable: function() {
                        return !player.data['sadgorilla-nopeanutbutter']
                            && !player.data['sadgorilla-twopeanutbutter']
                            && player.countItems('peanut') >= 2;
                    },
                    flavourText: 'You encounter a sad looking gorilla on your walk. He tells you that he wished he had ' +
                        'some peanut butter and that he would greatly reward anyone who gave him some.<br/><br/>' +
                        'The greedy monkey takes two jars of your peanut butter. He then hands you a weird looking gadget before ' +
                        'leaping away while mumbling about launching a satellite.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['sadgorilla-nopeanutbutter'] = true;
                        player.data['sadgorilla-onepeanutbutter'] = true;
                        player.data['sadgorilla-twopeanutbutter'] = true;
                        player.removeItem('peanut');
                        player.removeItem('peanut');
                        player.items.push('accelerator');
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: 2})
                    },
                    buttons: [
                        {
                            text: 'I\'m sure he knows what he\'s doing'
                        }
                    ]
                },
                /* sad gorilla, have met before, have 1x peanut butter*/
                {
                    chance: 1,
                    score: 2,
                    isAvailable: function() {
                        return player.data['sadgorilla-nopeanutbutter']
                            && !player.data['sadgorilla-onepeanutbutter']
                            && player.countItems('peanut') == 1;
                    },
                    flavourText: 'You bump into that magical gorilla again. He still looks sad.<br/><br/>' +
                        'After giving him your peanut butter, he sighs again. He tells you he wishes ' +
                        'he had more peanut butter.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['sadgorilla-nopeanutbutter'] = true;
                        player.data['sadgorilla-onepeanutbutter'] = true;
                        player.removeItem('peanut');
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: -1})
                    },
                    buttons: [
                        {
                            text: 'The cheek of this guy?'
                        }
                    ]
                },
                /* sad gorilla, have met before, have given 1 peanut butter already, have 1x peanut butter*/
                {
                    chance: 1,
                    score: 2,
                    isAvailable: function() {
                        return player.data['sadgorilla-nopeanutbutter']
                            && player.data['sadgorilla-onepeanutbutter']
                            && !player.data['sadgorilla-twopeanutbutter']
                            && player.countItems('peanut') >= 1;
                    },
                    flavourText: 'You find the gorilla again. He looks at you expectantly.<br/><br/>' +
                        'You give the greedy jerk another jar of your peanut butter. He hands you a weird looking gadget before ' +
                        'leaping away while mumbling about launching a satellite.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['sadgorilla-nopeanutbutter'] = true;
                        player.data['sadgorilla-onepeanutbutter'] = true;
                        player.data['sadgorilla-twopeanutbutter'] = true;
                        player.items.push('accelerator');
                        player.removeItem('peanut');
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: 1})
                    },
                    buttons: [
                        {
                            text: 'This better be worth it'
                        }
                    ]
                },
                /* sad gorilla, have met before, have 2x peanut butter*/
                {
                    chance: 1,
                    score: 2,
                    isAvailable: function() {
                        return player.data['sadgorilla-nopeanutbutter']
                            && !player.data['sadgorilla-onepeanutbutter']
                            && !player.data['sadgorilla-twopeanutbutter']
                            && player.countItems('peanut') >= 2;
                    },
                    flavourText: 'You find the gorilla again, looking sad. Don\'t worry magical gorilla; you are here to brighten his day.<br/><br/>' +
                    'You offer him one of your peanut butter jars but he demands both and snatches them away before you can do anything. ' +
                    'He finally hands you a weird looking gadget then leaps away mumbling about launching a satellite.',
                    apply: function() {
                        player.changeSalt(-100);
                        player.changeSecondsRemaining(-20);
                        player.data['sadgorilla-nopeanutbutter'] = true;
                        player.data['sadgorilla-onepeanutbutter'] = true;
                        player.data['sadgorilla-twopeanutbutter'] = true;
                        player.items.push('accelerator');
                        player.removeItem('peanut');
                        player.removeItem('peanut');
                        return words.buildApplyReturn({time: -20, salt: -100, itemCount: 1})
                    },
                    buttons: [
                        {
                            text: 'You\'re welcome you stupid greedy gorilla'
                        }
                    ]
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