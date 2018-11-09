var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var prevDay;
var day;
var hoursUntil = '';
var minutesUntil = '';
var secondsUntil = '';
var thisTime = new Date();
var monthNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.token,
   autorun: true
});

bot.on('any', function(event) {
    if (true){
			let thisHour = (thisTime.getHours() - 5);
	    		let thisDay = thisTime.getDate();
	    		let thisMinute = thisTime.getMinutes()
			let thisSecond = thisTime.getSeconds()
			if (thisHour < 0){
				thisHour = 24 + thisHour;
				thisDay = thisDay - 1;
			}
	  		if (thisDay < 1){
				thisDay = monthNumbers[thisTime.getMonth()];
			}
	    hoursUntil = (23 - thisHour);
	    minutesUntil = (59 - thisMinute);
	    secondsUntil = (59 - thisSecond);
		
		prevDay = day;
		day = thisDay;
    }
});

function userMessageID(userID) {
	return new Promise((resolve, reject) => {
        bot.getMessage({
            channelID: '509160162959949825', 
            messageID: '509164727696359444' 
        }, function (err,res){
            if(err) reject(err);
            let output = (res.content.substring((res.content.indexOf(userID) + 20), (res.content.indexOf(userID) + 38)));
            resolve(output);
        })
    })
}
function getLeadAmount(messID){
	return new Promise((resolve, reject) => {
        bot.getMessage({
            channelID: '509149632618823681', 
            messageID: messID
        }, function (err,res){
            if(err) reject(err);
            let output = parseInt(res.content.substring(0, res.content.indexOf(',')));
            resolve(output);
        })
    })
}
function getKarmaAmount(messID){
	return new Promise((resolve, reject) => {
        bot.getMessage({
            channelID: '509149632618823681', 
            messageID: messID
        }, function (err,res){
            if(err) reject(err);
		let karmaGetting = ress.content.substring(ress.content.indexOf(',') + 2);
		karmaGetting = parseInt(karmaGetting.substring(0, karmaGetting.indexOf(',')));
            resolve(karmaGetting);
        })
    })
}


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	message = message.toUpperCase();
	if (userID == '495705429150793739' && channelID == '509920937093890058'){
		bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
			if (tacobell.content.includes(message)){
					let cussMessID = (tacobell.content.substring((tacobell.content.indexOf(message) + 20), (tacobell.content.indexOf(message) + 38)));
						bot.getMessage({
							channelID: '509149632618823681',
							messageID: cussMessID
						}, function (err, res){
							let cussMess = res.content.substring(res.content.indexOf(',') + 2);
							let karmaCuss = parseInt(cussMess.substring(0, cussMess.indexOf(','))) - 1;
							if (karmaCuss < 1) karmaCuss = 0;
							bot.editMessage({
								channelID: '509149632618823681',
								messageID: cussMessID,
								message: res.content.substring(0, res.content.indexOf(',') + 2) + karmaCuss + cussMess.substring(cussMess.indexOf(','))
							});
						});	
			}
		});
	}
	
    if (message.substring(0, 1) == '?' && !(bot.users[userID].bot)) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
	
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
		case 'PING':
			bot.getMessage({ channelID: channelID, messageID: '509161596023603211' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
			bot.getMessage({ channelID: channelID, messageID: '509161613925023754' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
			bot.getMessage({ channelID: channelID, messageID: '509161637815517184' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
			bot.getMessage({ channelID: channelID, messageID: '509198004327022603' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
			bot.getMessage({ channelID: channelID, messageID: '509161625413222400' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
			bot.getMessage({ channelID: channelID, messageID: '509456912337731615' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
			bot.getMessage({ channelID: channelID, messageID: '509456917266038785' }, function (err, res){
			bot.editMessage({
				channelID: channelID,
				messageID: res.id,
				message: res.content + ', 0'
			});
			});
            break;
		case 'GIVE':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
					let validSyn = true;
					for(var i = 28; i < message.length; i++){
						if ((message.charCodeAt(i, i+1) < 48 || message.charCodeAt(i, i+1) > 57) && message.substring(i, i+1) != ' '){
							validSyn = false;
						}
					}
					if (message.length > 28 && validSyn){
						if (tacobell.content.includes(message.substring(8, 26)) && message.substring(8, 26) != userID){
							let giverMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
							let recieverMessID = (tacobell.content.substring((tacobell.content.indexOf(message.substring(8, 26)) + 20), (tacobell.content.indexOf(message.substring(8, 26)) + 38)));
							bot.getMessage({
								channelID: '509149632618823681',
								messageID: giverMessID
							}, function (err, res){
								if (!(parseInt(message.substring(28)) < 1) && parseInt(res.content.substring(0, res.content.indexOf(','))) >= parseInt(message.substring(28))){
									let karmaMess = res.content.substring(res.content.indexOf(',') + 2);
									bot.editMessage({
										channelID: '509149632618823681',
										messageID: giverMessID,
										message: (parseInt(res.content.substring(0, res.content.indexOf(','))) - parseInt(message.substring(28))) + ', ' + (parseInt(karmaMess.substring(0, karmaMess.indexOf(','))) + parseInt(message.substring(28))) + (karmaMess.substring(karmaMess.indexOf(',')))
									});
									bot.sendMessage({
										to: channelID,
										message: message.substring(6, 27) + ', ' + user + ' has sent you ' + message.substring(28) + '<:lead:509862462712053762>lead'
									});
									bot.getMessage({
										channelID: '509149632618823681',
										messageID: recieverMessID
									}, function (errr, ress){
											let karmaRecMess = ress.content.substring(ress.content.indexOf(',') + 2);
											let endKarma = (parseInt(karmaRecMess.substring(0, karmaRecMess.indexOf(','))) - parseInt(message.substring(28)))
											if (endKarma < 1) endKarma = 0;
											bot.editMessage({
												channelID: '509149632618823681',
												messageID: recieverMessID,
												message: (parseInt(ress.content.substring(0, ress.content.indexOf(','))) + parseInt(message.substring(28))) + ', ' + endKarma + (karmaRecMess.substring(karmaRecMess.indexOf(',')))
											});
									});
								} else if (parseInt(message.substring(28)) < 1){
									bot.sendMessage({
										to: channelID,
										message: 'You can\'t give less than 1 lead silly!'
									});
								} else {
									bot.sendMessage({
										to: channelID,
										message: 'You don\'t have that much!'
									});
								}
							});
						} else if (message.substring(8, 26) == userID){
							bot.sendMessage({
								to: channelID,
								message: user + ', you can\'t send money to yourself!'
							});
						} else {
							bot.sendMessage({
								to: channelID,
								message: user + ', the user you tried to give to has no data with this bot.'
							});
						}
					} else if(validSyn) {
						bot.sendMessage({
							to: channelID,
							message: 'Invalid Args!'
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: 'Invalid Syntax!'
						});
					}
				} else {
					bot.sendMessage({
						to: channelID,
						message: user + ', please run the "newUser" command to start using this bot'
					});
				}
			});
			break;
		case 'COINFLIP':
		case 'CF':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
					let hORt = 'heads'
					let begMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
					if (message.includes('HEADS')){
					    message = message.substring(0, message.indexOf('HEADS')) + message.substring(message.indexOf('HEADS') + 5)
					} else if (message.includes('HEAD')){
					    message = message.substring(0, message.indexOf('HEAD')) + message.substring(message.indexOf('HEAD') + 4)
					} else if (message.includes('H')){
					    message = message.substring(0, message.indexOf('H')) + message.substring(message.indexOf('H') + 1)
					}  else if (message.includes('TAILS')){
						hORt = 'tails';
					    message = message.substring(0, message.indexOf('TAILS')) + message.substring(message.indexOf('TAILS') + 5)
					}  else if (message.includes('TAIL')){
						hORt = 'tails';
					    message = message.substring(0, message.indexOf('TAIL')) + message.substring(message.indexOf('TAIL') + 4)
					}  else if (message.includes('T')){
						hORt = 'tails';
					    message = message.substring(0, message.indexOf('T')) + message.substring(message.indexOf('T') + 1)
					}
					message = message.trim()
					let canCF = true;
					if (message.substring(0, 9) == '?COINFLIP'){
						for(var i = 10; i < message.length; i++){
							if ((message.charCodeAt(i, i+1) < 48 || message.charCodeAt(i, i+1) > 57) && message.substring(i, i+1) != ' '){
								canCF = false;
							}
						}
					} else {
						for (var i = 4; i < message.length; i++){
						     if ((message.charCodeAt(i, i+1) < 48 || message.charCodeAt(i, i+1) > 57) && message.substring(i, i+1) != ' '){
								canCF = false;
							}
						}
					}
					if (canCF){
						bot.getMessage({
							channelID: '509149632618823681',
							messageID: begMessID
						}, function (err, res){
							if (0 < parseInt(message.substring(4)) && parseInt(res.content.substring(0, res.content.indexOf(','))) >= parseInt(message.substring(4))){
								if (hORt == 'heads'){
									if ((Math.floor(Math.random() * 2)) == 1){
										bot.editMessage({
											messageID: begMessID,
											message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + (parseInt(message.substring(4)))) + ',' + (res.content.substring(res.content.indexOf(',') +1))
										}, function (errr, ress){
											bot.sendMessage({
												to: channelID,
												message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose heads. \nThe coin flips... <a:cf:509424634865909787>'
											}, function (errrr, resss){
												setTimeout(() => {
													bot.editMessage({
														channelID: channelID,
														messageID: resss.id,
														message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose heads. \nThe coin flips... <:heads:509424625558749185> ... and lands on heads! You won '  + (parseInt(message.substring(4))*2) + ' lead!'
													});
												}, 2000);
											});
										});
									} else {
										bot.editMessage({
											channelID: '509149632618823681',
											messageID: begMessID,
											message: (parseInt(res.content.substring(0, res.content.indexOf(','))) - (parseInt(message.substring(4)))) + ',' + (res.content.substring(res.content.indexOf(',') +1))
										}, function (errr, ress){
											bot.sendMessage({
												to: channelID,
												message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose heads. \nThe coin flips... <a:cf:509424634865909787>'
											}, function (errrr, resss){
												setTimeout(() => {
													bot.editMessage({
														channelID: channelID,
														messageID: resss.id,
														message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose heads. \nThe coin flips... <:tails:509424611721609227> ... and lands on tails... you lost your '  + (parseInt(message.substring(4))) + ' lead.'
													});
												}, 2000);
											});
										});
									}
								} else if (hORt == 'tails'){
									if ((Math.floor(Math.random() * 2)) == 1){
										bot.editMessage({
											channelID: '509149632618823681',
											messageID: begMessID,
											message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + (parseInt(message.substring(4)))) + ',' + (res.content.substring(res.content.indexOf(',') +1))
										}, function (errr, ress){
											bot.sendMessage({
												to: channelID,
												message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose tails. \nThe coin flips... <a:cf:509424634865909787>'
											}, function (errrr, resss){
												setTimeout(() => {
													bot.editMessage({
														channelID: channelID,
														messageID: resss.id,
														message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose tails. \nThe coin flips... <:tails:509424611721609227> ... and lands on tails! You won '  + (parseInt(message.substring(4))*2) + ' lead!'
													});
												}, 2000);
											});
										});
									} else {
										bot.editMessage({
											channelID: '509149632618823681',
											messageID: begMessID,
											message: (parseInt(res.content.substring(0, res.content.indexOf(','))) - (parseInt(message.substring(4)))) + ',' + (res.content.substring(res.content.indexOf(',') +1))
										}, function (errr, ress){
											bot.sendMessage({
												to: channelID,
												message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose tails. \nThe coin flips... <a:cf:509424634865909787>'
											}, function (errrr, resss){
												setTimeout(() => {
													bot.editMessage({
														channelID: channelID,
														messageID: resss.id,
														message: user + ', you spent ' + message.substring(4) + ' <:lead:509862462712053762>lead and chose tails. \nThe coin flips... <:heads:509424625558749185> ... and lands on heads... you lost your '  + (parseInt(message.substring(4))) + ' lead.'
													});
												}, 2000);
											});
										});
									}
								}
							} else if(parseInt(res.content.substring(0, res.content.indexOf(','))) < parseInt(message.substring(4))) {
								bot.sendMessage({
									to: channelID,
									message: 'You can\'t bet more lead than you own ' + user + '!'
								});
							} else {
								bot.sendMessage({
									to: channelID,
									message: 'You can\'t bet less than 1 lead'
								});
							}
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: 'Invalid Syntax!!'
						});
					}
					} else {
						bot.sendMessage({
							to: channelID,
							message: user + ', please run the "newUser" command to start using this bot'
						});
				}
			});
			break;
		case 'KARMA':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell) {
				if (tacobell.content.includes(userID)){
					let leadMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
					bot.getMessage({
						channelID: '509149632618823681',
						messageID: leadMessID
					}, function (err, res){
						let karmLoc = res.content.substring(res.content.indexOf(',') + 2);
						bot.sendMessage({
							to: channelID,
							message: user + ', you currently have ' + karmLoc.substring(0, karmLoc.indexOf(',')) + ' karma!'
						});
					});	
				} else {
					bot.sendMessage({
						to: channelID,
						message: user + ', please run the "newUser" command to start using this bot'
					});
				}
			});
			break;
		case 'NEW_USER':
			bot.sendMessage({
				to: '509149632618823681',
				message: '0, 0, 0, 0, 0, 0, 0, 0'
			});
			break;
		case 'NEWUSER':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (!tacobell.content.includes(userID)){
					bot.sendMessage({
						to: '509149632618823681',
						message: '0, 0, 0, 0, 0, 0, 0, 0'
					}, function (err, res){
						bot.editMessage({
							channelID: '509160162959949825',
							messageID: '509164727696359444',
							message: tacobell.content + ' ' + userID + ', ' + res.id + ';'
						});
						bot.sendMessage({
							to: channelID,
							message: 'Congrats ' + user + '! You can now use this bot fully.'
						});
					});	
				} else {
					bot.sendMessage({
						to: channelID,
						message: user + ', you are not a new user of this bot'
					});
				}
			});
			break;
		case 'DOTHIS':
			bot.sendMessage({
				to: channelID,
				message: 'plsno'
			});
			break;
			case 'BEG':
			if (message.length > 4){
				bot.sendMessage({
					to: channelID,
					message: 'Invalid Syntax!'
				});
				} else {
				bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
					if (tacobell.content.includes(userID)){
							bot.sendMessage({
								to: channelID,
								message: user + ', your begging has been answered. Your <:lead:509862462712053762>lead count has increased by 1'
							});
						let begMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
						bot.getMessage({
							channelID: '509149632618823681',
							messageID: begMessID
						}, function (err, res){
							bot.editMessage({
								channelID: '509149632618823681',
								messageID: begMessID,
								message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + 1) + ',' + (res.content.substring(res.content.indexOf(',') +1))
							});
						});	
					} else {
						bot.sendMessage({
							to: channelID,
							message: user + ', please run the "newUser" command to start using this bot'
						});
					}
				});
				}
				break;
				case 'LEAD':
				bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
					let leadMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
					bot.getMessage({
						channelID: '509149632618823681',
						messageID: leadMessID
					}, function (err, res){
						bot.sendMessage({
							to: channelID,
							message: user + ', you currently have ' + res.content.substring(0, res.content.indexOf(',')) + ' <:lead:509862462712053762>lead!'
						});
					});	
					} else {
						bot.sendMessage({
							to: channelID,
							message: user + ', please run the "newUser" command to start using this bot'
						});
					}
				});
					break;
		case 'TESTERWIPE':
			if (userID == '393586279964475393'){
				bot.editMessage({
					channelID: '509149632618823681',
					messageID: '509161596023603211',
					message: '2500, 0, 0, 0, 0, 0, 0, 0'
				});
				bot.editMessage({
					channelID: '509149632618823681',
					messageID: '509161613925023754',
					message: '2500, 0, 0, 0, 0, 0, 0, 0'
				});
				bot.editMessage({
					channelID: '509149632618823681',
					messageID: '509161625413222400',
					message: '2500, 0, 0, 0, 0, 0, 0, 0'
				});
				bot.editMessage({
					channelID: '509149632618823681',
					messageID: '509198004327022603',
					message: '2500, 0, 0, 0, 0, 0, 0, 0'
				});
			}
			break;
			case 'ORANGE':
				bot.sendMessage({
					to: channelID,
					message: '!fire'
				});
			break;
			
            // Just add any case commands if you want to..
         }
     }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
