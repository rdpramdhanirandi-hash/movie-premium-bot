
const express=require("express");
const TelegramBot=require("node-telegram-bot-api");
const app=express();app.get("/",(_,res)=>res.send("OK"));
app.listen(process.env.PORT||10000);
const bot=new TelegramBot(process.env.BOT_TOKEN,{polling:true});
const CHANNEL="@ganti_channel_anda";
const main={reply_markup:{keyboard:[
["🎬 Film","🔍 Cari"],["⭐ Premium","📢 Channel"],["📞 WhatsApp","❓ Bantuan"]],resize_keyboard:true}};
async function joined(id){
 try{let m=await bot.getChatMember(CHANNEL,id);return["member","administrator","creator"].includes(m.status);}catch{return false;}
}
bot.onText(/\/start/,async m=>{
 if(!(await joined(m.from.id))){
  return bot.sendMessage(m.chat.id,"⚠️ Wajib join channel.",{reply_markup:{inline_keyboard:[
   [{text:"📢 Join Channel",url:"https://t.me/ganti_channel_anda"}],
   [{text:"✅ Saya Sudah Join",callback_data:"cek"}]
  ]}});
 }
 bot.sendMessage(m.chat.id,"👋 Selamat Datang",main);
});
bot.on("callback_query",async q=>{
 if(q.data==="cek"){
  if(await joined(q.from.id)) bot.sendMessage(q.message.chat.id,"Terima kasih!",main);
  else bot.answerCallbackQuery(q.id,{text:"Anda belum join.",show_alert:true});
 }
});
bot.on("message",m=>{
 const t=m.text,c=m.chat.id;
 if(t=="🎬 Film") bot.sendMessage(c,"🎭 Drama\n💥 Action\n😂 Komedi\n👻 Horor\n💕 Romance",main);
 if(t=="🔍 Cari") bot.sendMessage(c,"Ketik judul film.",main);
 if(t=="⭐ Premium") bot.sendMessage(c,"Premium segera hadir.",main);
 if(t=="📢 Channel") bot.sendMessage(c,"https://t.me/ganti_channel_anda",main);
 if(t=="📞 WhatsApp") bot.sendMessage(c,"https://wa.me/6281234567890",main);
 if(t=="❓ Bantuan") bot.sendMessage(c,"Gunakan tombol menu.",main);
});
