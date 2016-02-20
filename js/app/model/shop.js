'use strict';

define(['app/model/player'], function(player) {

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
                        return 'Item added to your inventory. You have lost $20.';
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
                        return 'Item added to your inventory. You have lost $200.';
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
                        return 'Your beta chances have increased. You have lost $60. Overwatch: Origins edition has been added to your inventory.';
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
                        return 'You have lost $60. Overwatch: Origins edition has been added to your inventory.';
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
                        return 'Item has been added to your inventory.';
                    }
                }
            ]
        }
    ];

    // TODO: get sorts cheapest -> most expensive

    function getItemsForSale() {
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