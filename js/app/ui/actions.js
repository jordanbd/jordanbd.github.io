'use strict';

define(['jquery', 'underscore',
    'emitter',
    'app/ui/templates',
    'app/ui/modal',
    'app/ui/timer',
    'app/model/player',
    'app/model/attacks',
    'app/model/items',
    'app/model/shop',
    'app/model/quests',
    'app/model/words',
    'app/model/achievements',
    'app/util/random'],

function($, _, emitter, templates, modal, timer, player, attacks, items, shop, quests, words, achievements, random) {

    var $actionsPanel;
    var $optionsPanel;

    function unselectAction() {
        $optionsPanel.html("");
        $('button', $actionsPanel).removeClass('active');
    }

    function showAttackOptions() {
        unselectAction();
        $('#action-attack').addClass('active');

        var availableAttacks = attacks.getAttacks();
        for (var i = 0; i < availableAttacks.length; i++) {
            var attack = availableAttacks[i];

            var subDescription = null;
            if (typeof attack.subDescription === 'function') {
                subDescription = attack.subDescription();
            } else {
                subDescription = attack.subDescription;
            }

            var $opt = $(templates.getTemplate('actionOptionTmpl')({
                title: attack.title,
                description: attack.description,
                subDescription: subDescription
            }));

            var click = function(a) {
                useAction(a);
                showAttackOptions();
            }.bind(this, attack);

            $opt.one('click', click);

            $optionsPanel.append($opt);
        }
    }

    function showItemOptions() {
        unselectAction();
        $('#action-item').addClass('active');

        if (player.items.length > 0) {

            var groupedItems = {};
            for (var i = 0; i < player.items.length; i++) {
                if (!groupedItems[player.items[i]]) {
                    groupedItems[player.items[i]] = {
                        code: player.items[i],
                        count: 0
                    }
                }
                groupedItems[player.items[i]].count++;
            }

            var groupedItemsAsArray = [];
            for (var code in groupedItems) {
                groupedItemsAsArray.push(groupedItems[code]);
            }
            sortPlayerItems(groupedItemsAsArray);

            for (var i = 0; i < groupedItemsAsArray.length; i++) {
                var code = groupedItemsAsArray[i].code;
                var item = items.get[code]; // weird syntax, I am awful

                var isNew = $.inArray(code, player.newItems) >= 0;

                var title = item.title + ' <span class="rarity ' + item.rarity + '">[' + item.rarity + ']</span>';
                if (isNew) {
                    title = '<span class="new">new!</span> ' + title;
                }
                var count = undefined;
                if (groupedItemsAsArray[i].count > 1) {
                    count = groupedItemsAsArray[i].count;
                }

                var $opt = $(templates.getTemplate('actionOptionTmpl')({
                    title: title,
                    description: item.description,
                    count: count
                }));

                var click = function (a) {
                    useAction(a);
                    showItemOptions();
                }.bind(this, item);
                $opt.click(click);

                $optionsPanel.append($opt);
            }

            player.newItems = [];
        } else {
            $optionsPanel.append($('<p>You have no items. Find items to help increase your chances of getting into the beta!</p>'));
        }
    }

    function sortPlayerItems(playerItems) {
        if (playerItems.length > 0) {
            playerItems.sort(function compareFunction(a, b) {
                var itemA = items.get[a.code];
                var itemB = items.get[b.code];

                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
                // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.

                return itemA.title.localeCompare(itemB.title);

            });
        }
    }

    function sortShop(itemsForSale) {
        itemsForSale.sort(function compareFunction(a, b) {

            if (a.cost < b.cost) {
                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                return -1;
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
            } else if (b.cost < a.cost) {
                return 1;
            }
            // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.

            var itemA = items.get[a.itemRef];
            var itemB = items.get[b.itemRef];

            var aTitle = a.title ? a.title : itemA.title;
            var bTitle = b.title ? b.title : itemB.title;

            return aTitle.localeCompare(bTitle);

        });
    }

    function sortPlayerQuests() {
        if (player.quests.length > 0) {
            player.quests.sort(function compareFunction(a, b) {
                var questA = quests.getQuest(a);
                var questB = quests.getQuest(b);

                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
                // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.

                var questACanComplete = questA.canComplete();
                var questBCanComplete = questB.canComplete();

                if (questACanComplete && !questBCanComplete) {
                    return -1;
                }
                if (questBCanComplete && !questACanComplete) {
                    return 1;
                }

                return questA.title.localeCompare(questB.title);

            });
        }
    }

    function showQuestOptions() {
        sortPlayerQuests();
        unselectAction();
        $('#action-quests').addClass('active');
        if (player.quests.length > 0) {
            for (var i = 0; i < player.quests.length; i++) {
                var quest = quests.getQuest(player.quests[i]);

                var $opt = $(templates.getTemplate('questOptionTmpl')({
                    title: quest.title,
                    description: quest.description,
                    completeCssClass: quest.canComplete() ? 'quest-complete' : 'quest-incomplete'
                }));

                var click = function (quest) {
                    useAction(quest);
                    showQuestOptions();
                }.bind(this, quest);
                $opt.click(click);

                $optionsPanel.append($opt);
            }
        } else {
            $optionsPanel.append($('<p>You have no quests. Find quests to help increase your chances of getting into the beta!</p>'));
        }
    }

    function showShopOptions() {
        unselectAction();
        $('#action-shop').addClass('active');

        var itemsForSale = shop.getItemsForSale();
        sortShop(itemsForSale);
        if (itemsForSale.length > 0) {
            for (var i = 0; i < itemsForSale.length; i++) {

                var saleItem = itemsForSale[i];
                var item = items.get[saleItem.itemRef];

                // Build HTML element
                var $opt = $(templates.getTemplate('shopItemTmpl')({
                    title: saleItem.title ? saleItem.title : item.title,
                    description: saleItem.description ? saleItem.description : item.description,
                    cost: saleItem.cost
                }));

                var click = function (a) {
                    useAction(a);
                    showShopOptions();
                }.bind(this, saleItem);
                $opt.click(click);

                $optionsPanel.append($opt);
            }
        } else {
            $optionsPanel.append($('<p>There is nothing for sale.</p>'));
        }
    }

    function useAction(action) {
        timer.pause();

        player.history.push({
            text: action.title
        });

        if (action.isAvailable && !action.isAvailable()) {
            modal.open({
                text: 'This action is no longer valid'
            }).then(function() {
                unselectAction();
                timer.start();
            });
        } else {

            if (action.cost && action.cost > player.money) {
                modal.open({
                    text: 'You cannot afford this.'
                }).then(function() {
                    timer.start();
                });
            } else if (action.canComplete && !action.canComplete()) {
                modal.open({
                    text: 'You do not meet the requirements to complete this quest.'
                }).then(function() {
                    timer.start();
                });
            } else {
                if (action.beforeOutcome) {
                    action.beforeOutcome();
                }
                var winningOutcome = random.randomOutcome(action.outcomes);
                if (winningOutcome == null) {
                    console.error('missing outcome victory in action %O', action);
                    return;
                }

                var output = winningOutcome.apply ? winningOutcome.apply() : null;
                emitter.emit('character-refresh');

                var newAchievements = achievements.testForAchievements();
                for (var i = 0; i < newAchievements.length; i++) {
                    player.achievements.push(newAchievements[i]);
                }

                var flavourText = random.randomArray(winningOutcome.flavourText);
                var text = flavourText != null ? flavourText : "";
                if (output != null) {
                    if (flavourText != null) text += "<br/><br/>";
                    text += output;
                }
                text = words.textReplace(text);

                player.history.push({
                    text:text
                });

                modal.open({
                    text: text,
                    buttons: winningOutcome.buttons
                })
                .then(function showAchievements() {
                    if (newAchievements.length > 0 && !(player.data['beta'] || player.data['game-over'])) {
                        // Fuck it! You can only show one - whatever screw this crap.
                        var achievement = achievements.getAchievement(newAchievements[0]);
                        var achieveText = words.textReplace('<strong>Achievement completed!</strong><br/><br/>' +
                                achievement.title + '<br/><br/>' +
                                achievement.description);
                        return modal.open({
                            text: achieveText,
                            buttons: [{text: 'Nice!'}]
                        });
                    } else {
                        return true;
                    }
                })
                .then(function allModalsClosed() {

                    if (player.data['beta'] || player.data['game-over']) {
                        timer.stop();
                        emitter.emit('victory');
                    } else if (player.secondsRemaining <= 0) {
                        timer.stop();
                        emitter.emit('defeat');
                    } else {
                        timer.start();
                    }
                });
            }

        }


    }

    function updateCountBadges() {
        var $items = $('#action-item');
        var $quests = $('#action-quests');

        // if badge exists, remove
        $('.badge', $items).remove();
        $('.badge', $quests).remove();

        // add badges
        if (player.items.length > 0) {
            $('<span/>')
                .addClass('badge')
                .text(player.items.length)
                .appendTo($items);
        }
        if (player.quests.length > 0) {
            $('<span/>')
                .addClass('badge')
                .text(player.quests.length)
                .appendTo($quests);
        }
    }

    function setup() {

        var $canvas = $('#canvas');
        $actionsPanel = $(templates.getTemplate('actionsTmpl')({

        }));

        // bind events
        $(document).on('click', '#action-attack', function() {
            showAttackOptions();
        });
        $(document).on('click', '#action-item', function() {
            showItemOptions();
        });
        $(document).on('click', '#action-shop', function() {
            showShopOptions();
        });
        $(document).on('click', '#action-quests', function() {
            showQuestOptions();
        });
        $(document).on('click', '#action-run', function() {
            player.data['run'] = true;
            emitter.emit('defeat');
        });

        // Find bnet account action
        var availableAttacks = attacks.getAttacks();
        var bnetAttack = null;
        for (var i = 0; i < availableAttacks.length; i++) {
            var attack = availableAttacks[i];
            if (attack.title == 'Check your Battle.net account') {
                bnetAttack = attack;
                break;
            }
        }

        if (bnetAttack != null) {
            $(document).on('click', '#action-bnet', function() {
                useAction(bnetAttack);
            });
        }


        $canvas.append($actionsPanel);
        $optionsPanel = $('.panel-actions-options');

        showAttackOptions();

        emitter.on('item-change', updateCountBadges);
        emitter.on('quest-change', updateCountBadges);
    }

    function destroy() {

    }


    //
    //player clicks attack
    // render attacks
    // clicks back
    // unrender attacks
    //



    return {
        setup: setup,
        destroy: destroy
    }

});