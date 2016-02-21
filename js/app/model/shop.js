'use strict';

define(['app/model/player', 'app/model/words'], function(player, words) {

    var items = [
        {
            itemRef: 'mineral-water',
            description: 'This will lower your saltiness.',
            cost: 20,
            canAfford: function() {
                return player.money >= this.cost;
            },
            isAvailable: function() {
                return true;
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Did that say "mineral" water?',
                    apply: function() {
                        player.changeMoney(-20);
                        player.items.push('mineral-water');
                        return words.buildApplyReturn({money: -20, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'puppet',
            description: 'Wow this thing is ugly.',
            cost: 200,
            isAvailable: function() {
                return player.data['socialmediacount'] != null && player.data['socialmediacount'] >= 3 && !player.data['puppet'];
            },
            canAfford: function() {
                return player.money >= this.cost;
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'It\'s just a stupid puppet?',
                    apply: function() {
                        player.changeMoney(-200);
                        player.items.push('puppet');
                        player.data['puppet'] = true;
                        return words.buildApplyReturn({money: -200, itemCount: 1});
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
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return !player.data['origins'];
            },
            outcomes: [
                /* increases beta chance*/
                {
                    chance: 0.9,
                    flavourText: 'It doesn\'t come with beta access but you can\'t help but feel luckier.',
                    apply: function() {
                        player.changeBetaChance(0.05);
                        player.changeMoney(-60);
                        player.items.push('origins');
                        player.data['origins'] = true;
                        return words.buildApplyReturn({money: -60, itemCount: 1, beta: 0.05});
                    }
                },
                /* does nothing ? */
                {
                    chance: 0.1,
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
            itemRef: 'beard',
            description: 'Once thought lost, it has resurfaced. But can you really put a price on such a unique artifact? Yes. $1000.',
            cost: 1000,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return !player.data['beard'];
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
        {
            itemRef: 'accelerator',
            cost: 20,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return player.data['helpedman-items'] && !player.data['accelerator'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Everyone is going to think you need a nerf now.',
                    apply: function() {
                        player.changeMoney(-20);
                        player.items.push('accelerator');
                        player.data['accelerator'] = true;
                        return words.buildApplyReturn({money: -20, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'visor',
            cost: 60,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return player.data['helpedman-items'] && !player.data['visor'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'The same visor worn by Data from Star Wars.',
                    apply: function() {
                        player.changeMoney(-20);
                        player.items.push('visor');
                        player.data['visor'] = true;
                        return words.buildApplyReturn({money: -20, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'peanut',
            cost: 20,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return player.data['helpedman-items'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'This is salt-free peanut butter.',
                    apply: function() {
                        player.changeMoney(-20);
                        player.items.push('peanut');
                        return words.buildApplyReturn({money: -20, itemCount: 1});
                    }
                }
            ]
        },
        {
            itemRef: 'deadbook',
            cost: 200,
            canAfford: function() {
                return player.money >= this.cost
            },
            isAvailable: function() {
                return !player.data['darkness'];
            },
            outcomes: [
                {
                    chance: 1,
                    flavourText: 'Time to reap, or do something evil-ish.',
                    apply: function() {
                        player.changeMoney(-200);
                        player.items.push('deadbook');
                        return words.buildApplyReturn({money: -200, itemCount: 1});
                    }
                }
            ]
        }
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
            } else {
                result.push(item);
            }
        }
        return result;
    }

    return {
        getItemsForSale: getItemsForSale
    }

});