const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Hello", {type: "WATCHING"});

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

client.on('message', message => {
  if (message.content === (prefix + "help")) {
  let embed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#8650a7")
.addField("g!ban" , "ban player")
.addField("g!kick" , "kick player")
.addField("g!rip" , "see rules")
.addField("g!avater" , "see your avatar")
message.channel.sendEmbed(embed);
 }
});
client.on('message', message => {
  // If the message is 'g!rip'
  if (message.content === 'g!rip') {
      // Create the attachment using Attachment
      const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
      // Send the attachment in the message channel
      message.channel.send(attachment);
  }
});
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === 'g!avater') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});

bot.login(tokenfile.token);
