'use strict';

define(['app/model/player', 'app/model/words'], function(player, words) {

    var quests = {
        'winston-peanut1': {
            title: 'Did somebody say peanut butter?',
            description: 'There is a talking gorilla wandering around the park. He wishes somebody would bring him some peanut butter.',
            canComplete: function() {
                return player.countItems('peanut') >= 1;
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'After giving the weird magic gorilla your peanut butter, he sighs again. He tells you he wishes he had more peanut butter.',
                    apply: function() {
                        player.removeItem('peanut');
                        player.removeQuest('winston-peanut1');
                        player.addQuest('winston-peanut2');
                        return words.buildApplyReturn({itemCount: -1, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'What a greedy jerk'
                        }
                    ]
                }
            ]
        },
        'winston-peanut2': {
            title: 'More peanut butter!',
            description: 'The greedy magic monkey wants more peanut butter.',
            canComplete: function() {
                return player.countItems('peanut') >= 1;
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You give the cheeky prick another jar of your peanut butter. He hands you a bag of items before ' +
                        'leaping away while mumbling about launching a satellite.',
                    apply: function() {
                        player.removeItem('peanut');
                        player.removeQuest('winston-peanut2');
                        player.addItem('bag-epic');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Did I just accidentally help North Korea?'
                        }
                    ]
                }
            ]
        },
        'soldier76-glasses': {
            title: 'The blind war veteran',
            description: 'An old blind man who claims to be a war veteran wants some fancy glasses. Not sure how it will fix his eyesight...',
            canComplete: function() {
                return player.countItems('visor') == 1
                    || player.countItems('glasses') == 1
                    || player.countItems('visor-data') == 1;
            },
            outcomes: [
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('visor-data') == 1 && player.countItems('glasses');
                    },
                    flavourText: 'The old man takes your sweet glasses and the stupid visor the dude from Star Wars wears. He starts jamming them together and before you know it ' +
                        'he has made a cool-looking visor! The man slips the visor over his eyes and immediately appears to be able to see again. Science!<br/><br/>He puts on a dirty ' +
                        'jacket with the number 76 printed on the back, hands you a gun and says "We\'re all soldiers now. Visit me again when you know how to use that thing."',
                    apply: function() {
                        player.removeItem('visor-data');
                        player.removeItem('glasses');
                        player.addItem('pistol');
                        player.addQuest('soldier76-robbery');
                        player.removeQuest('soldier76-glasses');
                        return words.buildApplyReturn({itemCount: 1, questCountAdded: 1});
                    },
                    buttons: [
                        {
                            text: 'Oh sweet a gun! Pchew pchew!'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('visor-data') == 1 && player.countItems('glasses') == 0;
                    },
                    flavourText: 'You hand him the novelty glasses the dude from Star Wars wears - Data or Picard or whatever his name is. The man sighs, thanks you quietly and ' +
                        'hands you a knapsack of items. He turns and walks away.<br/><br/>"The fight ain\'t over yet."',
                    apply: function() {
                        player.removeItem('visor-data');
                        player.removeQuest('soldier76-glasses');
                        player.addItem('bag-common');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Good luck in your space rumble Captain Kirk'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('glasses') == 1 && player.countItems('visor-data') == 0;
                    },
                    flavourText: 'You hand him your sweet glasses. He looks better already. The man just sighs and hands you a knapsack of items.<br/><br/>' +
                        '"Light\'s out," he says sadly.',
                    apply: function() {
                        player.removeItem('glasses');
                        player.removeQuest('soldier76-glasses');
                        player.addItem('bag-common');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'That was a little depressing'
                        }
                    ]
                }
            ]
        },
        'soldier76-robbery': {
            title: 'We\'re all soldiers now',
            description: 'The soldier has a mission for you both. He wants to stop a robbery happening at a nearby bank. Better keep that gun handy!',
            canComplete: function() {
                return player.countItems('pistol') == 1;
            },
            outcomes: [
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('gun-license') == 1;
                    },
                    flavourText: 'You and the soldier charge into the bank via the back door. While the soldier takes care of the criminals, you fire your gun ' +
                        'into the air repeatedly while yelling threats at both hostages and criminals.<br/><br/>After the robbery is dealt with, the soldier ' +
                        'thanks you for your time but says he will not be needing your services again on account of your total lack of usefulness. He hands you ' +
                        'a reward bag and sends you on your way.',
                    apply: function() {
                        player.removeQuest('soldier76-robbery');
                        player.addItem('bag-epic');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'This gun makes me feel like a big man'
                        }
                    ]
                },
                {
                    chance: 0.5,
                    isAvailable: function() {
                        return player.countItems('gun-license') == 0;
                    },
                    flavourText: 'You and the soldier charge into the bank via the back door. You run ahead, firing your gun into the air while screaming ' +
                        'various threats. After hearing your ridiculous war cries the robbers quickly make their escape.<br/><br/>' +
                        'The frustrated soldier makes you promise to never contact him again in exchange for a bag of goods.',
                    apply: function() {
                        player.removeQuest('soldier76-robbery');
                        player.addItem('bag-rare');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Why was he so mad?'
                        }
                    ]
                },
                {
                    chance: 0.5,
                    isAvailable: function() {
                        return player.countItems('gun-license') == 0;
                    },
                    flavourText: 'You and the soldier charge into the bank via the back door. You run ahead, firing your gun into the air while screaming ' +
                        'various threats. <br/><br/>A bullet ricochets off a wall and kills the soldier. You drop the gun and quietly flee the scene.',
                    apply: function() {
                        player.removeQuest('soldier76-robbery');
                    },
                    buttons: [
                        {
                            text: 'Why must I be so good at simple geometry?'
                        }
                    ]
                }
            ]
        },
        // @deprecated
        'roadhog-truck': {
            title: 'Fat Bane and the ice-cream truck',
            description: 'That weird cosplayer might want the bag that fell off the truck back.',
            canComplete: function() {
                return player.countItems('dollar-sign-bag') == 1
                    || player.countItems('dollar-sign-bag') == 0;
            },
            outcomes: [
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('dollar-sign-bag') == 1;
                    },
                    flavourText: [
                        'The fat idiot who was driving the ice-cream truck steps out from the shadows. He demands to know where the bag that fell ' +
                        'off his truck went.<br/><br/>You don\'t want to upset him so you give him his bag back. In exchange he offers you a bag of ' +
                        'junk he collected.'
                    ],
                    apply: function() {
                        player.addItem('bag-rare');
                        player.removeItem('dollar-sign-bag');
                        player.removeQuest('roadhog-truck');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'His Bane costume sucked'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('dollar-sign-bag') == 0;
                    },
                    flavourText: [
                        'The fat idiot who was driving the ice-cream truck steps out from the shadows. He demands to know where the bag that fell ' +
                        'off his truck went.<br/><br/>You tell fatty that you took the money and that if he wants it so bad he can chase you for it. ' +
                        'You are unaware he possesses a hook.<br/><br/> Fat Bane beats you up and takes your money.'
                    ],
                    apply: function() {
                        player.removeQuest('roadhog-truck');
                        var moneyStolen = player.money;
                        player.changeMoney(-moneyStolen);
                        return words.buildApplyReturn({money: -moneyStolen});
                    },
                    buttons: [
                        {
                            text: 'Ugh, that fat hog'
                        }
                    ]
                }
            ]
        },
        'blizzard-pizza': {
            title: 'Zoevia and Lylirra want pizza',
            description: 'The overworked Blizzard Community Managers are hungry from dealing with an incredibly salty community.',
            canComplete: function() {
                return player.countItems('pizza') >= 1;
            },
            outcomes: [
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('blizzard-fake-id') >= 1;
                    },
                    flavourText: 'You send a pizza to Blizzard HQ and slip the delivery driver a fake Blizzard ID badge so they can ' +
                        'get past the beta-hating guards at the front gate.<br/><br/>The driver reports that the delivery was a success ' +
                        'and hands you the gift bag that Blizzard gave him as a thanks.',
                    apply: function() {
                        player.removeItem('pizza');
                        player.removeItem('blizzard-fake-id');
                        player.removeQuest('blizzard-pizza');
                        player.addItem('bag-epic');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Guess they ignored the battle tag I wrote on the pizza box'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('blizzard-fake-id') == 0;
                    },
                    flavourText: 'You send a pizza to Blizzard HQ. Unfortunately the driver is turned away at the gate by a security guard. ' +
                        'The pizza gets cold and has to be thrown away.',
                    apply: function() {
                        player.removeItem('pizza');
                        return words.buildApplyReturn({itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'Damn it guards!'
                        }
                    ]
                }
            ]
        },
        'blizzard-button': {
            title: 'The Beta-Inviter-9000 has broken down!',
            description: 'Apparently Blizzard have created a complicated machine to send out Beta invites and it has broken ' +
                'down due to lack of use. They are appealing for anyone who can send in spare scrap metal so they can "patch it up", ' +
                'whatever that means.',
            canComplete: function() {
                return player.countItems('scrap') > 0;
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Blizzard, a billion dollar company, thanks you for your donation of scrap metal.',
                    apply: function() {
                        if (!player.data['blizzard-invite-machine']) {
                            player.data['blizzard-invite-machine'] = 0;
                        }
                        var scrapMod = 20; // 10 == need 10, 20 == need 5
                        var scrapCount = player.countItems('scrap');
                        var scrapNeeded = (100 - Number(player.data['blizzard-invite-machine'])) / scrapMod;

                        player.data['blizzard-invite-machine'] += (scrapCount * scrapMod);
                        if (Number(player.data['blizzard-invite-machine']) > 100) {
                            player.data['blizzard-invite-machine'] = 100;
                        }

                        var scrapUsed = 0;
                        if (scrapCount >= scrapNeeded) {
                            scrapUsed = scrapNeeded;
                        } else {
                            scrapUsed = scrapCount;
                        }

                        for (var i = 0; i < scrapUsed; i++) {
                            player.removeItem('scrap');
                        }

                        if (Number(player.data['blizzard-invite-machine']) == 100) {
                            player.removeQuest('blizzard-button');
                            player.addItem('bag-epic');
                            player.data['blizzard-invite-machine-complete'] = true;
                            return 'Because of your donation you have allowed Blizzard to fix their Beta-Inviter-9000 machine. But you do not get a Beta invite ' +
                                'for helping... that might be a little unfair to everyone who did not get to donate scrap.<br/><br/>' + words.buildApplyReturn({itemCount: 1});
                        } else {
                            return 'Their Beta-Inviter-9000 machine is currently ' + player.data['blizzard-invite-machine'] + '% repaired. Bring Blizzard more scrap to complete the turret.';
                        }
                    },
                    buttons: [
                        {
                            text: 'They should buy their own scrap...'
                        }
                    ]
                }
            ]

        },
        'reddit-spammer': {
            title: 'Stop the reddit spammer',
            description: 'The Overwatch subreddit is being spammed and the mods are asleep! Your friend Adrian182 is the culprit - he is very salty.',
            canComplete: function() {
                return true;
            },
            outcomes: [
                {
                    score: 2,
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('pizza') >= 1;
                    },
                    flavourText: 'You arrive at Adrian182\'s house to try and defuse the spammer situation before things escalate.<br/><br/>You offer him a pizza ' +
                        'in exchange for his spamming program and a small token of restitution for the community, which you intend on keeping for yourself.',
                    apply: function() {
                        player.removeItem('pizza');
                        player.removeQuest('reddit-spammer');
                        player.addItem('spam-script');
                        player.addItem('bag-common');
                        player.data['reddit-spammer-started'] = false;
                        return words.buildApplyReturn({itemCount: 2});
                    },
                    buttons: [
                        {
                            text: 'Pizza solves every problem!'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('pizza') == 0 && player.countItems('pistol') > 0;
                    },
                    flavourText: 'You arrive at Adrian182\'s house to try and defuse the spammer situation before things escalate.<br/><br/>Your friend refuses to ' +
                        'switch the program off so you pull your gun out and start firing it into the air to try to intimidate him. He panics and turns the program off. ' +
                        '<br/><br/>Since you\'ve already come this far you may as well rob him too? You take a bag of items from his house.',
                    apply: function() {
                        player.removeQuest('reddit-spammer');
                        player.addItem('bag-rare');
                        player.data['reddit-spammer-started'] = false;
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Guns solve every problem!'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('pizza') == 0 && player.countItems('pistol') == 0;
                    },
                    flavourText: 'You arrive at Adrian182\'s house to try and defuse the spammer situation.<br/><br/>He is far too salty for any meaningful discussion and ' +
                        'slams the door in your face.',
                    apply: function() {
                        player.removeQuest('reddit-spammer');
                    },
                    buttons: [
                        {
                            text: 'The salt is strong with him'
                        }
                    ]
                }
            ]
        },
        'dva-scrim': {
            title: 'D.Va needs to practice StarCraft 2',
            description: 'SC2 pro Hana Song needs a 1v1 partner! You were once ranked Silver so you\'re pretty sure can help.',
            canComplete: function() {
                return true;
            },
            outcomes: [
                {
                    chance: 0.7,
                    isAvailable: function() {
                        return player.countItems('blizzard-hacks') == 0;
                    },
                    flavourText: [
                        'You lose to a 4-pool rush in Zerg v Terran. You are defeated.',
                        'Her scouting drone kills all of your probes. You are defeated.',
                        'You are mauled by a 3-rax all in rush. You are defeated.'
                    ],
                    apply: function() {
                        player.removeQuest('dva-scrim');
                        player.addItem('bag-common');
                        player.data['beaten-by-dva'] = true;
                        return 'She thanks you for your time but says she doesn\'t need anymore practice with you.<br/><br/>' +
                            words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'WTF she is such a noob cheese user'
                        }
                    ]
                },
                {
                    chance: 0.3,
                    isAvailable: function() {
                        return player.countItems('blizzard-hacks') == 0;
                    },
                    flavourText: 'D.Va disconnects from the first game you play. She apologises when she logs back in ' +
                        'but you won\'t have a bar of it - you won that game by disconnect fair and square.<br/><br/>You announce ' +
                        'to the world that you are the new World Champion and that you are retiring from professional ' +
                        'StarCraft 2 play.<br/><br/>Blizzard give you a trophy in recognition of your status.',
                    apply: function() {
                        player.removeQuest('dva-scrim');
                        player.data['beat-dva'] = true;
                        player.addItem('sc2-trophy');
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'I am the champion!'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.countItems('blizzard-hacks') == 1;
                    },
                    flavourText: 'D.Va seems confident but you have a secret weapon: a SC2 hack developed by infamous leet hacker ' +
                        'Brother Chris!<br/><br/>Unfortunately all the maphack vision in the world can\'t make you a good player and you are ' +
                        'obliterated by mutalisks.<br/><br/>She thanks you for your time but says she doesn\'t need any more practice ' +
                        'with you.',
                    apply: function() {
                        player.removeQuest('dva-scrim');
                        player.addItem('bag-common');
                        player.data['beaten-by-dva'] = true;
                        return words.buildApplyReturn({itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Blizzard need to remove mutalisks from the game'
                        }
                    ]
                }
            ]
        },
        'torb-scrap': {
            title: 'Crazy man needs scrap!',
            description: 'The local mad scientist wants you to collect scrap metal for him so he can build a turret or a ' +
                'delorean time machine or something; you weren\'t really paying attention.',
            canComplete: function() {
                return player.countItems('scrap') > 0;
            },
            outcomes: [
                // TODO: split into two outcomes?
                {
                    chance: 1,
                    flavourText: 'The crazy scientist thanks you for your donation of scrap.',
                    apply: function() {
                        if (!player.data['torb-turret']) {
                            player.data['torb-turret'] = 0;
                        }

                        var scrapMod = 20; // 10 == need 10, 20 == need 5

                        var scrapCount = player.countItems('scrap');
                        var scrapNeeded = (100 - Number(player.data['torb-turret'])) / scrapMod;
                        //console.debug('scrapCount = %s', scrapCount);
                        //console.debug('scrapNeeded = %s', scrapNeeded);

                        // Update turret %
                        player.data['torb-turret'] += (scrapCount * scrapMod);
                        if (Number(player.data['torb-turret']) > 100) {
                            player.data['torb-turret'] = 100;
                        }

                        var scrapUsed = 0;
                        if (scrapCount >= scrapNeeded) {
                            scrapUsed = scrapNeeded;
                        } else {
                            scrapUsed = scrapCount;
                        }

                        // Remove scrap used
                        for (var i = 0; i < scrapUsed; i++) {
                            player.removeItem('scrap');
                        }
                        //console.debug('removed %s scrap', scrapUsed);

                        if (Number(player.data['torb-turret']) == 100) {
                            player.removeQuest('torb-scrap');
                            player.addItem('bag-epic');
                            player.data['torb-turret-complete'] = true;
                            return 'Because of your donations you have helped a local lunatic build a dangerous weapon! He hands you a bag of items as a thank you.<br/><br/>'
                                + words.buildApplyReturn({itemCount: 1});
                        } else {
                            return 'He tells you that his turrent is ' + player.data['torb-turret'] + '% complete. Bring him more scrap to complete the turret.';
                        }

                    },
                    buttons: [
                        {
                            text: 'What will he use it for?'
                        }
                    ]
                }
            ]
        },
        'slenderman': {
            title: 'The tall thin man',
            description: 'He saw you.',
            canComplete: function() {
                return false;
            }
        },
        'bastion-broken': {
            title: 'The broken robot',
            description: 'The (possibly criminally-) insane mad scientist wants to try and fix a "robot" he "found". He says it needs a bird to make it work again. ' +
                'You think he needs to be institutionalised.',
            canComplete: function() {
                return player.countItems('bird') == 1;
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You place the bird you found on top of the "robot". Nothing happens.<br/><br/>The scientist gets mad, calls it a "damn machine" and starts ' +
                        'hitting it with a wrench while the bird flies to the rafters for safety.<br/><br/>None the less, as a thank you he throws a pack of items on the floor, ' +
                        'announcing it as "armor here."',
                    apply: function() {
                        player.removeQuest('bastion-broken');
                        player.removeItem('bird');
                        player.addItem('bag-epic');
                        return words.buildApplyReturn({itemCount: 1});
                    }
                }
            ]
        },
        'lucio-party': {
            title: 'DJ needed for dancy party',
            description: 'Some famous DJ has bailed on his commitments to perform at a local dance party. Organisers are looking for a replacement, and you have heard ' +
                'Blizzard employees will be in attendance. What better way to guilt them into giving you Beta access?! You do not know what DJs do and what equipment they ' +
                'need though... you might need to do some research.',
            canComplete: function() {
                return true;
            },
            outcomes: [
                {
                    /* Did not buy anything */
                    chance: 1,
                    isAvailable: function() {
                        return !player.data['djset'];
                    },
                    flavourText: 'You arrive at the dance party without any training as a DJ or any equipment but declare yourself as the greatest DJ who has ever lived.<br/><br/> ' +
                        'The organisers foolishly let you on stage where you use the ten minutes allocated to your set to ask over the loud speakers if anyone from Blizzard ' +
                        'can give you a beta invite. <br/><br/>No one can hear your begging over the booing.',
                    apply: function() {
                        player.removeQuest('lucio-party');
                    },
                    buttons: [
                        {
                            text: 'That was off the hook'
                        }
                    ]
                },
                {
                    /* Bought dj equipment and nothing else */
                    chance: 1,
                    isAvailable: function() {
                        return player.data['djset']
                            && !player.data['djpractice1'];
                    },
                    flavourText: 'You arrive at the party with your DJ equipment and are ushered onto stage by the organisers. Things take a turn when you can\'t figure ' +
                        'out how to plug anything in, let alone actually use your equipment. <br/><br/>After a few awkward minutes you try to end your "set" with a big finale where you ' +
                        'smash your equipment like you saw some rock stars do once. No one is impressed.<br/><br/>As security drags you off stage you demand a beta invite from ' +
                        'any Blizzard employees in the crowd. No one can hear you over the booing.',
                    apply: function() {
                        player.removeQuest('lucio-party');
                        player.removeItem('djset');
                        return words.buildApplyReturn({itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'I broke it down!'
                        }
                    ]
                },
                {
                    /* Bought dj equipment and practice equipment but no songs */
                    chance: 1,
                    isAvailable: function() {
                        return player.data['djset']
                            && player.data['djpractice1']
                            && !player.data['djbeta'];
                    },
                    flavourText: 'You arrive at the party with your DJ equipment and a firm grasp of how to put it all together. As the organisers usher you onto stage you realise ' +
                        'that you have made a fatal error: you do not have any songs to play. A salty rage overcomes you and you trash your equipment in front of a clearly uncomfortable ' +
                        'crowd.<br/><br/>Security drags you off the stage when you turn your rage on the crowd and start screaming about Overwatch beta invites.',
                    apply: function() {
                        player.removeQuest('lucio-party');
                        player.removeItem('djset');
                        player.changeSalt(20);
                        return words.buildApplyReturn({itemCount: -1, salt: 20});
                    },
                    buttons: [
                        {
                            text: 'Idiots! Savages! I am legend!'
                        }
                    ]
                },
                {
                    /* Have everything */
                    chance: 1,
                    isAvailable: function() {
                        return player.data['djset']
                            && player.data['djpractice1']
                            && player.data['djbeta'];
                    },
                    flavourText: 'You arrive at the party and are ushered onto stage by the organisers. You press PLAY and pretend to fiddle with the dials and ' +
                        'knobs while awkwardly flailing about to show off your sick dance moves. An electronic voice you set up shouts your Battle.net ID every few seconds, ' +
                        'practically ruining the song.<br/><br/>A muted reception from the crowd causes your saltiness to overcome you - you kick over your equipment and trash the stage. ' +
                        'Organisers drag you off stage and give you a gift bag and make you promise you never tell anyone they let you DJ for them at one of their parties.',
                    apply: function() {
                        player.removeQuest('lucio-party');
                        player.removeItem('djset');
                        player.addItem('bag-epic');
                        player.changeSalt(20);
                        return words.buildApplyReturn({itemCount: 1, salt: 20});
                    },
                    buttons: [
                        {
                            text: 'Woo! You feel that? Anyone?'
                        }
                    ]
                }
            ]
        },
        'widow-reaper-bossfight': {
            title: 'Attack on the museum',
            description: 'A purple alien and the grim reaper are trying to steal something from the local museum! Any heroes you have assisted in previous quests will ' +
                'join you on this quest.',
            canComplete: function() {
                return true
            },
            outcomes: [
                {

                }
            ]
        }
    };

    function getQuest(code) {
        return quests[code];
    }

    return {
        getQuest: getQuest
    }

});