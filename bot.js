var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var prevDay;
var day;
var hoursUntil = '';
var minutesUntil = '';
var secondsUntil = '';
var second = '';
var thisTime = new Date();
var monthNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var levelReq = [1000, 2500, 5000, 10000, 25000]
var hasBegged = [];
var begTimes = [];


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
			thisTime = new Date();
			let thisHour = (thisTime.getHours() - 5);
	    		let thisDay = thisTime.getDate();
	    		let thisMinute = thisTime.getMinutes()
			let thisSecond = thisTime.getSeconds()
			second = thisTime.getTime()
			if (thisHour < 0){
				thisHour = 24 + thisHour;
				thisDay = thisDay - 1;
			}
	  		if (thisDay < 1){
				thisDay = monthNumbers[thisTime.getMonth()];
			}
	    
	    for (var i = 0; i < begTimes.length; i = i){
		    if (begTimes[i] < second){
			    begTimes.splice(i, 1)
			    hasBegged.splice(i, 1)
		    } else {
			    i++
		    }
	    }
			    
	    hoursUntil = (23 - thisHour);
	    minutesUntil = (59 - thisMinute);
	    secondsUntil = (59 - thisSecond);
		
		prevDay = day;
		day = thisDay;
	    if (prevDay != day && prevDay != undefined){
		    bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
					for (var i = 20; i < tacobell.content.length; i = i + 41){
					    let edtMessID = tacobell.content.substring(i, i + 18)
					    bot.getMessage({
						    channelID: '509149632618823681',
						    messageID: edtMessID
					    }, function (err, res) {
						    if (res != undefined){
								setTimeout(() => {
							    	bot.editMessage({
									    channelID: '509149632618823681',
									    messageID: edtMessID,
									    message: (res.content.substring(0, res.content.length - 1) + '0')
								    }, function (err, res){
									if(err != null){
										if(err.statusCode == 429){
											i = i - 41
										}
									}
								    });
							    	}, 50*i);
						    }
					    });
				    }
			    });
	    }
    }
});



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
			bot.editMessage({
				channelID: '509149632618823681', 
				messageID: '509198004327022603',
				message: '5005, 0, 0, 0, 0, 0, 0, 0, 1'
			});
			
            break;
		case 'MANUALDAILYRESET':
			if (userID == '393586279964475393'){
				bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
					for (var i = 20; i < tacobell.content.length; i = i + 41){
					    let edtMessID = tacobell.content.substring(i, i + 18)
					    bot.getMessage({
						    channelID: '509149632618823681',
						    messageID: edtMessID
					    }, function (err, res) {
						    if (res != undefined){
								setTimeout(() => {
							    	bot.editMessage({
									    channelID: '509149632618823681',
									    messageID: edtMessID,
									    message: (res.content.substring(0, res.content.length - 1) + '0')
								    }, function (err, res){
									    console.log(err)
									if(err != null){
										if(err.statusCode == 429){
											i = i - 41
										}
									}
								    });
							    	}, 50*i);

						    }
					    });
				    }
			    });
			}
			break;
		case 'GIFT':
			if(userID == '393586279964475393'){
				bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
					let validSyn = true
					for(var i = 30; i < message.length; i++){
						if ((message.charCodeAt(i, i+1) < 48 || message.charCodeAt(i, i+1) > 57) && message.substring(i, i+1) != ' '){
							validSyn = false;
						}
					}
					if (message.length > 30 && validSyn){
						let userrcID = 10;
						let subofGive = 30;
						if (message.includes('<@!')){
							userrcID = 11;
							subofGive = 31;
						}
						if (tacobell.content.includes(message.substring(userrcID, userrcID + 18)) && message.substring(6,7) == 'L'){
							let recieverMessID = (tacobell.content.substring((tacobell.content.indexOf(message.substring(userrcID, userrcID + 18)) + 20), (tacobell.content.indexOf(message.substring(userrcID, userrcID + 18)) + 38)));
							bot.sendMessage({
								to: channelID,
								message: 'You\'ve been gifted ' + message.substring(subofGive) + ' <:lead:509862462712053762>lead!'
							});
							bot.getMessage({
								channelID: '509149632618823681',
								messageID: recieverMessID
							}, function (errr, ress){
								bot.editMessage({
									channelID: '509149632618823681',
									messageID: recieverMessID,
									message: (parseInt(ress.content.substring(0, ress.content.indexOf(','))) + parseInt(message.substring(subofGive))) + ress.content.substring(ress.content.indexOf(','))
								});
							});
						} else if (tacobell.content.includes(message.substring(userrcID, userrcID + 18)) && message.substring(6,7) == 'K'){
							let recieverMessID = (tacobell.content.substring((tacobell.content.indexOf(message.substring(userrcID, userrcID + 18)) + 20), (tacobell.content.indexOf(message.substring(userrcID, userrcID + 18)) + 38)));
							bot.sendMessage({
								to: channelID,
								message: 'You\'ve been gifted ' + message.substring(subofGive) + ' karma!'
							});
							bot.getMessage({
								channelID: '509149632618823681',
								messageID: recieverMessID
							}, function (errr, ress){
								let karmaMess = ress.content.substring(ress.content.indexOf(' ') + 1)
								console.log(karmaMess)
								console.log((parseInt(karmaMess.substring(0, karmaMess.indexOf(','))) + parseInt(message.substring(subofGive))))
								console.log(parseInt(message.substring(subofGive)
								bot.editMessage({
									channelID: '509149632618823681',
									messageID: recieverMessID,
									message: parseInt(ress.content.substring(0, ress.content.indexOf(','))) + (parseInt(karmaMess.substring(0, karmaMess.indexOf(','))) + parseInt(message.substring(subofGive))) + karmaMess.substring(karmaMess.indexOf(','))
								});
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
				});
			}
			break;
		case 'DAILY':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
					let dailyMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
					bot.getMessage({
						channelID: '509149632618823681',
						messageID: dailyMessID
					}, function (err, res) {
						if (parseInt(res.content.substring(res.content.length - 1)) == 0){
							bot.editMessage({
								channelID: '509149632618823681',
								messageID: dailyMessID,
								message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + 150) + res.content.substring(res.content.indexOf(','), res.content.length - 1) + '1'
							});
							bot.sendMessage({
								to: channelID,
								message: user + ', you have collected your daily 150 <:lead:509862462712053762>lead!'
							});
						} else {
							bot.sendMessage({
								to: channelID,
								message: 'OOF ' + user + '! You can\'t collect your daily lead for another ' + hoursUntil + ' hours, ' + minutesUntil + ' minutes, and ' + secondsUntil + ' seconds!'
							});
						}
					});
				} else {
					bot.sendMessage({
						to: channelID,
						message: user + ', please run the "newUser" command to start using this bot'
					});
				}
			});
			break;
		break;
		case 'LEVEL':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
					let levelMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
					let userLevel = 0;
					let leadTillNext = 0;
					bot.getMessage({
						channelID: '509149632618823681',
						messageID: levelMessID
					}, function (err, res){
						let karmaMess = res.content.substring(res.content.indexOf(' ')+1)
						leadTillNext = 1000 - (parseInt(karmaMess.substring(0, karmaMess.indexOf(','))));
						for (var i = 0; i <= levelReq.length; i++){
							if (parseInt(karmaMess.substring(0, karmaMess.indexOf(','))) >= levelReq[i]){
								userLevel = i + 1;
								if (i != 5){
									leadTillNext = ((levelReq[i+1]) - parseInt(karmaMess.substring(0, karmaMess.indexOf(','))));
								}
							} else {
								break;
							}
						}
						let sendMess = user + ', you are level ' + (userLevel + 1) + '! You will gain ' + userLevel + ' extra <:lead:509862462712053762>lead for each ?beg! \n';
						if (userLevel != 5){
							sendMess = sendMess + 'You have ' + leadTillNext + ' karma left to get to the next level!'
						} else {
							sendMess = sendMess + 'You are currently the max level! Congrats!';
						}
						bot.sendMessage({
							to: channelID,
							message: sendMess
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
						let userrcID = 8;
						let subofGive = 28;
						if (message.includes('<@!')){
							userrcID = 9;
							subofGive = 29;
						}
						if (tacobell.content.includes(message.substring(userrcID, userrcID + 18)) && message.substring(userrcID, userrcID + 18) != userID){
							let giverMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
							let recieverMessID = (tacobell.content.substring((tacobell.content.indexOf(message.substring(userrcID, userrcID + 18)) + 20), (tacobell.content.indexOf(message.substring(userrcID, userrcID + 18)) + 38)));
							bot.getMessage({
								channelID: '509149632618823681',
								messageID: giverMessID
							}, function (err, res){
								if (!(parseInt(message.substring(subofGive)) < 1) && parseInt(res.content.substring(0, res.content.indexOf(','))) >= parseInt(message.substring(28))){
									let karmaMess = res.content.substring(res.content.indexOf(',') + 2);
									bot.editMessage({
										channelID: '509149632618823681',
										messageID: giverMessID,
										message: (parseInt(res.content.substring(0, res.content.indexOf(','))) - parseInt(message.substring(subofGive))) + ', ' + (parseInt(karmaMess.substring(0, karmaMess.indexOf(','))) + parseInt(message.substring(subofGive))) + (karmaMess.substring(karmaMess.indexOf(',')))
									});
									bot.sendMessage({
										to: channelID,
										message: message.substring(userrcID - 3, subofGive - 1) + ', ' + user + ' has sent you ' + message.substring(subofGive) + '<:lead:509862462712053762>lead'
									});
									bot.getMessage({
										channelID: '509149632618823681',
										messageID: recieverMessID
									}, function (errr, ress){
											let karmaRecMess = ress.content.substring(ress.content.indexOf(',') + 2);
											let endKarma = (parseInt(karmaRecMess.substring(0, karmaRecMess.indexOf(','))) - parseInt(message.substring(subofGive)))
											if (endKarma < 1) endKarma = 0;
											bot.editMessage({
												channelID: '509149632618823681',
												messageID: recieverMessID,
												message: (parseInt(ress.content.substring(0, ress.content.indexOf(','))) + parseInt(message.substring(subofGive))) + ', ' + endKarma + (karmaRecMess.substring(karmaRecMess.indexOf(',')))
											});
									});
								} else if (parseInt(message.substring(subofGive)) < 1){
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
						} else if (message.substring(userrcID, userrcID + 18) == userID){
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
							if (0 < parseInt(message.substring(message.indexOf(' '))) && parseInt(res.content.substring(0, res.content.indexOf(','))) >= parseInt(message.substring(4))){
								if (hORt == 'heads'){
									if ((Math.floor(Math.random() * 2)) == 1){
										bot.editMessage({
											channelID: '509149632618823681',
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
				message: '0, 0, 0, 0, 0, 0, 0, 0, 0'
			});
			break;
		case 'NEWUSER':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (!tacobell.content.includes(userID)){
					bot.sendMessage({
						to: '509149632618823681',
						message: '0, 0, 0, 0, 0, 0, 0, 0, 0'
					}, function (err, res){
						bot.editMessage({
							channelID: '509160162959949825',
							messageID: '509164727696359444',
							message: ' \n' + tacobell.content + ' ' + userID + ', ' + res.id + ';'
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
						let userLevel = 0;
						if (!hasBegged.includes(userID)){
							hasBegged.push(userID);
							begTimes.push(second + 5000);
							let begMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
							bot.getMessage({
								channelID: '509149632618823681',
								messageID: begMessID
							}, function (err, res){
								let karmaMess = res.content.substring(res.content.indexOf(' ')+1)
								for (var i = 0; i <= levelReq.length; i++){
									if (parseInt(karmaMess.substring(0, karmaMess.indexOf(','))) >= levelReq[i]){
										userLevel = i + 1;
									} else {
										break;
									}
								}
								if (userLevel > 0){
									bot.sendMessage({
										to: channelID,
										message: user + ', your begging has been answered. Your <:lead:509862462712053762>lead count has increased by 1 \nKarma is in your favor. You recieve an additional ' + userLevel + ' <:lead:509862462712053762>lead!'
									});
								} else {
									bot.sendMessage({
										to: channelID,
										message: user + ', your begging has been answered. Your <:lead:509862462712053762>lead count has increased by 1'
									});
								}
								bot.editMessage({
									channelID: '509149632618823681',
									messageID: begMessID,
									message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + 1 + userLevel) + ',' + (res.content.substring(res.content.indexOf(',') +1))
								});
							});
						} else {
							let indx = '';
							for (var i = 0; i < hasBegged.length; i++){
								if (hasBegged[i] == userID){
									indx = i;
									break;
								}
							}
							let timeLeft = (begTimes[indx] - second);
							timeLeft = timeLeft/1000
							bot.sendMessage({
								to: channelID,
								message: user + ', please wait ' + timeLeft + ' more seconds before begging again'
							});
						}
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
