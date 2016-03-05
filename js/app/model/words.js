'use strict';

define(['app/util/random'], function(random) {

    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function salt(value) {
        if (value < 10) {
            return 'You are not very salty';
        } else if (value < 20) {
            return 'You are a tiny bit salty';
        } else if (value < 30) {
            return 'You are starting to feel salty'
        } else if (value < 40) {
            return 'Come on, why you gotta be so salty?';
        } else if (value < 50) {
            return 'We\'re all salty now';
        } else if (value < 60) {
            return 'It\'s just a game bro. Don\'t be so mad';
        } else if (value < 70) {
            return 'Everyone else is in beta except you';
        } else if (value < 80) {
            return 'You are NEVER getting into the beta';
        } else if (value < 90) {
            return 'You deserve beta more than the rest of them';
        } else if (value < 100) {
            return 'The fury of the salt courses through your veins';
        } else {
            return 'Make them all pay';
        }
    }

    function betaChanceValue(value) {
        return value; // fixme
        //if (value >= 0.5) {
        //    return 'Extremely high'
        //} else if (value >= 0.3) {
        //    return 'High'
        //} else if (value >= 0.1) {
        //    return 'Medium'
        //} else if (value >= 0.05) {
        //    return 'Low'
        //} else if (value >= 0.01) {
        //    return 'Very low'
        //} else {
        //    return 'No chance'
        //}
    }

    function betaChanceIncrement(value) {
        if (value >= 0.1) {
            return '(large increase)'
        } else if (value > 0) {
            return '(small increase)'
        } else if (value <= 0.1) {
            return '(large decrease)'
        } else if (value < 0) {
            return '(small decrease)'
        }
    }

    function blizzCms(text) {
        var cms = ['Zoevia', 'Lylirra'];
        return replaceAll(text, '$$CM', random.randomArray(cms));
    }

    function mods(text) {
        var mods = ['AlexCail', 'zonq', 'FuriousNarwall', 'BoozyPelican', 'turikk', 'Shuu37', 'The4thSniper', 'horrible_jokes', 'SpriteGuy_000']
        return replaceAll(text, '$$MOD', random.randomArray(mods));
    }

    function textReplace(text) {
        return mods(blizzCms(text));
    }

    function buildApplyReturn(opts) {
        var sb = "";
        if (opts.salt) {
            if (opts.salt > 0) {
                sb += "<span class='word word-salt'>Your saltiness has increased by " + opts.salt + "%.</span> "
            } else if (opts.salt < 0) {
                sb += "<span class='word word-salt'>Your saltiness has decreased by " + opts.salt + "%.</span> "
            }
        }
        if (opts.itemCount) {
            if (opts.itemCount == 1) {
                sb += "<span class='word word-item'>Item added to your inventory.</span> "
            } else if (opts.itemCount > 1) {
                sb += "<span class='word word-item'>" + opts.itemCount + " items added to your inventory.</span> "
            } else if (opts.itemCount == -1) {
                sb += "<span class='word word-item'>Item removed from your inventory.</span> "
            } else if (opts.itemCount < -1) {
                sb += "<span class='word word-item'>" + opts.itemCount + " items removed from your inventory.</span> "
            }
        }
        if (opts.beta) {
            if (opts.beta > 0) {
                sb += "<span class='word word-beta'>Your beta chances have increased by " + Math.round(opts.beta * 100) + "%.</span> "
            } else if (opts.beta < 0) {
                sb += "<span class='word word-beta'>Your beta chances have decreased by " + Math.round(opts.beta * 100) + "%.</span> "
            }
        }
        if (opts.time) {
            if (opts.time > 0) {
                sb += "<span class='word word-time'>Your time remaining has increased by " + opts.time + " seconds.</span> "
            } else if (opts.time < 0) {
                sb += "<span class='word word-time'>Your time remaining has decreased by " + opts.time + " seconds.</span> "
            }
        }
        if (opts.money) {
            if (opts.money > 0) {
                sb += "<span class='word word-money'>You have gained $" + opts.money + ".</span> "
            } else if (opts.money < 0) {
                sb += "<span class='word word-money'>You have lost $" + opts.money + ".</span> "
            }
        }
        if (opts.questCountAdded) {
            if (opts.questCountAdded == 1) {
                sb += "<span class='word word-quest'>" + opts.questCountAdded + " new quest added to your quest log.</span> ";
            } else if (opts.questCountAdded >= 2) {
                sb += "<span class='word word-quest'>" + opts.questCountAdded + " new quests added to your quest log.</span> ";
            }
        }
        if (opts.miscText) {
            sb += "<span class='word'>" + opts.miscText + "</span> ";
        }
        return sb;
    }

    return {
        salt: salt,
        betaChanceValue: betaChanceValue,
        betaChanceIncrement: betaChanceIncrement,
        textReplace: textReplace,
        buildApplyReturn: buildApplyReturn
    }

});