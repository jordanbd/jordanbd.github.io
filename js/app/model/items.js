'use strict';

define(['app/model/player', 'app/model/words', 'app/util/random', 'app/model/common'], function(player, words, random, common) {

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
                        player.changeBetaChance(common.BETA.VERY_HIGH);
                        player.removeItem('clover');
                        return words.buildApplyReturn({beta: common.BETA.VERY_HIGH, itemCount: -1});
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
            description: 'Apparently "Lucio" is the brand? That\'s probably good right? It will be off the hook when you awkwardly use this thing.',
            rarity: 'quest',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'How hard could it be to use this?'
                }
            ]
        },
        'djbricks': {
            title: 'A box full of bricks',
            description: 'A permanent reminder of a poor decision.',
            rarity: 'quest',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Blinded by salty rage, you throw the bricks through the windows of a local Brazilian restaurant ' +
                        'that you assume is affiliated with this "Lucio" DJ brand.<br/><br/>Because you are a racist.',
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
            title: 'My First Rave: How to use a tabletop player',
            description: 'Teaches you how to use a tabletop player so you don\'t make a complete moron of yourself.',
            rarity: 'quest',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'It is just a voice recording of some guy telling you how to plug everything in.',
                    apply: function() {
                        player.removeItem('djpractice1');
                        player.data['djpractice1'] = true;
                        return words.buildApplyReturn({itemCount: -1});
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
            title: 'Song - We Are Salty As One',
            description: 'It\'s a USB stick with an MP3 on it.',
            rarity: 'quest',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'The USB also has an executable on it named "Titan". What the?', // fixme
                }
            ]
        },


        'bag-common': {
            title: 'Common bag of goods',
            description: 'Open this bag to receive common, boring items.',
            rarity: 'common',
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
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 0.8,
                                options: ['time-berry', 'beta-bite']
                            }
                        ]);
                        player.removeItem('bag-common');
                        return words.buildApplyReturn({itemCount: itemCount})
                    }
                }
            ]
        },
        'bag-rare': {
            title: 'Rare bag of goods',
            description: 'Open this bag to receive rare items.',
            rarity: 'rare',
            outcomes: [
                {
                    chance: 1,
                    apply:function() {
                        var itemCount = spawnLootFromTable([
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['time-berry', 'time-berry', 'time-berry', 'beta-bite']
                            },
                            {
                                chance: 1,
                                options: ['beta-bite']
                            }
                        ]);
                        player.removeItem('bag-rare');
                        return words.buildApplyReturn({itemCount: itemCount})
                    }
                }
            ]
        },
        'bag-epic': {
            title: 'Epic bag of goods',
            description: 'Open this bag to receive epic items.',
            rarity: 'epic',
            outcomes: [
                {
                    chance: 1,
                    apply:function() {
                        // TODO MORE
                        var itemCount = spawnLootFromTable([
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['time-berry', 'time-berry', 'time-berry', 'beta-bite']
                            },
                            {
                                chance: 1,
                                options: ['salt-sacrifice', 'four-clover']
                            },
                            {
                                chance: 1,
                                options: ['accelerator', 'money-with-salt']
                            }
                        ]);
                        player.removeItem('bag-epic');
                        return words.buildApplyReturn({itemCount: itemCount})
                    }
                }
            ]
        },
        'bag-gift': {
            title: 'Bag-blizz gift',
            description: 'Bag-blizz gift',
            rarity: 'epic',
            outcomes: [
                {
                    chance: 1,
                    apply:function() {
                        // TODO MORE
                        var itemCount = spawnLootFromTable([
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['time-berry', 'time-berry', 'time-berry', 'beta-bite']
                            },
                            {
                                chance: 1,
                                options: ['salt-sacrifice', 'four-clover']
                            },
                        ]);
                        player.removeItem('bag-gift');
                        return words.buildApplyReturn({itemCount: itemCount})
                    }
                }
            ]
        },

        /* new items */

        'sc2-trophy': {
            title: 'Starcraft 2 World Champion trophy',
            description: 'Awarded to you for defeating reigning world champion D.Va.',
            rarity: 'epic',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Hey, there is a hidden compartment in this trophy! Inside is a note from Blizzard which reads:<br/><br/>' +
                        '"Congratulations on all your success. As a thank you for being better than all the other garbage ' +
                        'that plays our games we are increasing your beta chance odds for all future games by ' +
                        words.betaChanceValue(common.BETA.VERY_HIGH) + '!".',
                    apply: function() {
                        player.removeItem('sc2-trophy');
                        player.changeBetaChance(common.BETA.VERY_HIGH);
                        return words.buildApplyReturn({itemCount: -1, beta: common.BETA.VERY_HIGH});
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
            description: 'Gives you an additional 60 seconds of time and increases your beta chances by ' + words.betaChanceValue(common.BETA.LOW) + '.',
            rarity: 'epic',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Let\'s try that again!',
                    apply: function() {
                        player.removeItem('accelerator');
                        player.changeSecondsRemaining(60);
                        player.changeBetaChance(common.BETA.LOW);
                        return words.buildApplyReturn({time: 60, itemCount: -1, beta: common.BETA.LOW});
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
            rarity: 'common',
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
            rarity: 'common',
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
            rarity: 'quest',
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
            rarity: 'common',
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
            rarity: 'common',
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
            rarity: 'common',
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
            rarity: 'quest',
            outcomes: [
                {
                    chance: 0.5,
                    flavourText: 'A dye pack explodes in your face. Most of the items still seem OK! But you can\'t help feel salty at being covered ' +
                        'in paint.',
                    apply: function() {
                        player.removeItem('dollar-sign-bag');
                        player.changeSalt(20);
                        player.data['dollar-sign-bag-open'] = true;

                        var itemCount = spawnLootFromTable([
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['time-berry', 'time-berry', 'time-berry', 'beta-bite']
                            },
                            {
                                chance: 1,
                                options: ['salt-sacrifice', 'four-clover']
                            },
                            {
                                chance: 1,
                                options: ['accelerator', 'money-with-salt']
                            }
                        ]);

                        return words.buildApplyReturn({itemCount: itemCount, salt: 20});
                    },
                    buttons: [
                        {
                            text: 'I am sure no one is looking for this'
                        }
                    ]
                },
                {
                    chance: 0.5,
                    flavourText: 'Oooh! Items!',
                    apply: function() {
                        player.removeItem('dollar-sign-bag');
                        var itemCount = spawnLootFromTable([
                            {
                                chance: 1,
                                options: ['scrap']
                            },
                            {
                                chance: 1,
                                options: ['time-berry', 'time-berry', 'time-berry', 'beta-bite']
                            },
                            {
                                chance: 1,
                                options: ['salt-sacrifice', 'four-clover']
                            },
                            {
                                chance: 1,
                                options: ['accelerator', 'money-with-salt']
                            }
                        ]);
                        player.data['dollar-sign-bag-open'] = true;
                        return words.buildApplyReturn({itemCount: itemCount});
                    },
                    buttons: [
                        {
                            text: 'Yay free items'
                        }
                    ]
                }
            ]
        },
        'peanut': {
            title: 'Peanut butter',
            description: 'Lower\'s your saltiness by -5% and makes gorillas happy.',
            rarity: 'common',
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
            rarity: 'rare',
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
            rarity: 'common',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Oh man you have to edit config files and stuff? This looks hard.'
                }
            ]
        },

        /* loot items */
        'scrap': {
            title: 'Scrap metal',
            description: 'Just a useless piece of scrap metal.',
            rarity: 'common',
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
            rarity: 'common',
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
            description: 'Increases your time remaining by 15 seconds.',
            rarity: 'common',
            outcomes: [
                {
                    chance: 0.8,
                    flavourText: 'You feel reality distort around you. That is one magical berry.',
                    apply: function() {
                        player.changeSecondsRemaining(15);
                        player.removeItem('time-berry');
                        return words.buildApplyReturn({time: 15, itemCount: -1});
                    }
                },
                {
                    chance: 0.2,
                    flavourText: 'Nothing happens. This berry must have gone bad.',
                    apply: function() {
                        player.removeItem('time-berry');
                        return words.buildApplyReturn({itemCount: -1});
                    }
                }
            ]
        },
        'cadbury-creme-egg': {
            title: 'Cadbury Creme Egg',
            description: 'The best chocolate egg around. Resets your saltiness to zero.',
            rarity: 'rare',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'What does this have to do with Overwatch?',
                    apply: function() {
                        player.changeSalt(-100);
                        player.removeItem('cadbury-creme-egg');
                        return words.buildApplyReturn({salt: -100, itemCount: -1})
                    }
                }
            ]
        },
        'four-clover': {
            title: 'Four-leaf clover',
            description: 'Increases your chances of getting into the beta by ' + words.betaChanceValue(common.BETA.MEDIUM) + '.',
            rarity: 'rare',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You eat the clover to gain its power.',
                    apply: function() {
                        player.changeBetaChance(common.BETA.MEDIUM);
                        player.removeItem('four-clover');
                        return words.buildApplyReturn({beta: common.BETA.MEDIUM, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'You didn\'t have to eat it'
                        }
                    ]
                }
            ]
        },
        'beta-bite': {
            title: 'Schmackos',
            description: 'A yummy treat for dogs that for some reason increases your beta chances by ' + words.betaChanceValue(common.BETA.VERY_LOW) + '.',
            rarity: 'rare',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Dogs go whacko for schmakos!',
                    apply: function() {
                        player.changeBetaChance(common.BETA.VERY_LOW);
                        player.removeItem('beta-bite');
                        return words.buildApplyReturn({beta: common.BETA.VERY_LOW, itemCount: -1});
                    }
                }
            ]
        },
        'salt-sacrifice': {
            title: 'Potion of Salt Sacrifice',
            description: 'For every 10% of saltiness you have, increase your beta chances by ' + words.betaChanceValue(common.BETA.LOW) + ' up to a maximum of ' +
                words.betaChanceValue(common.BETA.LOW * 5) + '. Saltiness is NOT lowered by this potion.',
            rarity: 'rare',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Your salt gives you focus and makes you stronger.',
                    apply: function() {
                        var saltyPts = Math.floor(player.salt / 10);
                        var betaChance = common.BETA.LOW * saltyPts;
                        if (betaChance > (common.BETA.LOW * 5)) {
                            betaChance = (common.BETA.LOW * 5);
                        }
                        player.changeBetaChance(betaChance);
                        player.removeItem('salt-sacrifice');
                        return words.buildApplyReturn({beta: betaChance, itemCount: -1});
                    }
                }
            ]
        },
        'money-with-salt': {
            title: 'Wallet of Salt',
            description: 'While you have this item in your inventory every time you increase in saltiness you gain the same amount of money.',
            rarity: 'epic',
            onSaltChange: function(amt) {
                if (amt > 0) {
                    player.changeMoney(amt);
                }
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Even wallets can be salty.'
                }
            ]
        },
        'beta-with-time': {
            title: ''
        },
        'bird': {
            title: 'Annoying bird',
            description: 'A bird has followed you home. It won\'t leave you alone.',
            rarity: 'quest',
            outcomes: [
                {
                    chance: 1,
                    flavourText: '*chirp*',
                    buttons: [
                        {
                            text: 'SHUT UP BIRD'
                        }
                    ]
                }
            ]
        }
    };

    return {
        get: items
    }
});