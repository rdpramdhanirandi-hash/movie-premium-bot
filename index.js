
const express=require('express');
const TelegramBot=require('node-telegram-bot-api');
const app=express();
const PORT=process.env.PORT||10000;
app.get('/',(req,res)=>res.send('Bot is running'));
app.listen(PORT,()=>console.log('Web server on',PORT));
const bot=new TelegramBot(process.env.BOT_TOKEN,{polling:true});
bot.onText(/\/start/,m=>bot.sendMessage(m.chat.id,'👋 Selamat datang di Movie Premium!'));
bot.on('message',m=>{
const t=(m.text||'').toLowerCase();
if(t==='halo') bot.sendMessage(m.chat.id,'Halo juga!');
if(t==='menu') bot.sendMessage(m.chat.id,'📋 Menu\n/start\nhalo\nmenu');
});
