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
	
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'PING':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
		case 'NEW_USER':
			bot.sendMessage({
				to: '509149632618823681',
				message: '0, 0, 0, 0, 0, 0, 0, 0'
			});
			break;
		case 'DOTHIS':
			bot.sendMessage({
				to: channelID,
				message: bot.getMessage({
						channelID: '509160162959949825',
						messageID: '509164727696359444'
					})
			});
			break;
			case 'BEG':
			bot.getMessage({ channelID: '509160162959949825', messageID: '509164727696359444' }, function (bad, tacobell){
				if (tacobell.includes(userID)){
						bot.sendMessage({
							to: channelID,
							message: user + ', your begging has been answered. Your lead count has increased by 1'
						});
					let begMessID = (tacobell.substring(tacobell.indexOf(userID) + 19), (tacobell.indexOf(userID) + 37));
					bot.getMessage({
						channelID: '509149632618823681',
						messageID: begMessID
					}, function (err, res){
						bot.editMessage({
							channelID: 509149632618823681,
							messageID: begMessID,
							message: res.substring(0, res.indexOf(','))
						});
					});
						
				}
			});
				break;
				case 'LEAD':
						bot.sendMessage({
							to: channelID,
							message: user + ', you currently have ' +  ' lead!'
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
