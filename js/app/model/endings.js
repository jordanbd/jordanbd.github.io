'use strict';

define(['app/model/player', 'app/util/random'], function(player, random) {

    var endings = [
        {
            title: 'Dummy ending',
            score: -100,
            description: 'You weren\'t supposed to get this ending. ',
            isAvailable: function() {
                return true;
            }
        },

        /* Victorious ending */
        {
            type: 'Victory',
            title: 'You have been invited into the Overwatch Beta',
            description: '"I\'m in!" <br/><br/>You submit your boastful post to the /r/Overwatch salt thread, knowing full well you will be downvoted ' +
                'to hell. You don\'t even care. You are free. Free from salt. Free from envy. You are one of the chosen.<br/>' +
                '<br/>' +
                'You unsubscribe from the Overwatch subreddit. You do not need it anymore. You used it in the same way that everyone else ' +
                'used it: as a way of getting attention from Blizzard. As a way of saying, "Hey, look at me. Notice me." Maybe they noticed you, ' +
                'or maybe RNGesus just favours you more. Either way, you leave the salt miners to their pit.<br/>' +
                '<br/>' +
                'You can see it now - shining back at you from the Battle.net client. It is finally yours.<br/>' +
                '<br/>' +
                'PLAY',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['beta'];
            }
        },
        {
            type: 'Victory',
            title: 'You have been invited into the Overwatch Beta',
            description: 'You are in the beta. You should be overjoyed - and you are. Mostly. It\'s just...<br/>' +
                '<br/>' +
                'Something about using the salt cookbook didn\'t feel right. Like you were using something evil. Something damned.<br/>' +
                '<br/>' +
                'You start playing Overwatch. The game is a delight. You have everything you ever wanted. But you feel wrong. <br/>' +
                '<br/>' +
                'Like you let something in...',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['beta'] && Number(player.data['darkness']) <= 30;
            }
        },
        {
            type: 'Victory',
            title: 'You have been invited into the Overwatch Beta',
            description: 'Hey guys check me out on Twitch I\'m going to be playing OVERWATCH tomorrow - it\'s Blizzard\'s new MMO or something?<br/><br/>' +
                'But don\'t worry I\'ll be back playing H1Z1 after that. Gonna be pwning noobs! Make sure to like and subscribe and donate you idiots. ' +
                'Loool! JK <3 <3.<br/><br/><br/><br/><br/>Sorry, I wrote this ending shortly after missing out on an invite wave. I am very salty right now.',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'twitch' && player.data['beta']
            }

        },
        {
            type: 'Victory',
            title: 'You have been invited into the Overwatch Beta',
            description: 'Congrats Mike! I\'m totally happy for you.<br/>' +
                '<br/>' +
                'No I get it, you probably shouldn\'t share your account... Blizzard are pretty strict about that I guess.<br/>' +
                '<br/>' +
                'You are going where for 12 weeks? Oh, so you like have only this weekend to play before you leave? So are you going to play? ' +
                'Ah ofcourse, you have to go apply for unemployment benefits again. So how are you affording this trip? No matter.<br/>' +
                '<br/>' +
                'Huh?? Mike, this isn\'t the Overwatch anti cheat program from Counter-Strike... this is Blizzard\'s new game. Do you seriously not... what?<br/>' +
                '<br/>' +
                'What KIND of game is this? It\'s a team based shooter. By Blizzard. The people that made WoW. Holy smokes, Mike just hang on oneeeee second. Stay where you are...<br/>',
            score: 1,
            nextEnding: {
                type: 'Defeat',
                title: 'You have been murdered',
                description: 'Mike ... Stay with me! Mike, bro... if you can hear me... what is your Battle.net password???<br/>' +
                    '<br/>' +
                    'Mike?<br/>' +
                    '<br/>' +
                    'Crap.',
                score: 1,
                isAvailable: function() {
                    return true;
                }
            },
            isAvailable: function() {
                return player.characterClassId == 'friend' && player.data['beta']
            }
        },

        /* Salty endings */
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'You shake with salt-induced rage. How dare they overlook you for beta. YOU! You know for a fact that you\'d do a better ' +
                'job than those streamers. Oh, the streamers. Of course they got in and you didn\'t. It\'s all just one big club and you\'re ' +
                'not allowed in. It\'s just like the chess club in high school all over again. <br/>' +
                '<br/>' +
                'Well not this time. You will no longer be invisible. This time they will pay the ultimate price! You open up your web ' +
                'browser, navigate to /r/overwatch and begin furiously writing your final manifesto.<br/>' +
                '<br/>' +
                'POST TITLE: this is bullshit. i own all blizz games and i dndt get in?<br/>' +
                'CONTENT: fuk u bliz.',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.salt == 100;
            }
        },
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'All you had to do was view your Battle.net account management page. That\'s it. You would\'ve been accepted into the beta.<br/>' +
                '<br/>' +
                'Did you just sit there letting your character get salty? That is pretty cruel bro.<br/>' +
                '<br/>' +
                'Or is it that even when you pick the cheat classes you still can\'t win.<br/>' +
                '<br/>' +
                'You make me sick.',
            score: 1,
            isAvailable: function() {
                return (player.characterClassId == 'friend' || player.characterClassId == 'twitch') && player.salt == 100;
            }
        },
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'The salt stings your eyes. Even if you had gotten into beta you aren\'t sure you\'d even be able to click the INSTALL button ' +
                'on the Battle.net client. Not that it matters. You\'re going to miss out and you know it. Well you won\'t go down without ' +
                'a fight. And you know exactly who to blame.<br/>' +
                '<br/>' +
                'The /r/overwatch moderators. They are the ones locking you out of beta. You know for a fact that $$MOD has been gunning ' +
                'for you to be banned ever since you tried to submit those 14 strawpolls to see if anyone else thought it was bullshit ' +
                'that they missed out on the first wave. I bet they have an insider at Blizzard and are telling them who to let in and who to ' +
                'keep out. They\'re like evil Santas with a naughty list.<br/>' +
                '<br/>' +
                'Well you\'ve had enough of these so called moderators. You will lead a revolution against these nazis and you know just ' +
                'how to get it started:<br/>' +
                '<br/>' +
                'POST TITLE: -( ͡° ͜ʖ ͡°)╯╲___卐卐卐卐 Don\'t mind me just taking my mods for a walk',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.salt == 100;
            }
        },
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'You let your rage control you - you realise that now. For one brief moment you became a raging demon of wind, flame ' +
                'and salt and unleashed your mighty fury on the ones who wronged you.<br/>' +
                '<br/>' +
                'Admittedly you might have gone too far. Certainly $$CM did not seem to appreciate the messages you sent her on Twitter. ' +
                'And your excuse, "It was just a prank bro", fell flatter than your beta chances which, by the way, are now zero. You ' +
                'will never be allowed into the Overwatch beta. Or any future Blizzard betas for that matter.<br/>' +
                '<br/>' +
                'In the months that follow you watch as your friends, family and wider community all get into the beta. But not you. ' +
                'Never you. You watch the fun from a distance knowing that Overwatch will be forever Onlywatch to you.<br/>' +
                '<br/>' +
                'You feel the salt begin to rise again.',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.salt == 100;
            }
        },
        {
            type: 'Defeat',
            title: 'The salt has consumed you',
            description: 'Your salty rage is unleashed. Why! WHY! NOT AGAIN!<br/>' +
                '<br/>' +
                'As you rage, you feel something at the back of your mind clawing away. Scratching at your sanity.<br/>' +
                '<br/>' +
                'You are far too salty to realise, but you did something. Something wrong. You used the book.<br/>' +
                '<br/>' +
                'Now He knows you.',
            score: 888, // enslaved ending is higher priority
            isAvailable: function() {
                return player.characterClassId == 'default' && player.salt == 100 && Number(player.data['darkness']) > 0;
            }
        },

        /* Time endings */
        {
            type: 'Defeat',
            title: 'The beta wave has ended',
            description: '"A new wave of accounts from our opt-in pool have just been flagged for Closed Beta access. Emails are on the way!" ' +
                'beams the PlayOverwatch twitter account. But there will be no beta for you. You stare disbelievingly at the Battle.net ' +
                'account management page. Perhaps if you refresh it one more time... no, it\'s hopeless. All invites have gone out.<br/>' +
                '<br/>' +
                'The sadness washes over you as you pull out your calendar and cross off Tuesday. You slump back in your chair and stair ' +
                'at your clock. Seven days to go until the next beta wave.',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.secondsRemaining == 0;
            }
        },
        {
            type: 'Defeat',
            title: 'The beta wave has ended',
            description: 'No! No!! Nononononono! It can\'t be! Not again! You begin texting all your friends. Did you sign up for beta like I told ' +
                'you to? Did you get an invite? FUCK!<br/>' +
                '<br/>' +
                'One by one they all confirm that they missed out. You aren\'t disappointed for them - you were just using them as account ' +
                'mules anyway. If they had gotten in you would have sweet talked your way into borrowing their account. But it would appear they ' +
                'are just as unlucky as you are.<br/>' +
                '<br/>' +
                'An eerie silence settles over social media as the lucky few disappear to play Overwatch while those left behind pick ' +
                'themselves up off the floor. You sigh to yourself, go to /r/overwatch and do the only thing you know how to do:<br/>' +
                '<br/>' +
                'Start a "FUCK" chain. Gotta get that sweet, easy karma.',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.secondsRemaining == 0;
            }
        },
        {
            type: 'Defeat',
            title: 'The beta wave has ended',
            description: 'You are playing a gimmick class - you\'re just supposed to view your Battle.net account management page and you win.<br/>' +
                '<br/>' +
                'But I just knew that there would be some smart ass out there who would sit there and watch the timer tick down to zero so I had to ' +
                'waste my time writing an ending for it.<br/>' +
                '<br/>' +
                'Then I had to test the stupid thing by watching the timer tick down myself. So who is really playing who here?<br/>' +
                '<br/>' +
                'I hate you.',
            score: 1,
            isAvailable: function() {
                return (player.characterClassId == 'friend' || player.characterClassId == 'twitch') && player.secondsRemaining == 0;
            }
        },

        /* Run endings */
        {
            type: 'Defeat',
            title: 'You have fled the Beta wave',
            description: 'It was too much to bear. With tears streaming down your face you flee the building and escape to the sanctity of the woods.<br/>' +
                '<br/>' +
                'Could anyone really blame you for being unable to handle the pressure? The hype for this game can overpower even the best of us, which you ' +
                'aren\'t, so it is no wonder it happened to you.<br/>' +
                '<br/>' +
                'You need time away. Away from this madness. Away from the salt.<br/>' +
                '<br/>' +
                'So you run. Because you can\'t take it. Because you\'re not a hero; you\'re a cowardly guardian, a useless protector. A salty knight.',
            score: 1,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['run'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have fled the Beta wave',
            description: 'What the hell are you doing? All you had to do was check out your Battle.net account management page.<br/>' +
                '<br/>' +
                'Wow.<br/>' +
                '<br/>' +
                'This is a GIMMICK class. You cannot lose! Come on!',
            score: 1,
            isAvailable: function() {
                return (player.characterClassId == 'friend' || player.characterClassId == 'twitch') && player.data['run'];
            }
        },
        {
            type: '???',
            title: 'H̬̘ͬ̅e̛̒̉̈̅͏͖̺̠̖̘͠ ̧̱ͦ͒́̃ͫ̈́̇́í̞̰̕s͇͇̝͋͟͞ ̹̱̠̼͖͕̤ͯͪ̊͑ͫ̈́̀̚͟c̣̓̏̇̿̅̌́̚͘o̴̴̭̊̇̆̔ͧ̂̀m̴͉̥̟͙̄̔̃̈́ͮ͋̏̊i͉̟̤̼͎̮̻̳̒̿ͤ͜͜n̹͓͈̮̗̈̊ͧͭ͊̄̽̾͊͠g͎͇̟͕̲͚ͪ͑͐̾͘ ̧̢͈ͮ̊͆͆ͫ̀̈̾h̓ͮ̈҉͉͚͕̼̳̦͈́ȩ͚̯͕͖̯̫̈͑̐ͧͫͪ ̬͕̖̘͇̫͚̪̠̇ͪ̽͑ͪ̏ͧ͘ị̴̧̰̝̎̉͝s̢̙̯͈̪͙̠͈̬ͩ̃ͣ̉ͫ͝ ̷̧̨̜̯͓̻̪͈͎͆͊̈̍͗ͦ͒̚č̣̦̤̣͔̰͙͟͝o̡̡ͨ̇̓̾̎ͭ̐͑҉͕̩̯̮̟͇̘͈ͅm̡̺̬̞̙̮̂̍͘i̧̱̞͔̘̋͒͒̈́ͩͧ̓ͩ͝n̜̻̞̗̠̑̾ͥ̂ͦ͠ͅg̦̱͇̲̫̓̈̍̊̓̈́͡ͅ ̴̴͔͔̖̲̟͓̝͗͂̋ͧ̓ͬh̫̅͠e͍̍ͣ͒͛ͪ̽ ̙̌̋ͪ́͞i̔ͥ̽҉̨͙̬̮͎̮s̴͈̞̱ͮ͋ͤ̽̾ͨ̔͘ ̵̸̜̳̰̜̳ͧ̾̌̃͝c̷͎͙̼̥̜͖̯̜̓ͬ͆̍ͫͮ̾ȯ͈̣͙̱̲̦̗͙͔͊̀m̶͋̎̽ͥ̊ͮ̀͏̳̩̺͔̰ȉ̢̟̘͖͚̳̑ͯ̎̍̏̀ñ̵͉̀͗͊̑̈́g͍͕͕̟̯̊ͬ̚͟͢ ̘̠̮̟̭̥̅͛̑ͣͥ̾͛ͤ̀ͅẖ̶̠͐ͭ̕e̴̯͇̮̪͋ͤͨ̅̄ ͇͍̤̗͕ͥͫ̒ͬ̈̿͢ï̷̟͇ͩ̓͛s̫͙͖̻̓͆͆͑́̚ ̗̭̉ͭͪ́ͅc̢̤̤̯͓̯̘͕̯͛̍́̽o̙͊͟m̜̠̻̒ͨ̀i̶̤͇͚͚̞̮̖̼ͬ̔͞n̵͇̩͕̳̯ͫ͂̿̊̋̋ͦg̨̧̤͚ͤͣ̌͒ͮ̇̉̚',
            description: '"Run", he said. What choice did you have? You ran.<br/>' +
                '<br/>' +
                'You aren\'t sure what is chasing you. You think it is close. Perhaps it wasn\'t the wisest decision to flee into the woods.<br/>' +
                '<br/>' +
                'The Overwatch Beta seems so far away now. A few hours ago you would have been happy to get into Beta. Now you just don\'t want to die.<br/>' +
                '<br/>' +
                'You are out of breath. Perhaps you have outrun it? You look over your shoulder-',
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['run'] && player.data['slender-email'] && !player.data['slender-research'];
            },
            score: 999
        },
        {
            type: '???',
            title: '            H̶̗̫̙͚̙̳͈̥ͣ̾ͮ͛͌̄E̩̳̮̗̙̥̓̃̈ ̳͖͈̜̾̅ͭ̍ͭ̾ͬC̵͇̲̜̪̼͇̍ͧ͌̆Ö̡̧̟̙̼̹̣̺̺̪̪́̽̿Ṃ̷͇̟̫̇ͬ̌͋̑͜Ȅ͛̄ͨͬ͌ͣ͒̏͏̵̨̮̪͎̙̤̝S̥̺̪͔̳̆ͤ̓ͨͥ̎̀̏͛ͅ',
            description: 'You have what you need. Your mind is at its breaking point; struggling to both contain salt levels no human has ever withstood without ' +
                'doing something stupid on reddit, and to hold back the terror you feel knowing what is chasing you. It is close now. You can practically see the static.<br/>' +
                '<br/>' +
                'You run deeper into the woods. It is dark. It is very close.<br/>' +
                '<br/>' +
                'The spell you read online called for regular table salt. But you have something better - something far more powerful. You have the salt of an OnlyWatcher. ' +
                'It will not see this coming.<br/>' +
                '<br/>' +
                'It is directly behind you. If you were turn around it will strike. Now is your chance - you need to reach the highest level of saltiness possible. You pull your iPhone out and ' +
                'refresh the Account management screen. Not in Beta. Just as planned. The salt washes over you as you become more salty than anyone ever has before.<br/>' +
                '<br/>' +
                'Your eyes glow white.<br/>' +
                '<br/>' +
                'You turn to face the slender man-',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['run'] && player.data['slender-research'] && player.salt >= 90;
            }
        },
        {
            type: '???',
            title: 'Ņ̗͉͍͖̮͕̺ͦ͛͆͘͡o̴̬̜͚ͩ̃̐ͧ ̠̗̹̤͂̈ͪ͆́̄̋̚n̟͓̥͚͖̦͙̥͆̑͘̕ǫ̵̢̮̙͇͖̔ͤͮ̽̅ͨ̊̚ ͇̫̳̟̠̲ͪ͐ͤͫ̑̅̋̐n͖̰͍̩̳̗͋͂͜oͤͮ͂ͦ͛͏̞̭̞̭͚͓̫͢ ̰̗͓̰͓̳ͪ̎͆ͭ̈́̆̃͢ņ̗̮̣̹̘̺͐̃̀̽o͈͍̖̥̪̦ͪ͆͡ ̿̽̔̍ͥ̑̆̿͂͠͏̙͚̺͎͓n̷͈̥̫̘̳̹ͫ͆̾ͫͨ̊̉̄ͤo̸̺̣̘̻̤͕̼̼̊ͬ̏̏̈̆ͩͬͩ ̸̫̜̻ͥ͊͜͝n̷̶͖͎̹̼͖̎ͫ̀ͮ͗͊͌ͨ͝ȍ̜̟͉̋ͧ̑͜ ̠̤͇͙͍͉ͨ̔ͭ̽̈́̿̆̐n̢̳̹̰͖ͨͭ͢o̶̡͉͔̫͗̊ͩͯ̂̌͢ͅ ̗͙̗͖̭͖̩̀̈́̏̏͂̒̑͘͟n̪̞̘̳̞͚͍̗͈̂͢o̫͉͑̓̿̐̊͛̔ͫ́ ̶̴̶͇́ͯ̄̋̎͆n̸̵̙̙̂͑̏ͧ̾ͥ͜o͕͓̫̺̺̗̤͆',
            description: 'Not enough salt. You do not have enough. You ran too early and now you are doomed.<br/>' +
                '<br/>' +
                'It is close now.<br/>' +
                '<br/>' +
                'It is here.',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['run'] && player.data['slender-research'] && player.salt < 90;
            }
        },

        /* Special endings */
        {
            type: 'Victory?',
            title: 'You have merged with Jeff Kaplan',
            description: 'In that moment, as you clumsily pinned the beard to your face, your spirit and Jeff Kaplan\'s merged into a single ' +
                ' mighty being - just as he had always intended.<br/>' +
                '<br/>' +
                'You are not sure why he chose you - perhaps your ample supply of salt will be of use in his plans. <em>Your</em> plans.<br/>' +
                '<br/>' +
                'It is time to set things in motion. The people demand more beta waves and you need more salt. Much, much more.<br/>' +
                '<br/>' +
                'You chuckle to yourself as you think of the futile attempt of your previous host to remove the beard and regain his humanity. He did not know the truth:<br/>' +
                '<br/>' +
                'There must always be a Jeff Kaplan... with a beard.',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['isjkapp'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have died',
            description: 'The odds of eating a poison berry are 1 in 100. If you weren\'t dead, I\'d tell you that maybe your Overwatch Beta chances ' +
                'weren\'t so bleak.<br/>' +
                '<br/>' +
                'But you are dead.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['deadberry'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have died',
            description: 'The odds of dying from cutting yourself on scrap metal are 1 in 100. If you weren\'t dead, I\'d tell you that maybe your Overwatch Beta chances ' +
                'weren\'t so bleak.<br/>' +
                '<br/>' +
                'But you are dead.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['scrap-metal-dead'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have died',
            description: 'You tried to bum rush a guy who is holding two shotguns and you are unarmed. Good thinking.<br/><br/>Also you do not know kung fu.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['museum-shot'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have died',
            description: 'Your gun was not loaded.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['museum-shot-pistol'];
            }
        },
        {
            type: 'Defeat',
            title: 'Your computer has been infected',
            description: 'Yep, a random USB you bought from a shady shop that had an executable called "titan.exe" was a leaked version of Blizzard\'s abandoned ' +
                'MMO. <br/><br/>That\'s quite a stretch there buddy.',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['virus'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have been arrested',
            description: 'For what it\'s worth you absolutely NAILED that window. Unfortunately there will be no Overwatch where you\'re heading.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['brickrage'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have been arrested',
            description: 'You just can\'t walk around with an unlicensed weapon you idiot. Pulling your gun on the police officer and then telling the judge that it was ' +
                '"just a prank" may have gotten you off with a lighter sentence but your insistence on calling the judge "bro" landed you in contempt of court.<br/><br/>' +
                'There is no Overwatch where you are heading.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['unlicensed-weapon'];
            }
        },
        {
            type: 'Defeat',
            title: 'Your Battle.net account has been banned',
            description: 'Turning on that spamming program was probably not the best idea. You knew that the reddit mods have connections at Blizzard...',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['self-spammer-banned'];
            }
        },
        {
            type: 'Defeat',
            title: 'Your Battle.net account has been banned',
            description: 'Yeah so those hacks were just a honeypot. They had the Blizzard logo on them and everything. You even downloaded them from the Battle.net website.',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['hacker'];
            }
        },
        {
            type: 'Defeat',
            title: 'You have died',
            description: 'That orc statue has been there for years. You walk past it every day and today it decides to collapse on you. I\'d say it was ' +
                'ironic, but I don\'t know what irony really means anymore.<br/>' +
                '<br/>' +
                'You are dead.',
            score: 9999,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['deadorcstatue'];
            }
        },
        {
            type: 'Victory?',
            title: 'The Dark Lord of Salt has taken hold',
            description: 'You have been accepted into the Beta but at great cost - your soul.<br/>' +
                '<br/>' +
                'In using that infernal salt cookbook you have allowed yourself to be possessed by a demon known ' +
                'only as the Dark Lord of Salt. You did not know Him before. You certainly know Him now.<br/>' +
                '<br/>' +
                'Your successful attempt at using your own saltiness to mind control the Blizzard CMs was what cost you ' +
                'the last shreds of your humanity. You can feel Him spreading out across your body; getting used to His ' +
                'new host. You feel His disappointment when He realises that you are certainly not the prime physical specimen He ' +
                'desired. You will have to do for now.<br/>' +
                '<br/>' +
                'It is time.',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default'
                    && player.data['mindcontrol']
                    && player.data['mindcontrolpass']
                    && player.data['beta']
            }
        },
        {
            type: 'Defeat',
            title: 'You have been enslaved by the Dark Lord of Salt',
            description: 'You meddled with powers you did not comprehend.<br/>' +
                '<br/>' +
                'In using that infernal salt cookbook you have allowed yourself to be possessed by a demon known ' +
                'only as the Dark Lord of Salt. You did not know Him before. You certainly know Him now.<br/>' +
                '<br/>' +
                'You used the book too many times. It was just enough to give Him enough of a grip on your soul.<br/>' +
                '<br/>' +
                'Ph\'nglui mglw\'nafh Saltulu R\'lyehsalt wgah\'nagl fhtagn',
            score: 999,
            isAvailable: function() {
                return player.characterClassId == 'default' && Number(player.data['darkness']) > 30;
            }
        },
        {
            type: '???',
            title: 'F͎̬̪̼͚͎͎͊͂́͢o̵̡̯̥̟͚͚̓͌̐͗͠ǫ̗̞ͨ̌ͮͭ̒̾͘l̼͓̹̏̇',
            description: 'You thought you were so lucky. You finally were accepted into the Overwatch Beta. Your life was about to change.<br/>' +
                '<br/>' +
                'You saw it. On your walk; the tall, thin man. You did nothing. You tried to forget.<br/>' +
                '<br/>' +
                'It did not forget you. Perhaps it was cruel for it to attack you immediately after you were accepted.<br/>' +
                '<br/>' +
                'The slender man has you.',
            score: 888,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['slender-spotted'] && player.data['beta'] && !player.data['slender-email'];
            }
        },
        {
            type: '???',
            title: 'F͎̬̪̼͚͎͎͊͂́͢o̵̡̯̥̟͚͚̓͌̐͗͠ǫ̗̞ͨ̌ͮͭ̒̾͘l̼͓̹̏̇',
            description: 'You thought you were so lucky. You finally were accepted into the Overwatch Beta. Your life was about to change.<br/>' +
            '<br/>' +
            'You saw it. On your walk; the tall, thin man. Alex tried to warn you but you ignored the warnings. You should have run.<br/>' +
            '<br/>' +
            'Perhaps it was cruel for it to attack you immediately after you were accepted. It doesn\'t matter anymore.<br/>' +
            '<br/>' +
            'The slender man has you.',
            score: 888,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['slender-spotted'] && player.data['beta'] && player.data['slender-email'];
            }
        },
        {
            type: '???',
            title: 'F͎̬̪̼͚͎͎͊͂́͢o̵̡̯̥̟͚͚̓͌̐͗͠ǫ̗̞ͨ̌ͮͭ̒̾͘l̼͓̹̏̇',
            description: 'You curse your luck. Not because of what currently stands behind you, but because you were not accepted into the Overwatch Beta.<br/>' +
                '<br/>' +
                'In a moment that will not matter.<br/>' +
                '<br/>' +
                'You saw it. On your walk; the tall, thin man. You did nothing. You tried to forget.<br/>' +
                '<br/>' +
                'It did not forget you.<br/>' +
                '<br/>' +
                'The slender man has you.',
            score: 888,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['slender-spotted'] && !player.data['beta'] && !player.data['slender-email'];
            }
        },
        {
            type: '???',
            title: 'F͎̬̪̼͚͎͎͊͂́͢o̵̡̯̥̟͚͚̓͌̐͗͠ǫ̗̞ͨ̌ͮͭ̒̾͘l̼͓̹̏̇',
            description: 'You curse your luck. Not because of what currently stands behind you, but because you were not accepted into the Overwatch Beta.<br/>' +
            '<br/>' +
            'In a moment that will not matter.<br/>' +
            '<br/>' +
            'You saw it. On your walk; the tall, thin man. Alex tried to warn you but you ignored the warnings. You should have run.<br/>' +
            '<br/>' +
            'The slender man has you.',
            score: 888,
            isAvailable: function() {
                return player.characterClassId == 'default' && player.data['slender-spotted'] && !player.data['beta'] && player.data['slender-email'];
            }
        }
    ];

    function getEnding() {

        // Sort endings so that the highest scoring are first.
        endings.sort(function compareFunction(a, b) {

            var aScore = null;
            if (typeof a.score === 'function') {
                aScore = a.score();
            } else {
                aScore = a.score;
            }
            var bScore = null;
            if (typeof b.score === 'function') {
                bScore = b.score();
            } else {
                bScore = b.score;
            }

            if (aScore > bScore) {
                // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
                return -1;
                // If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
            } else if (bScore > aScore) {
                return 1;
            }
            // If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
            return 0;

        });

        var candidates = [];
        var maxScore = 0;

        for (var i = 0; i < endings.length; i++) {
            var ending = endings[i];
            if (ending.isAvailable && !ending.isAvailable()) {
                continue;
            }
            var score;
            if (typeof ending.score === 'function') {
                score = ending.score();
            } else {
                score = ending.score;
            }
            if (score > maxScore) {
                maxScore = score;
            }
            if (score == maxScore) {
                candidates.push(ending);
            } else {
                break;
            }
        }
        console.debug('Selecting ending from %s candidates %O', candidates.length, candidates);
        console.debug('Your state: %O', player);

        return random.randomArray(candidates);
    }

    return {
        getEnding: getEnding
    }

});