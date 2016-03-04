'use strict';

define(['emitter'], function(emitter) {

    return {
        data: {
            events: {}
        },
        name: 'test',
        characterClassId: null,
        items: [],
        removeItem: function(code) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i] == code) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        },
        countItems: function(code) {
            var count = 0;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i] == code) {
                    count++;
                }
            }
            return count;
        },
        quests: [],
        questHistory: [],
        removeQuest: function(code) {
            for (var i = 0; i < this.quests.length; i++) {
                if (this.quests[i] == code) {
                    this.quests.splice(i, 1);
                    this.questHistory.push(code);
                    break;
                }
            }
        },
        salt: 0,
        changeSalt: function(amt) {
            this.salt += amt;
            if (this.salt < 0) {
                this.salt = 0;
            }
            emitter.emit('salt-change', amt);
        },
        secondsRemaining: 240,
        changeSecondsRemaining: function(amt) {
            this.secondsRemaining += amt;
            if (this.secondsRemaining < 0) {
                this.secondsRemaining = 0;
            }
        },
        money: 40,
        changeMoney: function(amt) {
            this.money += amt;
            emitter.emit('money-change', amt);
        },
        betaChance: 0,
        changeBetaChance: function(amt) {
            this.betaChance += amt;
            if (this.betaChance < 0) {
                this.betaChance = 0;
            }
            emitter.emit('beta-chance-change', amt);
        }
    };

});