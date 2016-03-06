'use strict';

define(['jquery', 'emitter', 'app/ui/templates', 'app/ui/timer', 'app/model/player', 'app/model/words', 'app/model/items'],

function($, emitter, templates, timer, player, words, items) {

    var $ele;

    function updateUI() {

        /** Salt **/

        var $saltDescription = $('.salt > .description', $ele);
        $saltDescription.removeClass(function (index, css) {
            return (css.match (/(^|\s)shake\S+/g) || []).join(' ');
        });

        if (player.salt == 100) {
            $saltDescription.addClass('shake-constant');
            $saltDescription.addClass('shake-hard');
        } else if (player.salt > 90) {
            $saltDescription.addClass('shake-constant');
            $saltDescription.addClass('shake');
        } else if (player.salt > 60) {
            $saltDescription.addClass('shake-constant');
            $saltDescription.addClass('shake-little');
        }

        $saltDescription.text(words.salt(player.salt));

        var $saltValue = $('.salt > .value', $ele);
        $saltValue.text(player.salt + '%');

        /** Money **/

        var $moneyDescription = $('.money > .description', $ele);
        var $moneyValue = $('.money > .value', $ele);

        $moneyValue.text('$' + player.money);

        /** Beta chance **/

        var $betaChanceDescription = $('.beta-chance > .description', $ele);
        var $betaChanceValue = $('.beta-chance > .value', $ele);
        $betaChanceValue.text(words.betaChanceValue(player.betaChance));

        /** Custom **/
        var $customAttributes = $('[class^="custom-"]');
        $customAttributes.each(function(index, $custEleTd) {
            var id = $customAttributes.attr('data-custom-id');
            var format = $customAttributes.attr('data-format');
            var value = player.data[id];
            var $customValue = $('.value', $custEleTd);
            $customValue.text(words[format](value));
        });
    }

    function checkForMaxSaltiness() {
        if (player.salt >= 100) {
            player.salt = 100;
            timer.stop();
            emitter.emit('defeat');
        }
    }

    function increaseSalt() {
        var incr = 10;
        player.salt += incr;
        emitter.emit('salt-change', incr);
        checkForMaxSaltiness();
    }

    function showChange(amount, $bucket, format) {
        if (amount == 0) {
            return;
        }
        var value = null;
        var $ele = null;
        var formatAmount = function(amt) {
            if (amt > 0) {
                return '(+' + amt + ')';
            } else {
                return '(' + amt + ')';
            }
        };
        if (format !== undefined) {
            formatAmount = format;
        }

        var $existing = $('span:not(.fading)', $bucket).last();
        var existingValue = Number($existing.attr('data-amount'));
        if ($existing.length != 0 && ((existingValue > 0 && amount > 0) || (existingValue < 0 && amount < 0))) {
            value = amount + existingValue;
            $ele = $existing;
        } else {
            $ele = $('<span/>');
            value = amount;
            $ele.appendTo($bucket);
        }

        $ele.text(formatAmount(value));
        $ele.attr('data-amount', value);
        $ele.addClass('fade-queue');
    }

    function showSaltChange(amount) {
        showChange(amount, $('.salt > .increment', $ele));
    }

    function showMoneyChange(amount) {
        showChange(amount, $('.money > .increment', $ele));
    }

    function showBetaChanceChange(amount) {
        showChange(amount, $('.beta-chance > .increment', $ele), words.betaChanceIncrement);
    }

    function addCustomAttribute(data) {
        var $table = $('.character-stats');

        var defaultValue = words[data.format](data.value);

        var $tr = $(
            '<tr>' +
            '<th>' + data.name + '</th>' +
            '<td data-format="' + data.format + '" data-custom-id="' + data.id + '" class="custom-' + data.id + '">' +
            '<span class="value">' + defaultValue + '</span>' +
            '<span class="description"></span>\n' + // note the line-break hack
            '<span class="increment"></span>' +
            '</td>' +
            '</tr>');
        $table.append($tr);
    }

    function showCustomAttributeChange(data) {
        console.debug('Custom Attribute Change: %O', data);
        showChange(data.value, $('.custom-' + data.id + ' > .increment', $ele));
    }

    function fadeQueuedElements() {
        $('.fade-queue', $ele)
            .removeClass('fade-queue')
            .addClass('fading')
            .animate({opacity: 0}, 300, 'linear', function() {
                $(this).remove();
            });
    }

    function itemTick10() {
        if (player.items.length > 0) {
            for (var i = 0; i < player.items.length; i++) {
                var item = items.get[player.items[i]];
                if (item.onTick10) {
                    item.onTick10();
                }
            }
        }
        if (player.data['game-over']) {
            timer.stop();
            emitter.emit('victory');
        }
    }

    function itemTick30() {
        if (player.items.length > 0) {
            for (var i = 0; i < player.items.length; i++) {
                var item = items.get[player.items[i]];
                if (item.onTick30) {
                    item.onTick30();
                }
            }
        }
        if (player.data['game-over']) {
            timer.stop();
            emitter.emit('victory');
        }
    }

    function itemSaltChange(amt) {
        if (player.items.length > 0) {
            for (var i = 0; i < player.items.length; i++) {
                var item = items.get[player.items[i]];
                if (item.onSaltChange) {
                    item.onSaltChange(amt);
                }
            }
        }
    }

    function setup($parent) {
        $ele = $(templates.getTemplate('characterStatsTmpl')({
            name: player.name,

            moneyValue: '$' + player.money,
            moneyDescription: '',

            saltValue: player.salt,
            saltDescription: words.salt(player.salt),

            betaChanceValue: words.betaChanceValue(player.betaChance),
            betaChanceDescription: ''
        }));
        $parent.append($ele);

        emitter.on('timer-tick5', increaseSalt);

        emitter.on('timer-tick', updateUI);
        emitter.on('timer-tick', fadeQueuedElements); // fades the +salt value on screen
        emitter.on('timer-tick', checkForMaxSaltiness);

        emitter.on('salt-change', showSaltChange); // prepares the +salt value for the screen
        emitter.on('salt-change', updateUI);
        emitter.on('salt-change', itemSaltChange);

        emitter.on('beta-chance-change', showBetaChanceChange);
        emitter.on('beta-chance-change', updateUI);

        emitter.on('money-change', showMoneyChange);
        emitter.on('money-change', updateUI);

        emitter.on('character-refresh', updateUI);

        emitter.on('global-timer-tick10', itemTick10);
        emitter.on('global-timer-tick30', itemTick30);

        emitter.on('new-character-attribute', addCustomAttribute);
        emitter.on('custom-attribute-change', showCustomAttributeChange);
    }

    return {
        setup: setup
    }

});
