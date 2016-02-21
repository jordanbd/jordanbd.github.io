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
    'app/model/words',
    'app/util/random'],

function($, _, emitter, templates, modal, timer, player, attacks, items, shop, words, random) {

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

            var $opt = $(templates.getTemplate('actionOptionTmpl')({
                title: attack.title,
                description: attack.description,
                subDescription: attack.subDescription
            }));

            var click = function(a) {
                console.debug('use action(%)', a);
                useAction(a);
                console.debug('showAttackOptions');
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
            for (var i = 0; i < player.items.length; i++) {
                var item = items.get[player.items[i]]; // FIXME weird, inconsistent syntax

                var $opt = $(templates.getTemplate('actionOptionTmpl')({
                    title: item.title,
                    description: item.description
                }));

                var click = function (a) {
                    useAction(a);
                    showItemOptions();
                }.bind(this, item);
                $opt.click(click);

                $optionsPanel.append($opt);
            }
        } else {
            $optionsPanel.append($('<p>You have no items</p>'));
        }
    }

    function showShopOptions() {
        unselectAction();
        $('#action-shop').addClass('active');

        var itemsForSale = shop.getItemsForSale();
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
    }

    function useAction(action) {
        console.debug('using attack %O', action);

        timer.pause();

        if (action.isAvailable && !action.isAvailable()) {
            modal.open({
                text: 'This action is no longer valid'
            }).then(function() {
                unselectAction();
                timer.start();
            });
        } else {

            if (action.canAfford && !action.canAfford()) {
                modal.open({
                    text: 'You cannot afford this.'
                }).then(function() {
                    //unselectAction();
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

                console.debug('Outcome %O has passed', winningOutcome);

                var output = winningOutcome.apply ? winningOutcome.apply() : null;
                emitter.emit('character-refresh');
                var flavourText = random.randomArray(winningOutcome.flavourText);

                modal.open({
                    text: words.textReplace(flavourText + (output != null ? '<br/><br/>' + output : '')),
                    buttons: winningOutcome.buttons
                }).then(function onClose() {
                    //unselectAction();
                    if (player.data['beta']) {
                        timer.stop();
                        emitter.emit('victory');
                    } else {
                        timer.start();
                    }
                });
            }

        }


    }

    function setup() {

        var $canvas = $('#canvas');
        console.debug('setting up actions, templates=%O', templates);
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


        $canvas.append($actionsPanel);
        $optionsPanel = $('.panel-actions-options');

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
        setup: setup
    }

});