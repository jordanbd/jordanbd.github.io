'use strict';

define(['app/model/player'], function(player) {

    // TODO: Salty pants - increases your salt generation but every N seconds increase your beta chance

    var items = {
        'stale-water': {
            title: 'Stale water',
            description: 'Greatly lowers your saltiness. Tastes awful though.',
            outcomes: [
                {
                    chance: 0.7,
                    flavourText: 'You slam down what you assume is water.',
                    apply: function() {
                        player.changeSalt(-30);
                        player.removeItem('stale-water');
                        return 'You are less salty.';
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
                        return 'You have lost 30 seconds of time.';
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
            description: 'Greatly increases your chances of getting into the beta.',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'You eat the clover to gain its power.',
                    apply: function() {
                        player.changeBetaChance(0.1);
                        player.removeItem('clover');
                        return 'Your beta chances have increased.'
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
            description: 'You have prepurchased Overwatch. This item literally does nothing.',
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
                        return 'Your saltiness has increased.';
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
                        return 'Your saltiness has decreased.';
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
                        player.data['beta'] = true;
                        player.data['dead'] = true;
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
            description: 'Lowers your saltiness. At least I think it does. Is salt a mineral? Does mineral water... contain salt? Oh god...',
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Salt is a mineral but let\'s just say this water does not have any.',
                    apply: function() {
                        player.changeSalt(-20);
                        player.removeItem('mineral-water');
                        return 'You are less salty.';
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
                    }
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
                        return 'Your beta chances have increased.';
                    },
                    buttons: [
                        {
                            text: 'On Solace is actually pretty funny.'
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