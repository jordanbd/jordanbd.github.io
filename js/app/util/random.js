'use strict';

define([], function() {

    function nextInt(n) {
        return Math.floor(Math.random()*n);
    }

    function randomArray(arr) {
        if (!(arr instanceof Array)) {
            return arr;
        }
        return arr[nextInt(arr.length)];
    }

    function randomOutcome(outcomes) {
        // Sort outcomes so that lowest chance are first, otherwise high chance outcomes will occur too frequently.
        // Additionally sort on score if it exists
        outcomes.sort(function compareFunction(a, b) {

            var aChance = null;
            if (typeof a.chance === 'function') {
                aChance = a.chance();
            } else {
                aChance = a.chance;
            }
            var bChance = null;
            if (typeof b.chance === 'function') {
                bChance = b.chance();
            } else {
                bChance = b.chance;
            }

            var aScore = 1;
            if (a.score) {
                aScore = a.score;
            }
            var bScore = 1;
            if (b.score) {
                bScore = b.score;
            }

            if (aScore > bScore) {
                return -1;
            } else if (bScore > aScore) {
                return 1;
            }

            if (aChance < bChance) {
                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                return -1;
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
            } else if (bChance < aChance) {
                return 1;
            }
            // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
            return 0;

        });

        var winningOutcome = null;
        while (winningOutcome == null) {
            for (var i = 0; i < outcomes.length; i++) {
                var outcome = outcomes[i];
                if (outcome.isAvailable && !outcome.isAvailable()) {
                    continue;
                }

                var chance;
                if (typeof outcome.chance === 'function') {
                    chance = outcome.chance();
                } else {
                    chance = outcome.chance;
                }

                if (Math.random() <= chance) {
                    winningOutcome = outcome;
                    break;
                }
            }
        }
        return winningOutcome;

        //var rand = Math.random();
        //var currentChanceCheck = 0;
        //for (var i = 0; i < outcomes.length; i++) {
        //    var outcome = outcomes[i];
        //    if (outcome.isAvailable && !outcome.isAvailable()) {
        //        continue;
        //    }
        //
        //    var chance;
        //    if (typeof outcome.chance === 'function') {
        //        chance = outcome.chance();
        //    } else {
        //        chance = outcome.chance;
        //    }
        //    currentChanceCheck += chance;
        //
        //    if (rand <= currentChanceCheck) {
        //        console.debug('Outcome %O has passed - base %s, cumulative %s, roll %s', outcome, chance, currentChanceCheck, rand);
        //        return outcome;
        //    }
        //}
        //return null;
    }

    return {
        nextInt: nextInt,
        randomArray: randomArray,
        randomOutcome: randomOutcome
    }

});