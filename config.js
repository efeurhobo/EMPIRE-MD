const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

//═════[Don't Change Variables]════════\\

global.alive_img = "https://files.catbox.moe/z7c67w.jpg"; // URL for alive image
global.caption = "©𝟐𝟎𝟐𝟓 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]"; // don't change 
global.channelUrl = "https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k";
global.botname = "𝐄𝐌𝐏𝐈𝐑𝐄-𝐌𝐃";
global.apikey ="free_key@maher_apis";
global.devs = "2348078582627" // Developer Contact
global.session = "https://empire-md-paircode.onrender.com/"; // DO NOT Change this....

module.exports = {
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    ANTICALL: process.env.ANTICALL || "false",
    ANTICALL_MSG: process.env.ANTICALL_MSG || "*_📞 Auto Call Reject Mode Active. 📵 No Calls Allowed!_*",
    ANTILINK: process.env.ANTILINK || "false",
    AUTO_LIKE_EMOJI: process.env.AUTO_LIKE_EMOJI || "💜",
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "false",
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "false",
    MODE: process.env.MODE || "private",
    OWNER_NAME: process.env.OWNER_NAME || "𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348078582627",
    PREFIX: process.env.PREFIX || ".",
    SESSION_ID: process.env.SESSION_ID || "7BhHTLoR#gOGrsSQba-QbRBU4YjceKFL0b3DCYnWMbjNuW_Kwyag",
};
