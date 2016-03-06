'use strict';

define(['app/model/player', 'app/model/words', 'emitter', 'app/model/common'], function(player, words, emitter, common) {

    var items = [
        {
            itemRef: 'puppet',
            description: 'Wow this thing is ugly.',
            cost: 80,
            isAvailable: function() {
                return player.data['socialmediacount'] != null && player.data['socialmediacount'] >= 4 && !player.data['puppet'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'It\'s just a stupid puppet?',
                    apply: function() {
                        player.changeMoney(-80);
                        player.items.push('puppet');
                        player.data['puppet'] = true;
                        return words.buildApplyReturn({money: -80, itemCount: 1});
                    }
                }
            ]
        },

        {
            itemRef: 'deadbook',
            cost: 400,
            isAvailable: function() {
                return !player.data['deadbook'] && player.characterClassId == 'default';
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Is this, like, some kind of cookbook?',
                    apply: function() {
                        player.changeMoney(-400);
                        player.items.push('deadbook');
                        player.data['deadbook'] = true;
                        player.data['darkness'] = 0;
                        emitter.emit('new-character-attribute', {id: 'darkness', name: 'Darkness', format: 'corruptionValue', value: 0});
                        return words.buildApplyReturn({money: -400, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'spell-increasemoney',
            description: 'It would make things so easy.',
            cost: 200,
            isAvailable: function() {
                return player.data['deadbookread'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'The voice cackles.',
                    apply: function() {
                        player.changeMoney(-200);
                        player.items.push('spell-increasemoney');
                        return words.buildApplyReturn({money: -200, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'spell-increasechance',
            description: 'You deserve this luck.',
            cost: 400,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return player.data['deadbookread'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'The voice grows louder.',
                    apply: function() {
                        player.changeMoney(-400);
                        player.items.push('spell-increasechance');
                        return words.buildApplyReturn({money: -400, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'spell-mindcontrol',
            description: 'The voice commands you, "DO IT."',
            cost: 1000,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return player.data['deadbookread'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'The voice cackles.',
                    apply: function() {
                        player.changeMoney(-1000);
                        player.items.push('spell-mindcontrol');
                        return words.buildApplyReturn({money: -1000, itemCount: 1});
                    }
                }
            ]
        },

        /* Updated items */

        {
            itemRef: 'visor-data',
            cost: 80,
            isAvailable: function() {
                return !player.data['item-bought-visor-data'] && player.hasQuest('soldier76-glasses');
            },
            outcomes: [
                {
                    chance: 1,
                    apply: function() {
                        player.data['item-bought-visor-data'] = true;
                        player.items.push('visor-data');
                        player.changeMoney(-80);
                        return words.buildApplyReturn({money: -80, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'glasses',
            cost: 80,
            isAvailable: function() {
                return !player.data['item-bought-glasses'] && player.hasQuest('soldier76-glasses');
            },
            outcomes: [
                {
                    chance: 1,
                    apply: function() {
                        player.data['item-bought-glasses'] = true;
                        player.items.push('glasses');
                        player.changeMoney(-80);
                        return words.buildApplyReturn({money: -80, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'gun-license',
            cost: 120,
            isAvailable: function() {
                return !player.data['item-bought-gun-license'];
            },
            outcomes: [
                {
                    chance: 1,
                    apply: function() {
                        player.data['item-bought-gun-license'] = true;
                        player.items.push('gun-license');
                        player.changeMoney(-120);
                        return words.buildApplyReturn({money: -120, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'pizza',
            cost: 20,
            isAvailable: function() {
                return true;
            },
            outcomes: [
                {
                    chance: 1,
                    apply: function() {
                        player.items.push('pizza');
                        player.changeMoney(-20);
                        return words.buildApplyReturn({money: -20, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'blizzard-fake-id',
            description: 'This could definitely come in handy.',
            cost: 100,
            isAvailable: function() {
                return !player.data['item-bought-blizzard-fake-id'];
            },
            outcomes: [
                {
                    chance: 1,
                    apply: function() {
                        player.items.push('blizzard-fake-id');
                        player.data['item-bought-blizzard-fake-id'] = true;
                        player.changeMoney(-100);
                        return words.buildApplyReturn({money: -100, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'peanut',
            cost: 60,
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'This is salt-free peanut butter.',
                    apply: function() {
                        player.changeMoney(-60);
                        player.items.push('peanut');
                        return words.buildApplyReturn({money: -60, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'blizzard-hacks',
            cost: 60,
            isAvailable: function() {
                return !player.data['item-bought-blizzard-hacks'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Developed by Brother Chris.',
                    apply: function() {
                        player.changeMoney(-60);
                        player.items.push('blizzard-hacks');
                        player.data['item-bought-blizzard-hacks'] = true;
                        return words.buildApplyReturn({money: -60, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'origins',
            title: 'Pre-purchase Overwatch: Origins edition',
            description: 'It doesn\'t come with beta access but surely... SURELY... it must slightly increase your chances of getting ' +
                'into beta, right? Right?',
            cost: 60,
            isAvailable: function() {
                return !player.data['origins'] && player.characterClassId == 'default';
            },
            outcomes: [
                /* increases beta chance*/
                {
                    chance: 0.6,
                    flavourText: 'It doesn\'t come with beta access but you can\'t help but feel luckier.',
                    apply: function() {
                        player.changeBetaChance(common.BETA.MEDIUM);
                        player.changeMoney(-60);
                        player.items.push('origins');
                        player.data['origins'] = true;
                        return words.buildApplyReturn({money: -60, itemCount: 1, beta: common.BETA.MEDIUM});
                    },
                    buttons: [
                        {
                            text: 'The luck truck drives on'
                        }
                    ]
                },
                /* does nothing ? */
                {
                    chance: 0.4,
                    flavourText: 'You were told that it didn\'t come with beta access. Blizzard weren\'t kidding.',
                    apply: function() {
                        player.changeMoney(-60);
                        player.items.push('origins');
                        player.data['origins'] = true;
                        return words.buildApplyReturn({money: -60, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'FUCK.'
                        }
                    ]
                }
            ]
        },
        {
            itemRef: 'djset',
            cost: 200,
            isAvailable: function() {
                return player.characterClassId == 'default'
                    && !player.data['djset-bought']
                    && player.hasQuest('lucio-party');
            },
            outcomes: [
                {
                    chance: 0.99,
                    flavourText: 'You can\'t wait to plug your Macbook into this and press PLAY.',
                    apply: function() {
                        player.changeMoney(-200);
                        player.items.push('djset');
                        player.data['djset'] = true;
                        player.data['djset-bought'] = true;
                        return words.buildApplyReturn({money: -200, itemCount: 1});
                    }
                },
                {
                    chance: 0.01,
                    flavourText: 'Oh what the hell - this is just a box full of bricks!',
                    apply: function() {
                        player.changeMoney(-200);
                        player.items.push('djbricks');
                        player.data['djset-bought'] = true;
                        return words.buildApplyReturn({money: -200, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'I\'ve been scammed! Lucio you rat!'
                        }
                    ]
                }
            ]
        },
        {
            itemRef: 'djpractice1',
            description: 'Teaches you how to use a tabletop player.',
            cost: 80,
            isAvailable: function() {
                return player.characterClassId == 'default'
                    && player.data['djset']
                    && !player.data['djpractice1-bought']
                    && player.hasQuest('lucio-party');
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'This better be worth it',
                    apply: function() {
                        player.changeMoney(-80);
                        player.items.push('djpractice1');
                        player.data['djpractice1-bought'] = true;
                        return words.buildApplyReturn({money: -80, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Don\'t let me down Lucio!'
                        }
                    ]
                }
            ]
        },
        {
            itemRef: 'djbeta',
            description: 'Teaches you how to play a sick jam.',
            cost: 80,
            isAvailable: function() {
                return player.characterClassId == 'default'
                    && player.data['djset']
                    && player.data['djpractice1']
                    && !player.data['djbeta']
                    && player.hasQuest('lucio-party');
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Hey! It\'s just an MP3 file on USB!',
                    apply: function() {
                        player.changeMoney(-80);
                        player.items.push('djbeta');
                        player.data['djbeta'] = true;
                        return words.buildApplyReturn({money: -80, itemCount: 1});
                    },
                    buttons: [
                        {
                            text: 'Why did I need the expensive Tabletop player?'
                        }
                    ]
                }
            ]
        },
        {
            itemRef: 'beard',
            description: 'Once thought lost, it has resurfaced. But can you really put a price on such a unique artifact? Yes. $1000.',
            cost: 1000,
            isAvailable: function() {
                return !player.data['beard'] && player.characterClassId == 'default';
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'A voice calls to you...',
                    apply: function() {
                        player.changeMoney(-1000);
                        player.items.push('beard');
                        player.data['beard'] = true;
                        return words.buildApplyReturn({money: -1000, itemCount: 1});
                    }
                }
            ]
        },
    ];

    function getItemsForSale() {

        items.sort(function compareFunction(a, b) {

            if (a.cost < b.cost) {
                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                return -1;
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
            } else if (b.cost < a.cost) {
                return 1;
            }
            // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
            return 0;

        });

        var result = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.isAvailable && !item.isAvailable()) {
                continue;
            }

            result.push(item);
        }
        return result;
    }

    return {
        getItemsForSale: getItemsForSale
    }

});