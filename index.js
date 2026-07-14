const TelegramBot=require('node-telegram-bot-api');
const token=process.env.BOT_TOKEN;
const bot=new TelegramBot(token,{polling:true});
bot.onText(/\/start/,m=>bot.sendMessage(m.chat.id,"👋 Selamat datang di Movie Premium!"));
bot.on("message",m=>{
 const t=(m.text||"").toLowerCase();
 if(t==="halo") bot.sendMessage(m.chat.id,"Halo juga! 👋");
 if(t==="menu") bot.sendMessage(m.chat.id,"📋 Menu\n/start\nmenu\nhalo");
});
