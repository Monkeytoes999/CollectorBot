var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var tacobell = '';
var useData = '';

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




bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	message = message.toUpperCase();
		
    if (message.substring(0, 1) == '?' && !(bot.users[userID].bot)) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'PING':
			if (message.includes('heads')){
					    message = message.substring(0, message.indexOf('heads')) + message.substring(message.indexOf('heads') + 6)
					} else if (message.includes('head')){
					    message = message.substring(0, message.indexOf('head')) + message.substring(message.indexOf('head') + 5)
					} else if (message.includes('h')){
					    message = message.substring(0, message.indexOf('h')) + message.substring(message.indexOf('h') + 2)
					}  else if (message.includes('tails')){
					    message = message.substring(0, message.indexOf('tails')) + message.substring(message.indexOf('tails') + 6)
					}  else if (message.includes('tail')){
					    message = message.substring(0, message.indexOf('tail')) + message.substring(message.indexOf('tail') + 5)
					}  else if (message.includes('t')){
					    message = message.substring(0, message.indexOf('t')) + message.substring(message.indexOf('t') + 2)
					}
                bot.sendMessage({
                    to: channelID,
                    message: message
                });
            break;
		case 'CF':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
					let hORt = 'heads'
					let begMessID = (tacobell.content.substring((tacobell.content.indexOf(userID) + 20), (tacobell.content.indexOf(userID) + 38)));
					bot.getMessage({
						channelID: '509149632618823681',
						messageID: begMessID
					}, function (err, res){
						if (parseInt(res.content.substring(0, res.content.indexOf(','))) >= parseInt(message.substring(4))){
							if (hORt = 'heads'){
								if ((Math.floor(Math.random() * 2)) == 1){
									bot.editMessage({
										channelID: '509149632618823681',
										messageID: begMessID,
										message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + (parseInt(message.substring(4)))) + ',' + (res.content.substring(res.content.indexOf(',') +1))
									}, function (errr, ress){
										bot.sendMessage({
											to: channelID,
											message: 'You spent ' + message.substring(4) + ' lead and chose heads. \nThe coin flips... <a:cf:509424634865909787>'
										}, function (errrr, resss){
											setTimeout(() => {
												bot.editMessage({
													channelID: channelID,
													messageID: resss.id,
													message: 'You spent ' + message.substring(4) + ' lead and chose heads. \nThe coin flips... <:heads:509424625558749185> ... and lands on heads! You won '  + (parseInt(message.substring(4))*2) + ' lead!'
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
											message: 'You spent ' + message.substring(4) + ' lead and chose heads. \nThe coin flips... <a:cf:509424634865909787>'
										}, function (errrr, resss){
											setTimeout(() => {
												bot.editMessage({
													channelID: channelID,
													messageID: resss.id,
													message: 'You spent ' + message.substring(4) + ' lead and chose heads. \nThe coin flips... <:tails:509424611721609227> ... and lands on tails... you lost your '  + (parseInt(message.substring(4))) + ' lead.'
												});
											}, 2000);
										});
									});
								}
							} else {
								if ((Math.floor(Math.random() * 2)) == 1){
									bot.editMessage({
										channelID: '509149632618823681',
										messageID: begMessID,
										message: (parseInt(res.content.substring(0, res.content.indexOf(','))) + (parseInt(message.substring(4)))) + ',' + (res.content.substring(res.content.indexOf(',') +1))
									}, function (errr, ress){
										bot.sendMessage({
											to: channelID,
											message: 'You spent ' + message.substring(4) + ' lead and chose tails. \nThe coin flips... <a:cf:509424634865909787>'
										}, function (errrr, resss){
											setTimeout(() => {
												bot.editMessage({
													channelID: channelID,
													messageID: resss.id,
													message: 'You spent ' + message.substring(4) + ' lead and chose tails. \nThe coin flips... <:tails:509424611721609227> ... and lands on tails! You won '  + (parseInt(message.substring(4))*2) + ' lead!'
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
											message: 'You spent ' + message.substring(4) + ' lead and chose tails. \nThe coin flips... <a:cf:509424634865909787>'
										}, function (errrr, resss){
											setTimeout(() => {
												bot.editMessage({
													channelID: channelID,
													messageID: resss.id,
													message: 'You spent ' + message.substring(4) + ' lead and chose tails. \nThe coin flips... <:heads:509424625558749185> ... and lands on heads... you lost your '  + (parseInt(message.substring(4))) + ' lead.'
												});
											}, 2000);
										});
									});
								}
							}
						} else {
							bot.sendMessage({
								to: channelID,
								message: 'You can\'t bet more lead than you own ' + user + '!'
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
						console.log(res)
						bot.editMessage({
							channelID: '509160162959949825',
							messageID: '509164727696359444',
							message: tacobell.content + ' ' + userID + ', ' + res.id
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
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.content.includes(userID)){
						bot.sendMessage({
							to: channelID,
							message: user + ', your begging has been answered. Your lead count has increased by 1'
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
							message: user + ', you currently have ' + res.content.substring(0, res.content.indexOf(',')) + ' lead!'
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
