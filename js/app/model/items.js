'use strict';

define(['app/model/player', 'app/model/words', 'app/util/random'], function(player, words, random) {

    // TODO: Salty pants - increases your salt generation but every N seconds increase your beta chance
    // TODO: on Tick applications


    function spawnLootFromTable(table) {
        if (table.length == 0) {
            console.error('Loot table %O is empty', table);
            return 0;
        }
        var count = 0;
        for (var i = 0; i < table.length; i++) {
            var group = table[i];
            if (group.chance && Math.random() < group.chance) {
                var itemRef = random.randomArray(group.options);
                player.items.push(itemRef);
                count++;
            }
        }
        return count;
    }

    var items = {
        'stale-water': {
            title: 'Stale water',
            description: 'Lowers your saltiness by -30%. Tastes awful though.',
            outcomes: [
                {
                    chance: 0.7,
                    flavourText: 'You slam down what you assume is water.',
                    apply: function() {
                        player.changeSalt(-30);
                        player.removeItem('stale-water');
                        return words.buildApplyReturn({salt: -30, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'That wasn\'t water'
                        }
                    ]
                },
                {
                    chance: 0.3,
                    flavourText: 'You forget you have a tiny bladder and have to rush to the bathroom.',
                    apply: function() {
                        player.changeSecondsRemaining(-30);
                        player.removeItem('stale-water');
                        return words.buildApplyReturn({time: -30, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'Maybe that wasn\'t actually water?'
                        }
                    ]
                }
            ]
        },
        'clover': {
            title: 'Seven-leaf clover',
            description: 'Increases your chances of getting into the beta by 10%.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You eat the clover to gain its power.',
                    apply: function() {
                        player.changeBetaChance(0.1);
                        player.removeItem('clover');
                        return words.buildApplyReturn({beta: 0.1, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'You didn\'t have to eat it'
                        }
                    ]
                }
            ]
        },
        'origins': {
            title: 'Overwatch: Origins edition',
            description: 'You have prepurchased Overwatch. This item literally does nothing. It certainly doesn\'t guarantee Beta access, right Blizzard? :(',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'RED! This isn\'t the time to use that!',
                    apply: function() {},
                    buttons: [
                        {
                            text: 'Yes Lord Helix'
                        }
                    ]
                }
            ]
        },
        'berry': {
            title: 'A berry',
            description: 'Probably safe to eat.',
            outcomes: [
                {
                    chance: 0.66,
                    flavourText: 'Ew, it\'s all salty.',
                    apply: function() {
                        player.changeSalt(5);
                        player.removeItem('berry');
                        return words.buildApplyReturn({salt: 5, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'Why did it have salt in it?'
                        }
                    ]
                },
                {
                    chance: 0.32,
                    flavourText: 'Oh lucky, it wasn\'t one of the poisonous berries.',
                    apply: function() {
                        player.changeSalt(-5);
                        player.removeItem('berry');
                        return words.buildApplyReturn({salt: -5, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'I should eat another one.'
                        }
                    ]
                },
                {
                    chance: 0.01,
                    flavourText: 'This is a poisonous berry.',
                    apply: function() {
                        player.data['beta'] = true; // HACK
                        player.data['deadberry'] = true;
                        player.removeItem('berry');
                        return 'You have died.';
                    },
                    buttons: [
                        {
                            text: 'Wait, seriously?'
                        }
                    ]
                }
            ]
        },
        'beard': {
            title: 'Beard of Jeff Kaplan',
            description: 'Return the beard. Complete the circle. Release me from this prison!',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'NOW WE ARE ONE.',
                    apply: function() {
                        player.removeItem('beard');
                        player.data['isjkapp'] = true;
                        player.data['beta'] = true;
                    },
                    buttons: [
                        {
                            text: 'NOW WE ARE ONE'
                        }
                    ]
                }
            ]
        },
        'briefcase': {
            title: 'A mysterious briefcase',
            description: 'It is very mysterious. Also who even uses briefcases these days?',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Oh wow there is $5,000 in this thing!',
                    apply: function() {
                        player.changeMoney(5000);
                        player.removeItem('briefcase');
                        return words.buildApplyReturn({money: 5000, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'I should probably keep the money'
                        }
                    ]
                }
            ]
        },
        'puppet': {
            title: 'Ginger puppet',
            description: 'You could start a Youtube series with this puppet.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You have endeared yourself to the Overwatch CMs.',
                    apply: function() {
                        player.removeItem('puppet');
                        player.changeBetaChance(0.05);
                        return words.buildApplyReturn({beta: 0.05, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'On Solace is actually pretty funny.'
                        }
                    ]
                }
            ]
        },
        'deadbook': {
            title: 'Book of the salt',
            description: 'It is a salt cookbook by the looks of it.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You hear voices as you open the dusty tome. The darkness has found you.',
                    apply: function() {
                        player.data['darkness'] += 10;
                        player.data['deadbookread'] = true;
                        player.removeItem('deadbook');
                        return words.buildApplyReturn({itemCount: -1}) + 'New items for sale at shop.'
                    },
                    buttons: [
                        {
                            text: 'This is fine'
                        }
                    ]
                }
            ]
        },
        'spell-increasechance': {
            title: 'Salt spell of chance',
            description: 'Increases your Beta chances...',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Sodium chloride crystalline beta salinity!',
                    apply: function() {
                        player.data['darkness'] += 10;
                        player.removeItem('spell-increasechance');
                        player.changeBetaChance(0.2);
                        player.changeSalt(40);
                        return words.buildApplyReturn({itemCount: -1, beta: 0.2, salt: 40});
                    },
                    buttons: [
                        {
                            text: 'Yes...'
                        }
                    ]
                }
            ]
        },
        'spell-increasemoney': {
            title: 'Salt spell of currency',
            description: 'Increases your money...',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Sodium chloride crystalline currency salinity mines!',
                    apply: function() {
                        player.data['darkness'] += 10;
                        player.removeItem('spell-increasemoney');
                        player.changeMoney(1000);
                        player.changeSalt(40);
                        return words.buildApplyReturn({itemCount: -1, money: 1000, salt: 40});
                    },
                    buttons: [
                        {
                            text: 'I need more...'
                        }
                    ]
                }
            ]
        },
        'spell-mindcontrol': {
            title: 'Salt spell of control',
            description: 'Attempt to mind-control a Blizzard CM...',
            outcomes: [
                {
                    chance: 0.1,
                    flavourText: 'Chlorine $$CM beta salinity halite sodium!',
                    apply: function() {
                        player.data['darkness'] += 100; // doesn't matter anyway but just for completeness
                        player.removeItem('spell-mindcontrol');
                        player.data['beta'] = true;
                        player.data['mindcontrol'] = true;
                        player.data['mindcontrolpass'] = true;
                        return 'Using your dark powers of salt you command her to give you Beta.'
                    },
                    buttons: [
                        {
                            text: 'Please forgive me'
                        }
                    ]
                },
                {
                    chance: 0.9,
                    flavourText: 'Chlorine $$CM beta salinity halite sodium!',
                    apply: function() {
                        player.data['darkness'] += 100; // doesn't matter anyway but just for completeness
                        player.removeItem('spell-mindcontrol');
                        player.changeSalt(40);
                        player.data['mindcontrol'] = true;
                        return words.buildApplyReturn({itemCount: -1, salt: 40}) + 'Your spell fails to control the ' +
                            'strong-willed CM. You have gone too far.';
                    },
                    buttons: [
                        {
                            text: 'What have I done?'
                        }
                    ]
                }
            ]
        },
        'djset': {
            title: 'Lucio\'s DJ Tabletop Player',
            description: 'It will be off the hook when you awkwardly use this thing.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You own it! Now you must buy some songs to use on it!',
                    apply: function() {}
                }
            ]
        },
        'djbricks': {
            title: 'A box full of bricks',
            description: 'A permanent reminder of a poor decision.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Blinded by rage, you throw the bricks through the windows of a local Brazilian restaurant ' +
                        'that you assume Lucio owns because you are a racist.',
                    apply: function() {
                        player.removeItem('djbricks');
                        player.data['brickrage'] = true;
                        player.data['beta'] = true; // hack
                        return words.buildApplyReturn({itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'They called the cops on me?'
                        }
                    ]
                }
            ]
        },
        'djpractice1': {
            title: '[SONG] Learning to Pretend to Play A DJ Tabletop Player',
            description: 'Mandatory practice before you can get stuck into pretending to play real songs! This song is 30 seconds in length.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'It is just a voice recording of some guy telling you how to plug everything in.',
                    apply: function() {
                        player.removeItem('djpractice1');
                        player.data['djpractice1'] = true;
                        player.changeSecondsRemaining(-30);
                        return words.buildApplyReturn({itemCount: -1, time: -30});
                    },
                    buttons: [
                        {
                            text: 'I think I have been ripped off'
                        }
                    ]
                }
            ]
        },
        'djbeta': {
            title: '[SONG] We Are Salty Together As One',
            description: 'Let\'s drop the beat or something? This song is 30 seconds in length and will increase your beta chances by 10%.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You press PLAY and pretend to fiddle with the dials and knobs. Everyone around you is distracted by the loud music ' +
                        'you are obnoxiously playing at your desk.<br/><br/>Hopefully someone from Blizzard hears this... somehow.',
                    apply: function() {
                        player.removeItem('djbeta');
                        player.changeBetaChance(0.10);
                        player.changeSecondsRemaining(-30);
                        return words.buildApplyReturn({itemCount: -1, beta: 0.10, time: -30});
                    },
                    buttons: [
                        {
                            text: 'Woo, you feel that? Anyone?'
                        }
                    ]
                }
            ]
        },

        /* new items */
        'bag-common': {
            title: 'A common bag of goods',
            description: 'Open this bag to receive common, boring loot.',
            outcomes: [
                {
                    chance: 1,
                    apply: function() {
                        var itemCount = spawnLootFromTable([
                            {
                                chance: 1,
                                options: ['scrap', 'berry']
                            },
                            {
                                chance: 0.5,
                                options: ['time-berry']
                            }
                        ]);
                        player.removeItem('bag-common');
                        return words.buildApplyReturn({itemCount: itemCount})
                    }
                }
            ]
        },
        'bag-rare': {
            // TODO
            title: 'Bag-rare',
            description: 'Bag-rare'
        },
        'bag-epic': {
            // TODO
            title: 'Bag-epic',
            description: 'Bag-epic'
        },
        'bag-gift': {
            title: 'Bag-blizz gift',
            description: 'Bag-blizz gift'
        },
        'sc2-trophy': {
            title: 'Starcraft 2 World Champion trophy',
            description: 'Awarded to you for defeating reigning world champion D.Va.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Hey, there is a hidden compartment in this trophy! Inside is a note from Blizzard which reads:<br/><br/>' +
                        '"Congratulations on all your success. As a thank you for being better than all the other garbage ' +
                        'that plays our games we are increasing your beta chance odds for all future games by 10%!".',
                    apply: function() {
                        player.removeItem('sc2-trophy');
                        player.changeBetaChance(0.1);
                        return words.buildApplyReturn({itemCount: -1, beta: 0.1});
                    },
                    buttons: [
                        {
                            text: 'Even world champs aren\'t guaranteed access?'
                        }
                    ]
                }
            ]
        },
        'accelerator': {
            title: 'Miniature chronal accelerator',
            description: 'Gives you an additional 60 seconds of time and increases your beta chances by 1%.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Let\'s try that again!',
                    apply: function() {
                        player.removeItem('accelerator');
                        player.changeSecondsRemaining(60);
                        player.changeBetaChance(0.01);
                        return words.buildApplyReturn({time: 60, itemCount: -1, beta: 0.01});
                    },
                    buttons: [
                        {
                            text: 'Whee!'
                        }
                    ]
                }
            ]
        },
        'visor-data': {
            title: 'A novelty visor',
            description: 'It is a visor from a costume to dress up as Data from Star Trek: The Next Generation.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: '"Danger, Will Robinson!"'
                }
            ]
        },
        'glasses': {
            title: 'Stylish glasses',
            description: 'You feel like you\'re gonna get lucky wearing these glasses.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Oh yeah bro those are sweet.',
                    buttons: [
                        {
                            text: 'You PC bro?'
                        }
                    ]
                }
            ]
        },
        'pistol': {
            title: 'P228 Pistol',
            description: 'It\'s a simple little pistol. It is also magic, so you don\'t have to buy bullets.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'No one is going to mess with you anymore! Pchew pchew pchew! Zzzzap!'
                }
            ]
        },
        'gun-license': {
            title: 'Gun license',
            description: 'Gives you permission to carry a gun. It also comes with a handy instruction manual on how to use guns.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: '"Step 1: Pull trigger". That\'s all the manual says?'
                }
            ]
        },
        'pizza': {
            title: 'Ham and pineapple pizza',
            description: 'Good pizza from a local pizza store. Lowers your saltiness by -5%.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Pizzacapers in Australia > all',
                    apply: function() {
                        player.removeItem('pizza');
                        player.changeSalt(-5);
                        return words.buildApplyReturn({itemCount: -1, salt: -5});
                    }
                }
            ]
        },
        'blizzard-fake-id': {
            title: 'Fake Blizzard ID badge',
            description: 'Someone has cleary just photocopied a real badge and sticky-taped it to a piece of plastic. I don\'t think ' +
                'anyone will believe this.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'The badge name says David Clyde. That doesn\'t even sound like a real name!'
                }
            ]
        },
        'dollar-sign-bag': {
            title: 'A bag with a dollar sign on it',
            description: 'Kind of inconspicuous isn\'t it?',
            outcomes: [
                {
                    chance: 0.5,
                    flavourText: 'A dye pack explodes in your face. Most of the money still seems OK! But you can\'t help feel salty at being covered ' +
                        'in paint.',
                    apply: function() {
                        player.removeItem('dollar-sign-bag');
                        player.changeSalt(20);
                        player.changeMoney(130);
                        player.data['dollar-sign-bag-open'] = true;
                        return words.buildApplyReturn({itemCount: -1, salt: 20, money: 130});
                    },
                    buttons: [
                        {
                            text: 'I am sure no one is looking for this money'
                        }
                    ]
                },
                {
                    chance: 0.5,
                    flavourText: 'Wow it actually is full of money.',
                    apply: function() {
                        player.removeItem('dollar-sign-bag');
                        player.changeMoney(150);
                        player.data['dollar-sign-bag-open'] = true;
                        return words.buildApplyReturn({itemCount: -1, money: 150});
                    },
                    buttons: [
                        {
                            text: 'Yay free money'
                        }
                    ]
                }
            ]
        },
        'peanut': {
            title: 'Peanut butter',
            description: 'Lower\'s your saltiness by -5% and makes gorillas happy.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Why would a gorilla eat this?',
                    apply: function() {
                        player.removeItem('peanut');
                        player.changeSalt(-5);
                        return words.buildApplyReturn({salt: -5, itemCount: -1});
                    }
                }
            ]
        },
        'spam-script': {
            title: 'An executable program that spams /r/overwatch',
            description: 'Seems pretty easy to use - double click the exe and watch it go!',
            onTick10: function() {
                if (player.data['self-spammer']) {
                    if (!player.data['self-spammer-count']) {
                        player.data['self-spammer-count'] = 0;
                    }
                    player.data['self-spammer-count']++;
                    if (Number(player.data['self-spammer-count']) >= 3) {
                        player.data['self-spammer-banned'] = true;
                        player.data['game-over'] = true;
                    }
                }
            },
            outcomes: [
                {
                    chance: 1,
                    isAvailable: function() {
                        return !player.data['self-spammer'];
                    },
                    flavourText: 'Let\'s just give it a little test...',
                    apply: function() {
                        player.data['reddit-spammer-started'] = true;
                        player.data['self-spammer'] = true;
                    },
                    buttons: [
                        {
                            text: 'Oh crap how do I stop it'
                        }
                    ]
                },
                {
                    chance: 1,
                    isAvailable: function() {
                        return player.data['self-spammer'];
                    },
                    flavourText: 'Oh god how do I turn it off?!?',
                    apply: function() {
                    },
                    buttons: [
                        {
                            text: 'Now I wish I paid attention in hacker club'
                        }
                    ]
                }
            ]
        },
        'blizzard-hacks': {
            title: 'A collection of Blizzard game hacks',
            description: 'Now we shall see who the scrublord is!',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Oh man you have to edit config files and stuff? This looks hard.'
                }
            ]
        },
        'scrap': {
            title: 'Scrap metal',
            description: 'Just a useless piece of scrap metal.',
            outcomes: [
                {
                    chance: 0.99,
                    flavourText: 'This stuff is sharp. You should be careful when handling it.'
                },
                {
                    chance: 0.01,
                    flavourText: 'You cut yourself on a sharp edge while playing with the scrap metal. You bleed out and die.',
                    apply: function() {
                        player.data['game-over'] = true;
                        player.data['scrap-metal-dead'] = true;
                    },
                    buttons: [
                        {
                            text: 'ARE YOU SERIOUS? THIS GAME SUCKS.'
                        }
                    ]
                }
            ]
        },
        'mineral-water': {
            title: 'Mineral water',
            description: 'Lowers your saltiness by -10%. At least I think it does. Is salt a mineral? Does mineral water... contain salt? Oh god...',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Salt is a mineral but let\'s just say this water does not have any.',
                    apply: function() {
                        player.changeSalt(-10);
                        player.removeItem('mineral-water');
                        return words.buildApplyReturn({salt: -10, itemCount: -1});
                    }
                }
            ]
        },
        'time-berry': {
            title: 'Time berry',
            description: 'Increases your time remaining by 5 seconds.',
            outcomes: [
                {
                    chance: 0.8,
                    flavourText: 'You feel reality distort around you. That is one magical berry.',
                    apply: function() {
                        player.changeSecondsRemaining(5);
                        player.removeItem('time-berry');
                        return words.buildApplyReturn({time:5});
                    }
                },
                {
                    chance: 0.2,
                    flavourText: 'Nothing happens. This berry must have gone bad.',
                    apply: function() {
                        player.removeItem('time-berry');
                    }
                }
            ]
        }
    };

    return {
        get: items
    }
});