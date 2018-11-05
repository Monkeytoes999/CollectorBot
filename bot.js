var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var user_data = require('./user_data.json');
var usertest = {money: 0, karma: 0, pets: [0, 0, 0], totalPets: [0, 0, 0]};
var config = {
    databaseURL: "https://discordbot-a817a.firebaseio.com"
  };
  firebase.initializeApp(config);
var database = firebase.database();


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
	
	if (evt.d.mentions.length > 0 && evt.d.mentions[0].id == "393586279964475393"){
  		bot.sendMessage({
        		to: channelID,
     			message: 'hello'
    		});
	}
	
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
			case 'BEG':
				if (user_data[userID] != undefined){
						bot.sendMessage({
							to: channelID,
							message: user + ', your begging has been answered. Your lead count has increased by 1'
						});
					user_data[userID]['money'] = user_data[userID]['money'] + 1;

					fs.writeFile('./user_data.json', JSON.stringify(user_data, null, 4), (err) => {
						// good to go if no err(or)
					});
				}
				break;
				case 'LEAD':
					if (user_data[userID] != undefined){
						bot.sendMessage({
							to: channelID,
							message: user + ', you currently have ' + user_data[userID]['money'] + ' lead!'
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
