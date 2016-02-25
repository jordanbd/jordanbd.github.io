'use strict';

define(['app/model/player', 'app/model/words'], function(player, words) {

    // TODO: Salty pants - increases your salt generation but every N seconds increase your beta chance

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
        'accelerator': {
            title: 'Miniature chronal accelerator',
            description: 'Gives you an additional 40 seconds of time and increases your beta chances by 5%.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Let\'s try that again!',
                    apply: function() {
                        player.removeItem('accelerator');
                        player.changeSecondsRemaining(40);
                        player.changeBetaChance(0.05);
                        return words.buildApplyReturn({time: 40, itemCount: -1, beta: 0.05});
                    },
                    buttons: [
                        {
                            text: 'Whee!'
                        }
                    ]
                }
            ]
        },
        'visor': {
            title: 'Tactical visor',
            description: 'If you were a soldier it would help you lock on to targets. In your case it helps you lock on to ' +
                'the Beta (???). I am not a good game designer.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You\'ve got the beta in your sights!',
                    apply: function() {
                        player.removeItem('visor');
                        player.changeBetaChance(0.04);
                        return words.buildApplyReturn({beta: 0.04, itemCount: -1});
                    },
                    buttons: [
                        {
                            text: 'I am a soldier now'
                        }
                    ]
                }
            ]
        },
        'peanut': {
            title: 'Peanut butter',
            description: 'Lower\'s your salt by -15% and makes gorillas happy.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Did someone say peanut butter?',
                    apply: function() {
                        player.removeItem('peanut');
                        player.changeSalt(-15);
                        return words.buildApplyReturn({salt: -15, itemCount: -1});
                    }
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
        'dollarsignbag': {
            title: 'A bag with a dollar sign on it',
            description: 'Kind of inconspicuous isn\'t it?',
            outcomes: [
                {
                    chance: 0.5,
                    flavourText: 'A dye pack explodes in your face. Most of the money still seems OK! But you can\'t help feel salty at being covered ' +
                        'in paint.',
                    apply: function() {
                        player.removeItem('dollarsignbag');
                        player.changeSalt(20);
                        player.changeMoney(130);
                        player.data['dollarsignbag-open'] = true;
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
                        player.removeItem('dollarsignbag');
                        player.changeMoney(150);
                        player.data['dollarsignbag-open'] = true;
                        return words.buildApplyReturn({itemCount: -1, money: 150});
                    },
                    buttons: [
                        {
                            text: 'Yay free money'
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